
import { NextRequest, NextResponse } from "next/server";


const URL_LOGIN = process.env.NEXT_PUBLIC_AUTH_URL ||  "http://localhost:3000/login"

export default function middleware(request: NextRequest){

    const token = request.cookies.get("auth-token-cookie")?.value

    if(!token){
        const redirect = new URL(URL_LOGIN)
        redirect.searchParams.set("callbackUrl", request.nextUrl.href)

        return NextResponse.redirect(redirect)
    }
    return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Matcher toutes les routes sauf :
     * - les fichiers statiques (_next/static, _next/image, favicon.ico, etc.)
     * - les images / assets publics (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};