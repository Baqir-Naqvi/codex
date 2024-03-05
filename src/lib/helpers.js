import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import EmailVerification from "@/models/EmailVerification";
import jwt from "jsonwebtoken";

export async function verfiyToken(token){
    try {
        console.log("verify email route");

        //verify the token and get the email
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        const decoded_token = decoded.uniqueCode;
        if (!email || !decoded_token) {
            return{ status: 400, message: "Invalid token"}
        }

        await dbConnect();

        const userExists = await EmailVerification.findOne({ email: email, token: token });

        if (!userExists) {
            return { status: 400, message: "Verification failed" };
        }
        //update the user status to verified
        else {
            const user = await User.findOneAndUpdate({
                email: email,
                uniqueCode: decoded_token
            }, {
                isVerified: true
            });
            return { status: 200, message: "User verified successfully" ,body:email};
            // //redirect User to /auth/setpassword?token=${token}
            // redirect(`${process.env.BASE_URL}auth/setpassword?token=${token}`,'push');

        }

    }
    catch (e) {
        return Response.json({ status: 400, message: e.message });
    }
}
