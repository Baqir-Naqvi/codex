import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import ShortUniqueId from "short-unique-id";
import MarketPlace from "@/models/MarketPlace";
import mongoose from "mongoose";
//add product id to user's purchaseHistory

export async function POST(req) {
    const request = await req.json();
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("product_id");
    if (!_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const userExists = await
            User.findOneAndUpdate({
                _id: request.userId
            }, {
                $push: { 
                purchaseHistory: {
                    _id: _id,
                    purchaseDate: new Date(),
                    purchasedAt: request.originalPrice
                }
             }
            });
        if (!userExists) {
            return Response.json({ status: 400, message: "User not found" });
        }
        return Response.json({ status: 200 });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}



//function to handle purchase of multiple products at once from cart
//cart is an array of products with their quantity ,weight and price
//we will save objects in orderHistory and remove them from cart

//we will add two fields to each product before saving in orderHistory
//1. purchaseQuantity
//2. purchasePrice
//3. purchaseWeight

export async function PUT(req) {
    const { userId, products, isEshop, shipping_details } = await req.json();

    const orderID = new ShortUniqueId({ length: 14 }).rnd()
    if (!userId || !products ) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const user = await User.findById(userId);
        // let order_=[]
        // if (!user) {
        //     return Response.json({ status: 400, message: "User not found" });
        // }
        // const orderHistory = user.orderHistory;
        // for (let product of products) {
      
        //     order_.push({
        //             ...product,
        //             purchasedQuantity: product.quantity,
        //             purchasedAt: product.quantity * product.price,
        //             purchasedWeight: product.quantity * product.weight,
        //         });
            
        // }
        // user.orderHistory.push(order_);
        // user.inventory.push(order_);

        //add additional fields to each product and assign orderID
        let order_ = products.map((product) => {
            return {
                ...product,
                purchasedQuantity: product.quantity,
                purchasedAt: product.price,
                purchasedDate: new Date(),
                purchasedWeight: product.quantity * product.weight,
                orderID: orderID,
                status: "pending",
                paymentDate:"",
                paymentMode: shipping_details?.paymentMode || "Bank Transfer",
                paymentStatus:"pending",
                deliveryDate:"",
                deliveryStatus:"pending",
                isEshop: isEshop,
                isListed: false,
                purchase_status: "pending",
                shipping_details: isEshop ? { 
                    country: shipping_details.country || "",
                    city: shipping_details.city || "",
                    method: shipping_details.method || "",
                    billing_address: {
                        street: shipping_details.billing_address || "",
                        city: shipping_details.postal_code || "",
                        zip: shipping_details.phone || "",
                        country: shipping_details.country || ""
                    }
                } : { }
            };
        });
        user.inventory.push(...order_);
        user.orderHistory.push(...order_);
        //if a product has marketplace_id then find the product in marketplace and update the status
        //buyer_id and buyer_accountNumber buyer_Name
        for (let product of order_) {
            if (product.marketplace_id) {
                //should have marketplace_id and _id to uniquely identify the product
                const marketPlace = await MarketPlace.findOne({ marketplace_id: product.marketplace_id, _id: product._id });
                marketPlace.buyer_id = userId;
                marketPlace.buyer_accountNumber = user.uniqueCode;
                marketPlace.buyer_Name = user.firstName + " " + user.lastName;
                marketPlace.payment_status = "pending";
                await marketPlace.save();
            }
        }
        
        user.cart = [];        
        await user.save();
        return Response.json({ status: 200, message: "Products purchased" });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }


}

