import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import EmailVerification from "@/models/EmailVerification";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


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

// export async function listPaginatedProducts(page, limit) {
export async function listPaginatedProducts(page = 1, limit = 20) {
    try {
        await dbConnect();
        const products = await Product.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Product.countDocuments();
        return { status: 200, data: products , count: count};
    }
    catch (e) {
        return { status: 400, message: e.message };
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



export const getUserHistory = async (userId) => {
    await dbConnect();
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return { status: 400, message: "User not found" };
        }

        // If there is no purchase history, return an empty array immediately
        if (!user.purchaseHistory || user.purchaseHistory.length === 0) {
            return { status: 200, data: [] };
        }
        // Convert the string _ids in purchaseHistory to ObjectIds
        const purchaseHistoryObjectIds = user.purchaseHistory.map(purchase =>new  mongoose.Types.ObjectId(purchase._id));

        const pipeline = [
            { $match: { _id: { $in: purchaseHistoryObjectIds } } },
            {
                $addFields: {
                    purchaseHistory: {
                        $filter: {
                            input: user.purchaseHistory,
                            as: "purchase",
                            cond: { $eq: ["$$purchase._id", { $toString: "$_id" }] }
                        }
                    }
                }
            },
            { $unwind: "$purchaseHistory" },
            {
                $addFields: {
                    purchaseDate: "$purchaseHistory.purchaseDate",
                    purchasedAt: "$purchaseHistory.purchasedAt"
                }
            },
            {
                $project: {
                    _id: { $toString: '$_id' },
                    name: 1,
                    description: 1,
                    price: 1,
                    purchaseDate: 1,
                    purchasedAt: 1,
                    VAT: 1,
                    weight:1,
                    buybackPrice:1,
                    isAvailable:1,

                }
            }
        ];

        const productsWithHistory = await Product.aggregate(pipeline).exec();

        return { status: 200, data: productsWithHistory };
    } catch (e) {
        console.error(e);
        return { status: 400, message: e.message };
    }
}

