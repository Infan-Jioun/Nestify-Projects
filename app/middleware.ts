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
        // Remove admin-specific routes from real estate developer
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

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('=== Middleware Debug ===')
        console.log('Requested path:', pathname)
    }

    // Check public routes first
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    if (isPublicRoute) {
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

    // Special case: /dashboard/admin routes - ONLY ADMIN can access
    if (pathname.startsWith('/dashboard/admin')) {
        if (userRole === UserRole.ADMIN) {
            console.log('Access granted to admin route for ADMIN role')
            return NextResponse.next()
        } else {
            console.log('Access denied to admin route for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Special case: /dashboard/users-information - ONLY ADMIN can access
    if (pathname.startsWith('/dashboard/users-information')) {
        if (userRole === UserRole.ADMIN) {
            console.log('Access granted to users-information for ADMIN role')
            return NextResponse.next()
        } else {
            console.log('Access denied to users-information for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Special case: /dashboard/add-city - ONLY ADMIN can access
    if (pathname.startsWith('/dashboard/add-city')) {
        if (userRole === UserRole.ADMIN) {
            console.log('Access granted to add-city for ADMIN role')
            return NextResponse.next()
        } else {
            console.log('Access denied to add-city for role:', userRole)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
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

    // Check role-specific routes
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

    // No valid role found or route not found in allowed routes
    console.log('No valid role or route not allowed, redirecting to unauthorized')
    return NextResponse.redirect(new URL('/unauthorized', request.url))
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