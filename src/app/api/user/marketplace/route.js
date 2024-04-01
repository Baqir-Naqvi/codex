import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import Product from "@/models/Product";
import MarketPlace from "@/models/MarketPlace";


//get user's inventory 

export async function PUT(req) {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");
    const { delistProduct } = await req.json()
    await dbConnect();

    const { orderID, seller_id, product_id, price, margin,weight,quantity } = delistProduct;

    //find product in Product
    const originalProduct = await Product.findById(product_id);
    if(!originalProduct){
        return Response.json({stats: 404, message: "Product not found"});
    }

     
    //remove from marketplace
    await MarketPlace.findOneAndDelete ({_id: _id});
    //credit user's inventory

    const user= await User.findById(seller_id);
    if(!user){
        return Response.json({stats: 404, message: "User not found"});
    }
    const delistProductIndex = user.inventory.findIndex(product => product._id.toString() === product_id && product.orderID === orderID);
    //if product is not found in the inventory 
    //add the product to the inventory
    if(delistProductIndex === -1){
        const round_price = Math.round(price - (margin/100)*price);
        user.inventory.push({
            // ...delistProduct,
            _id:product_id,
            name: delistProduct.name,
            photos: delistProduct.photos,
            description: delistProduct.description,
            VAT: delistProduct.VAT,
            buybackPrice: delistProduct.buybackPrice,
            currency: "CZK",
            purchasedQuantity: quantity,
            purchasedWeight: weight,
            purchasedAt: round_price,
            purchasedDate: Date.now(),
            isListed: false,
            isEshop: false,
            paymentMode:"Bank Transfer",
            paymentStatus: "Processed",
            deliveryStatus: "",
            purchase_status: "Processed",
            price: originalProduct.price,
            quantity: quantity,
            status: "processed",
            orderID: orderID,

        });
    }
    //if product is found in the inventory
    //update the quantity
    else{
        if(!quantity){
            console.log("Quantity was not defined")
            return Response.json({stats: 400, message: "Quantity not defined"});
        }
        user.inventory[delistProductIndex].purchasedQuantity += quantity;
        user.inventory[delistProductIndex].quantity += quantity;
    }
    //mark the user's inventory as modified
    user.markModified('inventory');
    //save the user
    await user.save();

    return Response.json({stats: 200, message: "Product Delisted"});

}