import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const user_id = searchParams.get("user_id");

    try {
        const [product, user] = await Promise.all([
            Product.findById(id),
            User.findById(user_id, "limitAccess"),
        ]);

        if (!product) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }

        //if product price is greater than 10,000 then limit access 
        const limitAccess = user.limitAccess === true && product.price > 10000 ? true : false;
        

        return Response.json({ status: 200, data: product, access: limitAccess });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: "Could not fetch Product" });
    }
}

