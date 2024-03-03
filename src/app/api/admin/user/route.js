import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req) {
    //get all users
    await dbConnect();

    try {
        // get all users
        const users = await User.find({});
        if (!users) {
            return Response.json({ status: 400, message: "User not found" });
        }

        return Response.json({ status: 200, data: users });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: "Could not fetch User" });
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
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        return Response.json({ status: 200 });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: "Could not delete User" });
    }
}