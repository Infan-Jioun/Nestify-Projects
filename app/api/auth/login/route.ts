import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        const { email, password, role } = await request.json()

        // Your authentication logic here
        const user = await authenticateUser(email, password, role)

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Set cookies
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

        response.cookies.set('auth-token', 'your-jwt-token-here', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        response.cookies.set('user-role', user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        })

        return response

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

async function authenticateUser(email: string, password: string, role: string) {
    // Mock users - replace with your database logic
    const users = [
        { id: '1', email: 'user@example.com', password: 'password', name: 'Regular User', role: 'user' },
        { id: '2', email: 'developer@example.com', password: 'password', name: 'Real Estate Developer', role: 'real_estate_developer' },
        { id: '3', email: 'admin@example.com', password: 'password', name: 'Admin User', role: 'admin' }
    ]

    return users.find(user =>
        user.email === email &&
        user.password === password &&
        user.role === role
    )
}