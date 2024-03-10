import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const product = await Product.findById(id);
        if (!product) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        return Response.json({ status: 200, data: product });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: "Could not fetch Product" });
    }
}

