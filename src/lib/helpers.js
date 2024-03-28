import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import EmailVerification from "@/models/EmailVerification";
import MarketPlace from "@/models/MarketPlace";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Sales from "@/models/Sales";
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
export const getUserPurchases = async (isEshop) => {
    const userId = await getUserid();
    await dbConnect();
    try {
        const user = await User.findById(userId).lean();
        if (!user) {
            return { status: 400, message: "User not found" };
        }

        // If there is no purchase history, return an empty array immediately
        if (!user.inventory || user.inventory.length === 0) {
            return { status: 200, orders: [] };
        }
        // Convert the string _ids in purchaseHistory to ObjectIds
        const purchaseHistoryObjectIds = user.inventory.map(purchase =>new  mongoose.Types.ObjectId(purchase._id));

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
                    quantity: "$inventory.quantity",
                    isEshop: "$inventory.isEshop"
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
                    orderID: 1,
                    status: 1,
                    paymentStatus: 1,
                    paymentMode: 1,
                    deliveryStatus: 1,
                    deliveryDate: 1,
                    quantity: 1,
                    isEshop: 1

                }
            }
        ];

        const productsWithHistory = await Product.aggregate(pipeline).exec();
        
        const account_products = productsWithHistory.filter(product => product.isEshop==false);
        return { status: 200, orders: account_products };
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


//get user itemsListed for sale from sales collection
export const getUserSales = async () => {
    const userId = await getUserid();
    await dbConnect();
    try {
        //find price of product from product collection and then populate the product field in sales collection
        // const sales = await Sales.find({ seller_id: userId }).populate("product").lean();
        // return { status: 200, data: sales };

        const sales = await Sales.aggregate([
            { $match: { seller_id:new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $addFields: {
                    productName: "$product.name",
                    productDescription: "$product.description",
                    productPrice: "$product.price",
                    productVAT: "$product.VAT",
                    productBuybackPrice: "$product.buybackPrice",
                    productUpdatedAt: "$product.updatedAt"
                }
            },
            {
                $project: {
                    _id: 1,
                    product: 0
                }
            }
        ]).exec();

        return { status: 200, sales: sales };
    } catch (e) {
        console.error(e);
        return { status: 400, message: e.message };
    }
} 


//method to get all products listed in marketplace collection and disable the products which are listed by the user
export const getMarketPlaceProducts = async () => {
    const userId = await getUserid();
    await dbConnect();
    try {
        //use aggregate to get products from Product collection and then populate the product field in MarketPlace collection
        const products = await MarketPlace.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $addFields: {
                    name: "$product.name",
                    description: "$product.description",
                    VAT: "$product.VAT",
                    buybackPrice: "$product.buybackPrice",
                    photos: "$product.photos",
                }
            },
            {
                $project: {
                    _id: 1,
                    product: 0
                }
            }
        ]).exec();

        // Disable the products listed by the user
        products.forEach(product => {
            if (product.seller_id.toString() === userId) {
                product.isDisabled = true;
            }
            product.quantity_available = product.quantity;
        });
        //if product has a buyer then its been sold
        return { status: 200, data: products.filter(product => !product.buyer_Name) };
    } catch (e) {
        console.error(e);
        return { status: 400, message: e.message };
    }
}

