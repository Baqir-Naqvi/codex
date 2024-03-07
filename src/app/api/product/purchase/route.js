import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

//add product id to user's purchaseHistory

export async function PUT(req) {
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
                $push: { purchaseHistory: _id }
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

