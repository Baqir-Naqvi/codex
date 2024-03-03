import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    await dbConnect();
    try {
        const products = await Product.find({});
        if (!products) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        return Response.json({ status: 200, data: products });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: "Could not fetch Product" });
    }
}

