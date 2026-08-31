import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const IS_PUBLIC_ROOT = ["/login", "/forgot-password", "/reset-password"]

export default function middleware(request : NextRequest){

    const {pathname} = request.nextUrl

    const token = request.cookies.get("auth-token-cookie")?.value
    const isPublicRoute = IS_PUBLIC_ROOT.includes(pathname)

    if(!token && !isPublicRoute){
        return NextResponse.redirect(new URL("/login", request.url))
    }
    
    if(token && isPublicRoute){
        return NextResponse.redirect(new URL("/me", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher : ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}