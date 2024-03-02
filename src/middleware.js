import { NextResponse } from 'next/server';
import { updateSession } from "@/lib";

export async function middleware(request) {
    try {
        const valid = await updateSession(request);
        if (!valid) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        const session = request.cookies.get("session");
        const { role } = valid;
        if (role != "admin" && request.url.includes("/admin")) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Redirect logic based on session existence
        if (request.url === process.env.BASE_URL && !session) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        } else if (request.url.includes("/dashboard") && !session) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error in middleware:", error);
        // Redirect to login or handle error as appropriate
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|auth).*)',
    ],
}
