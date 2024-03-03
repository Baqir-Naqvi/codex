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
