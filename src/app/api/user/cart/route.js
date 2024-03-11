import Product from "@/models/Product";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// Add product to cart
export async function POST(req) {
    const { user_id, product_id, quantity } = await req.json();
    if (!user_id || !product_id || !quantity) {
        return Response.json({ status: 400, message: "Invalid request" });
    }

    await dbConnect();

    try {
        // Check if the product exists
        const productExists = await Product.findById(product_id);
        if (!productExists) {
            return Response.json({ status: 404, message: "Product not found" });
        }

        // Update user's cart
        // Use MongoDB's arrayFilters to efficiently find and update the item in the cart
        const result = await User.findOneAndUpdate(
            { _id: user_id, "cart._id": product_id },
            {
                $inc: { "cart.$.quantity": quantity },
            },
            {
                new: true, // Returns the updated document
                upsert: false, // Do not insert a new document if it doesn't exist
            }
        );

        if (!result) {
            // If the product was not in the cart, push a new item
            await User.findByIdAndUpdate(
                user_id,
                {
                    $push: { cart: { _id: product_id, quantity: quantity } },
                },
                { new: true }
            );
        }

        return Response.json({ status: 200, message: "Product added to cart" });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 500, message: "An error occurred while updating the cart" });
    }
}


// remove product from cart
export async function DELETE(req) {
    const { user_id, product_id } = await req.json();
    if (!user_id || !product_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        const product = await Product.findById(product_id);
        if (!product) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        user.cart = user.cart.filter((item) => item._id.toString() !== product_id);
        await user.save();
        return Response.json({ status: 200, message: "Product removed from cart" });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}

// get user's cart
// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const user_id = searchParams.get("user_id");
//     if (!user_id) {
//         return Response.json({ status: 400, message: "Invalid request" });
//     }
//     await dbConnect();
//     try {
//         const user = await User.findById(user_id);
//         if (!user) {
//             return Response.json({ status: 400, message: "User not found" });
//         }
//         const cart = await Product.find({ _id: { $in: user.cart } });
//         return Response.json({ status: 200, data: cart });

//     } catch (e) {
//         console.error(e);
//         return Response.json({ status: 400, message: e.message });
//     }
// }

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    if (!user_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }

    await dbConnect();

    try {
        const user = await User.findById(user_id).lean();
        if (!user || !user.cart || user.cart.length === 0) {
            return Response.json({ status: 200, data: [] });
        }

        // Convert cart item IDs to MongoDB ObjectIds
        const cartItemsWithQuantity = user.cart.map(item => {
            return {
                _id:new  mongoose.Types.ObjectId(item._id), // Make sure to convert the string ID to ObjectId
                quantity: item.quantity
            };
        });

        const cartItems = await Product.aggregate([
            {
                $match: {
                    _id: {
                        $in: cartItemsWithQuantity.map(item => item._id)
                    }
                }
            },
            {
                $addFields: {
                    quantity: {
                        $let: {
                            vars: {
                                itemQuantity: {
                                    $arrayElemAt: [
                                        cartItemsWithQuantity.map(item => {
                                            return {
                                                _id: item._id,
                                                quantity: item.quantity
                                            };
                                        }),
                                        { $indexOfArray: [cartItemsWithQuantity.map(item => item._id), "$_id"] }
                                    ]
                                }
                            },
                            in: "$$itemQuantity.quantity"
                        }
                    }
                }
            }
        ]);

        return Response.json({ status: 200, data: cartItems });

    } catch (e) {
        console.error(e);
        return Response.json({ status: 500, message: "An error occurred while fetching the cart items." });
    }
}