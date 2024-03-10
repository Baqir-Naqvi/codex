import { NextResponse } from 'next/server'
import { updateSession } from "@/lib";
import { i18n } from '../i18n'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request) {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales = i18n.locales

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    )

    const locale = matchLocale(languages, locales, i18n.defaultLocale)

    return locale
}

export async function middleware(request) {
    const pathname = request.nextUrl.pathname
    const locale = getLocale(request)
    const session = request.cookies.get("session");
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    //if user is logged in and tries to dashboard or admin then we will validate it using updateSession
    if (pathname.includes("/admin") || pathname.includes("/dashboard") && session) {
        const valid = await updateSession(request);
        if (!valid) {
            if (pathnameIsMissingLocale) {
                return NextResponse.redirect(
                    new URL(
                        `/auth/login`,
                        request.url
                    )
                )
            }
            else {
                return NextResponse.redirect(
                    new URL(
                        `/${locale}/auth/login`,
                        request.url
                    )
                )
            }
        }
        const { role } = valid;
        if (role != "admin" && pathname.includes("/admin")) {
            if (pathnameIsMissingLocale) {
                return NextResponse.redirect(
                    new URL(
                        `/`,
                        request.url
                    )
                )
            }
            else {
                return NextResponse.redirect(
                    new URL(
                        `/${locale}`,
                        request.url
                    )
                )
            }
        }
    }

    //handle protected routes here admin and dashboard
    else if (pathname.includes("/admin") || pathname.includes("/dashboard") && !session) {
        console.log("No session found, redirecting to login page")
        if(pathnameIsMissingLocale){
            return NextResponse.redirect(
                new URL(
                    `/auth/login`,
                    request.url
                )
            )
        }
        else{
            return NextResponse.redirect(
                new URL(
                    `/${locale}/auth/login`,
                    request.url
                )
            )
        }
    }


    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        //if user access home route or /locale then we will redirect to locale/dashboard

        if (pathname === "/" && session) {
            return NextResponse.redirect(
                new URL(
                    `/${locale}/dashboard`,
                    request.url
                )
            )
        }
        else if (pathname === "/" && !session) {
            return NextResponse.redirect(
                new URL(
                    `/${locale}`,
                    request.url
                )
            )
        }
        else 
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
    
}