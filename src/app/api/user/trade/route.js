import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";


//get user's inventory 

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("user_id");
    if (!_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const user = await User.findById(_id).lean();
        if (!user) {
            return { status: 400, message: "User not found" }; // Return a proper response object
        }

        let updatedOrderHistory = await Promise.all(user.inventory.map(async (order,orderNumber) => {
            let updatedOrder = await Promise.all(order.map(async (product) => {
                let productDetails = await Product.findById(product._id).lean();
                if (productDetails) {
                    return { ...product, price: productDetails.price, buybackPrice: productDetails.buybackPrice ,orderID:orderNumber};
                }
                return product;
            }));
            return updatedOrder;
        }));

        return Response.json({ status: 200, orders: updatedOrderHistory });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}


