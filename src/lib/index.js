import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    const parsed = await decrypt(session);
    return parsed;
}

export async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
    try {
        // Refresh the session so it doesn't expire
        const parsed = await decrypt(session);
        parsed.expires = new Date(Date.now() + 10 * 1000);
        const res = NextResponse.next();
        res.cookies.set({
            name: "session",
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires,
        });
        return parsed.userExists;
    } catch (error) {
            return false;
    }
   
}

export async function getUserDetails() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    const parsed = await decrypt(session);
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/user?id=${parsed.userExists._id}`)
    const user=await response.json()
    return user
}
