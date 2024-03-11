
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
//function to handle sell of a single product
//inventory is an array of arrays containing orders 
//each order contains an array of products

export async function PUT(req) {
    const { userId, productId, weight, price,orderNumber } = await req.json();
    
    await dbConnect();
    try {
        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        let new_inventory = user.inventory;
        const inventory = user.inventory;
        //find the product at orderNumber index in inventory
        let order = inventory[orderNumber];
        //find the product in the order
        const product = order.find((product) => product._id == productId);

        if (!product) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        //check if the weight to be sold is greater than the weight in inventory
        if (weight > product.purchasedWeight) {
            return Response.json({ status: 400, message: "Insufficient weight" });
        }
        //update the weight of the product
        product.purchasedWeight -= weight;

        //update order with the updated product
        order = order.map((p) => {
            if (p._id == productId) {
                return product;
            }
            return p;
        });
        

        //update the inventory
        new_inventory[orderNumber] = order;
        user.inventory = new_inventory;
        

        await user.save();
        return Response.json({ status: 200, message: "Product Listed for selling" });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }


}