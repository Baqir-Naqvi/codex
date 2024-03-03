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


export async function POST(req) {
    const request = await req.json();
    await dbConnect();

    try {
        const productExists = await
            Product.findOne({ name: request.name });
        if (productExists) {
            return Response.json({ status: 400, message: "Product already exists" });
        }
        const product = await Product.create(request);
        return Response.json({ status: 200, message: "Product created" });
    }
    catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}

export async function PUT(req) {
    const request = await req.json();
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");
    if (!_id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }
    await dbConnect();
    try {
        const productExists = await
            Product.findOneAndUpdate({
                _id: _id
            }, {
                ...request
            });
        if (!productExists) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        return Response.json({ status: 200 });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ status: 400, message: "Invalid request" });
    }   

    await dbConnect();
    try {
        const productExists = await
            Product.findOneAndDelete({
                _id: id
            });
        if (!productExists) {
            return Response.json({ status: 400, message: "Product not found" });
        }
        return Response.json({ status: 200 });
    } catch (e) {
        return Response.json({ status: 400, message: e.message });
    }
}
