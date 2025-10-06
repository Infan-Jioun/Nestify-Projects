// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'

// Role-based routes definition
const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.USER]: [
        "/profile",
        "/settings",
        "/my-properties",
        "/favorites",
        "/bookings",
        "/reviews"
    ],
    [UserRole.REAL_ESTATE_DEVELOPER]: [
        "/dashboard",
        "/dashboard/add-properties",
        "/dashboard/my-listings",
        "/dashboard/analytics",
        "/dashboard/messages",
        "/dashboard/earnings",
        "/dashboard/subscriptions"
    ],
    [UserRole.ADMIN]: [
        "/admin",
        "/admin/dashboard",
        "/admin/users",
        "/admin/properties",
        "/admin/settings",
        "/admin/reports",
        "/admin/analytics",
        "/dashboard",
        "/dashboard/users-information",
        "/dashboard/add-city",
        "/dashboard/settings",
        "/dashboard/all-properties"
    ]
}

// Public routes that don't require authentication
const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/properties",
    "/property",
    "/blog",
    "/privacy",
    "/terms"
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Public routes check
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }

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

    // Debugging (development এ only)
    if (process.env.NODE_ENV === 'development') {
        console.log('🛡️ Middleware Debug:')
        console.log('User Role from token:', userRole)
        console.log('Requested path:', pathname)
        console.log('Token data:', { id: token.id, email: token.email, role: token.role })
    }

    // Role check
    if (userRole && roleRoutes[userRole]) {
        const hasAccess = roleRoutes[userRole].some(route =>
            pathname.startsWith(route)
        )

        if (!hasAccess) {
            // Access না থাকলে unauthorized page এ redirect করুন
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
        // Protect all dashboard and admin routes
        '/profile/:path*',
        '/dashboard/:path*',
        '/admin/:path*',
        '/settings/:path*',
        '/my-properties/:path*',
        '/favorites/:path*',
        '/bookings/:path*'
    ]
}