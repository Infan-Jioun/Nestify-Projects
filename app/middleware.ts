
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
        "/dashboard",
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


    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }


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


    if (process.env.NODE_ENV === 'development') {
        console.log(' Middleware Debug:')
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

            console.log(' Access denied for role:', userRole, 'to path:', pathname)
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    } else {

        console.log(' No valid role found, redirecting to login')
        const loginUrl = new URL('/LoginPage', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }


    console.log(' Access granted for role:', userRole, 'to path:', pathname)
    return NextResponse.next()
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