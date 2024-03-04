import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import dotenv from 'dotenv';
import axios from 'axios';
import EmailVerification from "@/models/EmailVerification";
import jwt from 'jsonwebtoken';
dotenv.config();

/*
route to handle user registration 
*/
export async function POST(req) {
    const request = await req.json();

    await dbConnect();

    try {
        const userExists = await User.findOne({ email: request.email });
        if (userExists) {
            return Response.json({ status: 400, message: "User already exists" });
        }
        //generate a radom 9 digit number
        request.uniqueCode = Math.floor(100000000 + Math.random() * 900000000);
        const user = await User.create(request);

        //create a encrypted token with the user email and the unique code
        const token = jwt.sign({ email: user.email, uniqueCode: user.uniqueCode }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        //create a new email verification record
        await EmailVerification.create({ email: user.email, token: token });

        //send the email verification email
        await sendVerificationEmail(user, token);
        return Response.json({ status: 200, data: user});
    } catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}

async function sendVerificationEmail(clientReq, token) {
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}cz/auth/verifyemail?token=${token}`;

    try {
        const url = 'https://api.postmarkapp.com/email';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY,
        };

        const body = JSON.stringify({
            From: 'info@macko.cz',
            To: clientReq.email,
            subject: `Email Verification for Codex`,
            HtmlBody: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .message-header { background-color: #9d8efa; padding: 20px; }
                .message-body { margin: 20px 0; }
                .message-footer { font-size: 12px; color: #777; margin-top: 20px; }
                .highlight { color: #007bff; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="message-header">
                    <h3>Email Verification</h3>
                </div>
                <div class="message-body">
                    <p>Greetings,</p>
                    
                    <p>Thanks for signing up with Codex! We're excited to have you on board.</p>
                    
                    <strong>Email:</strong> <a href="mailto:${clientReq.email}">${clientReq.email}</a><br>
            
                    
                    <p>Please verify your email address by clicking the link below:</p>
                    <p><a href="${verificationLink}" class="highlight">Verify Email</a></p>
                </div>
                <div class="message-footer">
                    <p>This is an automated message from codex.com. Please do not reply directly to this email.</p>
                </div>
            </div>
        </body>
        </html>
      `,
            MessageStream: 'outbound',
        });

        const response = await axios.post(url, body, { headers });
        if (response.status === 200) {
        console.log('Email sent');
        } else {
            console.error(response.data);
        }
    } catch (error) {
        console.error(error);
        return new Response('Failed to send email', {
            status: 500,
        });
    }
}

export async function PUT(req) {
    const userData = await req.json();
    let allFieldsFilled = true;

    await dbConnect();

    try {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            return Response.json({ status: 400, message: "User not found" });
        }
        //update the user record

        //if all fields are filled, then update limitAccess to false
        for (const field in userData) {
            if (userData[field] === '' || userData[field] === null || userData[field].length === 0) {
                allFieldsFilled = false;
            }
        }
        if (allFieldsFilled) {
            userData.limitAccess = false;
        }
        
        await User.findOneAndUpdate (
            { email: userData.email },
            userData,
        )
        return Response.json({ status: 200, data: user });
    }
    catch (e) {
        console.error(e);
        return Response.json({ status: 400, message: e.message });
    }
}
