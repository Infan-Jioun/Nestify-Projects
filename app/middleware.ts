// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'

const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.USER]: ["/profile"],
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

    // সব protected routes collect করুন
    const allProtectRoutes = Object.values(roleRoutes).flat()

    // Check if current path is protected
    const isProtectRoute = allProtectRoutes.some(route =>
        pathname.startsWith(route)
    )

    // যদি protected route না হয়, তবে next করুণ
    if (!isProtectRoute) {
        return NextResponse.next()
    }

    // Token পাওয়ার চেষ্টা করুন
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    // Token না থাকলে login page এ redirect করুন
    if (!token) {
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // User role পাওয়ার চেষ্টা করুন
    const userRole = token.role as UserRole

    // Debugging
    console.log('🛡️ Middleware Debug:')
    console.log('User Role from token:', userRole)
    console.log('Token data:', token)
    console.log('Requested path:', pathname)

    // Temporary: Allow access while we fix role issue
    if (!userRole) {
        console.log('⚠️ No role found in token, but allowing access temporarily')
        return NextResponse.next()
    }

    // Role check
    if (userRole && roleRoutes[userRole]) {
        const hasAccess = roleRoutes[userRole].some(route =>
            pathname.startsWith(route)
        )

        if (!hasAccess) {
            console.log('❌ Access denied for role:', userRole, 'to path:', pathname)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    } else {
        // Role না থাকলে login page এ redirect করুন
        console.log('❌ No valid role found, redirecting to login')
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Access granted
    console.log('✅ Access granted for role:', userRole, 'to path:', pathname)
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/dashboard/:path*',
        '/admin/:path*',
    ]
}