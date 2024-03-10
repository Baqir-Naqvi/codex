import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib";
import dotenv from "dotenv";
dotenv.config();
/*
route to handle user login 
*/



export async function POST(req) {
    const request = await req.json();

    await dbConnect();

    try {
        const userExists = await User.findOne({ email: request.email , password: request.password}).lean();
        if (!userExists) {
            return Response.json({ status: 400, message: "User not found" });
        }
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
        const session = await encrypt({ userExists, expires });

        // Save the session in a cookie
        cookies().set("session", session, { expires, httpOnly: true });
        return Response.json({ status: 200, data: userExists });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}


export async function DELETE(req) {
    try {
        cookies().set("session", "", { expires: new Date(0) });
        return Response.json({ status: 200, message: "Logged out" });
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}