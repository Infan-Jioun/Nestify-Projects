// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'

// Role-based routes define করুন
const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.USER]: ["/profile", "/properties"],
    [UserRole.REAL_ESTATE_DEVELOPER]: [
        "/dashboard",
        "/dashboard/properties",
        "/dashboard/add-properties", 
     
    ],
    [UserRole.ADMIN]: [
        "/dashboard",
        "/dashboard/properties",
        "/dashboard/add-properties",
        "/dashboard/add-city",
        "/dashboard/user-information",
        "/dashboard/settings",
        "/admin"
    ]
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // সকল protected routes এর list তৈরি করুন
    const allProtectRoutes = Object.values(roleRoutes).flat()

    // Check করুন current route protected কি না
    const isProtectRoute = allProtectRoutes.some(route =>
        pathname.startsWith(route)
    )

    // যদি route protected না হয়, তবে next() return করুন
    if (!isProtectRoute) {
        return NextResponse.next()
    }

    // NextAuth token নিন
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // যদি token না থাকে, LoginPage page এ redirect করুন
    if (!token) {
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // User এর role নিন
    const userRole = token.role as UserRole

    // User এর role check করুন এবং access verify করুন
    if (userRole && roleRoutes[userRole]) {
        const hasAccess = roleRoutes[userRole].some(route =>
            pathname.startsWith(route)
        )

        // যদি access না থাকে, unauthorized page এ redirect করুন
        if (!hasAccess) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    } else {
        // যদি role না থাকে, LoginPage page এ redirect করুন
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/dashboard/:path*',
        '/admin/:path*',
        '/properties/:path*'
    ]
}