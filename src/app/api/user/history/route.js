import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";


//get user's purchase history
//product ids are in purchaseHistory array

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("user_id");
    if (!_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const user = await User.findById(_id);
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        const products = await Product.find({ _id: { $in: user.purchaseHistory } });
        console.log(products)
        return Response.json({ status: 200, data: products });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}   