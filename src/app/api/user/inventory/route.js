import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import mongoose from "mongoose";


//get user's inventory 

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const eshop = searchParams.get("eshop");
    if (!user_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const user = await User.findById(user_id).lean();
        if (!user) {
            return { status: 400, message: "User not found" };
        }

        // If there is no inventory
        if (!user.inventory || user.inventory.length === 0) {
            return { status: 200, orders: [] };
        }
        // Convert the string _ids in purchaseHistory to ObjectIds
        const purchaseHistoryObjectIds = user.inventory.map(purchase => new mongoose.Types.ObjectId(purchase._id));

        const pipeline = [
            { $match: { _id: { $in: purchaseHistoryObjectIds } } },
            {
                $addFields: {
                    inventory: {
                        $filter: {
                            input: user.inventory,
                            as: "purchase",
                            cond: { $eq: ["$$purchase._id", { $toString: "$_id" }] }
                        }
                    }
                }
            },
            { $unwind: "$inventory" },
            {
                $addFields: {
                    purchasedDate: "$inventory.purchasedDate",
                    purchasedAt: "$inventory.purchasedAt",
                    purchasedWeight: "$inventory.purchasedWeight",
                    orderID: "$inventory.orderID",
                    status: "$inventory.status",
                    paymentDate: "$inventory.paymentDate",
                    paymentMode: "$inventory.paymentMode",
                    paymentStatus: "$inventory.paymentStatus",
                    deliveryDate: "$inventory.deliveryDate",
                    deliveryStatus: "$inventory.deliveryStatus",
                    photos: "$inventory.photos",
                    purchasedQuantity: "$inventory.quantity",
                }
            },
            {
                $project: {
                    _id: { $toString: '$_id' },
                    name: 1,
                    price: 1,
                    purchaseDate: 1,
                    purchasedAt: 1,
                    VAT: 1,
                    weight: 1,
                    buybackPrice: 1,
                    purchasedWeight: 1,
                    orderID: 1,
                    description: 1,
                    status: 1,
                    paymentDate: 1,
                    paymentMode: 1,
                    paymentStatus: 1,
                    deliveryDate: 1,
                    deliveryStatus: 1,
                    photos:1,
                    purchasedQuantity: 1

                }
            }
        ];

        const productsWithHistory = await Product.aggregate(pipeline).exec();
        //remove products that have status as pending
        const productsWithHistoryFiltered = productsWithHistory.filter(product => product.status !== "pending");


        return Response.json({ status: 200, orders: productsWithHistoryFiltered });


    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}


