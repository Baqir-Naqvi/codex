import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import EmailVerification from "@/models/EmailVerification";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { getUserid } from "@/lib"


export async function verfiyToken(token){
    try {
        console.log("verify email route");

        //verify the token and get the email
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const decoded_token = decoded.uniqueCode;
        if (!email || !decoded_token) {
            return{ status: 400, message: "Invalid token"}
        }

        await dbConnect();

        const userExists = await EmailVerification.findOne({ email: email, token: token });

        if (!userExists) {
            return { status: 400, message: "Verification failed" };
        }
        //update the user status to verified
        else {
            const user = await User.findOneAndUpdate({
                email: email,
                uniqueCode: decoded_token
            }, {
                isVerified: true
            });
            return { status: 200, message: "User verified successfully" ,body:email};
            // //redirect User to /auth/setpassword?token=${token}
            // redirect(`${process.env.BASE_URL}auth/setpassword?token=${token}`,'push');

        }

    }
    catch (e) {
        return Response.json({ status: 400, message: e.message });
    }
}



export async function getProductById(id) {
    try {
        await dbConnect();
        const product = await Product.findById(id).exec();
        // Convert the Mongoose document to a plain JavaScript object
        const plainProduct = product.toObject();

        // Convert the _id property to string
        plainProduct._id = plainProduct._id.toString();
        if (!product) {
            return { status: 404, message: "Product not found" };
        }
        return { status: 200, data: plainProduct };
    }
    catch (e) {
        return { status: 400, message: e.message };
    }
}


// get user purchase history
export const getUserHistory = async () => {
    const userId = await getUserid();
    await dbConnect();
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return { status: 400, message: "User not found" };
        }

        // If there is no purchase history, return an empty array immediately
        if (!user.orderHistory || user.orderHistory.length === 0) {
            return { status: 200, data: [] };
        }
        // Convert the string _ids in purchaseHistory to ObjectIds
        const purchaseHistoryObjectIds = user.orderHistory.map(purchase =>new  mongoose.Types.ObjectId(purchase._id));

        const pipeline = [
            { $match: { _id: { $in: purchaseHistoryObjectIds } } },
            {
                $addFields: {
                    orderHistory: {
                        $filter: {
                            input: user.orderHistory,
                            as: "purchase",
                            cond: { $eq: ["$$purchase._id", { $toString: "$_id" }] }
                        }
                    }
                }
            },
            { $unwind: "$orderHistory" },
            {
                $addFields: {
                    purchasedDate: "$orderHistory.purchasedDate",
                    purchasedAt: "$orderHistory.purchasedAt",
                    purchasedWeight: "$orderHistory.purchasedWeight",
                    orderID: "$orderHistory.orderID"
                }
            },
            {
                $project: {
                    _id: { $toString: '$_id' },
                    name: 1,
                    description: 1,
                    price: 1,
                    purchasedDate: 1,
                    purchasedAt: 1,
                    VAT: 1,
                    weight:1,
                    buybackPrice:1,
                    isAvailable:1,
                    purchasedWeight: 1,
                    orderID: 1

                }
            }
        ];

        const productsWithHistory = await Product.aggregate(pipeline).exec();

        return { status: 200, orders: productsWithHistory };
    } catch (e) {
        console.error(e);
        return { status: 400, message: e.message };
    }
}

//get user cart
export const getUserCart = async () => {

    const userId = await getUserid();
    await dbConnect();
    try {
        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        const products = await Product.find({ _id: { $in: user.cart } });
        return Response.json({ status: 200, data: products });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }


}


//get user orderHistory
export const getUserOrderHistory = async () => {
    const userId = await getUserid();
    await dbConnect();
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return { status: 400, message: "User not found" }; // Return a proper response object
        }

        // Assuming orderHistory is an array of order arrays, where each order array contains product objects with _id
        let updatedOrderHistory = await Promise.all(user.orderHistory.map(async (order) => {
            // Map over orders and replace product prices
            let updatedOrder = await Promise.all(order.map(async (product) => {
                let productDetails = await Product.findById(product._id).lean();
                if (productDetails) {
                    return { ...product, price: productDetails.price, buybackPrice: productDetails.buybackPrice }; // Spread the product details and overwrite price
                }
                return product; // If productDetails is null, return the original product
            }));
            return updatedOrder;
        }));
        return { status: 200, orders: updatedOrderHistory }; // Return the updated order history
    } catch (e) {
        console.error(e);
        return { status: 400, message: e.message }; // Return a proper response object
    }
}
