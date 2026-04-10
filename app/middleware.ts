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

// Route permissions map
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

// Helper: redirect to login with callbackUrl
function redirectToLogin(request: NextRequest, pathname: string) {
    const loginUrl = new URL('/LoginPage', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
}

// Helper: redirect to unauthorized
function redirectToUnauthorized(request: NextRequest) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (process.env.NODE_ENV === 'development') {
        console.log('=== Middleware Debug ===')
        console.log('Requested path:', pathname)
    }

    // ─── STEP 1: Public routes — সবার আগে check করো ──────────────────────────
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // ─── STEP 2: Token check — লগইন না থাকলে login এ পাঠাও ──────────────────
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
        console.log('No token found, redirecting to login with callbackUrl:', pathname)
        return redirectToLogin(request, pathname)  // ← callback URL সহ login এ
    }

    const userRole = token.role as UserRole

    if (process.env.NODE_ENV === 'development') {
        console.log('User Role from token:', userRole)
        console.log('Token data:', { id: token.id, email: token.email, role: token.role })
    }

    // ─── STEP 3: Role valid কিনা check করো ───────────────────────────────────
    if (!userRole || !Object.values(UserRole).includes(userRole)) {
        console.log('Invalid role found:', userRole)
        return redirectToLogin(request, pathname)
    }

    // ─── STEP 4: Route permission check ──────────────────────────────────────
    // সবচেয়ে specific (লম্বা) path আগে match হবে
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

    // ─── STEP 5: কোনো route match না হলে unauthorized ────────────────────────
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