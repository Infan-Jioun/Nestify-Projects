import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { UserRole } from './Types/auth'

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

const routePermissions: { path: string; roles: UserRole[] }[] = [
    { path: '/dashboard/real_estate_developer', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER] },
    { path: '/dashboard/admin', roles: [UserRole.ADMIN] },
    { path: '/dashboard/users-information', roles: [UserRole.ADMIN] },
    { path: '/dashboard/add-city', roles: [UserRole.ADMIN] },
    { path: '/dashboard/add-properties', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER] },
    { path: '/dashboard/add-blog', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER] },
    { path: '/dashboard', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER] },
    { path: '/profile', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER, UserRole.USER] },
    { path: '/my-properties', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER] },
    { path: '/bookings', roles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER, UserRole.USER] },
]

function redirectToLogin(request: NextRequest, pathname: string, expired = false) {
    const loginUrl = new URL('/LoginPage', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    if (expired) {
        loginUrl.searchParams.set('expired', 'true') 
    }
    const response = NextResponse.redirect(loginUrl)
    if (expired) {
        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('next-auth.callback-url')
        response.cookies.delete('next-auth.csrf-token')
    }
    return response
}

function redirectToUnauthorized(request: NextRequest) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (process.env.NODE_ENV === 'development') {
        console.log('=== Middleware Debug ===')
        console.log('Requested path:', pathname)
    }

    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )
    if (isPublicRoute) {
        return NextResponse.next()
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
        console.log('No token found, redirecting to login')
        return redirectToLogin(request, pathname)
    }


    const now = Math.floor(Date.now() / 1000)
    if (token.exp && (token.exp as number) < now) {
        console.log('Token expired, clearing cookie and redirecting to login')
        return redirectToLogin(request, pathname, true) 
    }

    const userRole = token.role as UserRole

    if (process.env.NODE_ENV === 'development') {
        console.log('User Role from token:', userRole)
        console.log('Token data:', { id: token.id, email: token.email, role: token.role })
        console.log('Token expires at:', new Date((token.exp as number) * 1000).toLocaleTimeString())
    }


    if (!userRole || !Object.values(UserRole).includes(userRole)) {
        console.log('Invalid role found:', userRole)
        return redirectToLogin(request, pathname)
    }

    const matchedRoute = routePermissions.find(route =>
        pathname === route.path ||
        pathname.startsWith(route.path + '/') ||
        pathname.startsWith(route.path)
    )

    if (matchedRoute) {
        if (matchedRoute.roles.includes(userRole)) {
            console.log(`Access GRANTED — role: ${userRole}, path: ${pathname}`)
            return NextResponse.next()
        } else {
            console.log(`Access DENIED — role: ${userRole}, path: ${pathname}`)
            return redirectToUnauthorized(request)
        }
    }
    console.log('No matching route found, redirecting to unauthorized')
    return redirectToUnauthorized(request)
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/dashboard/:path*',
        '/my-properties/:path*',
        '/bookings/:path*'
    ]
}