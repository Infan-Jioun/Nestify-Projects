// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'


const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.USER]: ["/profile",],
    [UserRole.REAL_ESTATE_DEVELOPER]: [
        "/dashboard",
        "/dashboard/add-properties", 
    
    ],
    [UserRole.ADMIN]: [
        "/dashboard",
        "/dashboard/add-properties",
        "/dashboard/add-city",
        "/dashboard/users-information",
        "/dashboard/settings",
        "/admin"
    ]
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const allProtectRoutes = Object.values(roleRoutes).flat()
    const isProtectRoute = allProtectRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (!isProtectRoute) {
        return NextResponse.next()
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })


    if (!token) {
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }


    const userRole = token.role as UserRole

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
      
    ]
}