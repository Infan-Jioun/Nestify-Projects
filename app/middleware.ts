import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'

const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.USER]: [
        "/profile",
    ],
    [UserRole.REAL_ESTATE_DEVELOPER]: [
        "/profile",
        "/dashboard",
        "/dashboard/add-properties",
        "/dashboard/add-blog",
    ],
    [UserRole.ADMIN]: [
        "/profile",
        "/dashboard/admin",
        "/dashboard/users-information",
        "/dashboard/add-city",
        "/dashboard/add-properties",
        "/dashboard/add-blog"
    ]
}

const publicRoutes = [
    "/",
    "/LoginPage",
    "/RegisterPage",
    "/About",
    "/Contact",
    "/Properties",
    "/Blog",
    "/Bookmark",
]

// Common routes that multiple roles can access
const commonRoutes = [
    "/profile",
    "/dashboard/add-properties",
    "/dashboard/add-blog"
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('=== Middleware Debug ===')
        console.log('Requested path:', pathname)
    }

    // Check public routes
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Get all protected routes
    const allProtectRoutes = Object.values(roleRoutes).flat()
    const isProtectRoute = allProtectRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (!isProtectRoute) {
        return NextResponse.next()
    }

    // Check authentication
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

    if (process.env.NODE_ENV === 'development') {
        console.log('User Role from token:', userRole)
        console.log('Token data:', { id: token.id, email: token.email, role: token.role })
    }

    // Special case: /dashboard route access
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
        // REAL_ESTATE_DEVELOPER and ADMIN can access /dashboard
        if (userRole === UserRole.REAL_ESTATE_DEVELOPER || userRole === UserRole.ADMIN) {
            console.log('Access granted to /dashboard for role:', userRole)
            return NextResponse.next()
        } else {
            console.log('Access denied to /dashboard for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Special case: /dashboard/admin routes - only ADMIN can access
    if (pathname.startsWith('/dashboard/admin')) {
        if (userRole === UserRole.ADMIN) {
            console.log('Access granted to admin route for ADMIN role')
            return NextResponse.next()
        } else {
            console.log('Access denied to admin route for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Check common routes (multiple roles can access)
    const isCommonRoute = commonRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (isCommonRoute) {
        // REAL_ESTATE_DEVELOPER and ADMIN can access common routes
        if (userRole === UserRole.REAL_ESTATE_DEVELOPER || userRole === UserRole.ADMIN) {
            console.log('Access granted to common route for role:', userRole)
            return NextResponse.next()
        } else {
            console.log('Access denied to common route for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Role-specific route checking
    if (userRole && roleRoutes[userRole]) {
        const hasAccess = roleRoutes[userRole].some(route =>
            pathname.startsWith(route)
        )

        if (hasAccess) {
            console.log('Access granted for role:', userRole, 'to path:', pathname)
            return NextResponse.next()
        } else {
            console.log('Access denied for role:', userRole, 'to path:', pathname)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // No valid role found
    console.log('No valid role found, redirecting to login')
    const loginUrl = new URL('/LoginPage', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
}

export const config = {
    matcher: [
        // Protect all dashboard and admin routes
        '/profile/:path*',
        '/dashboard/:path*',
        '/my-properties/:path*',
        '/bookings/:path*'
    ]
}