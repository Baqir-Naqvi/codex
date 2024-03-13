import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import mongoose from "mongoose";


//get user's inventory 

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
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
            return { status: 200, data: [] };
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

                }
            }
        ];

        const productsWithHistory = await Product.aggregate(pipeline).exec();

        return Response.json({ status: 200, orders: productsWithHistory });


    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}


