// lib/auth-utils.ts

import { UserRole } from '@/app/Types/auth'


// সরাসরি auth import করার পরিবর্তে, server action ব্যবহার করুন
export async function getCurrentUser() {
    try {
        // NextAuth এর auth() function server components এ কাজ করে
        const { auth } = await import('@/lib/auth')
        const session = await auth()
        return session?.user || null
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}

export async function getUserRole(): Promise<UserRole | null> {
    try {
        const user = await getCurrentUser()
        return user?.role || null
    } catch (error) {
        console.error('Error getting user role:', error)
        return null
    }
}

export async function hasRole(requiredRole: UserRole): Promise<boolean> {
    try {
        const userRole = await getUserRole()
        return userRole === requiredRole
    } catch (error) {
        console.error('Error checking role:', error)
        return false
    }
}

export async function hasAnyRole(requiredRoles: UserRole[]): Promise<boolean> {
    try {
        const userRole = await getUserRole()
        return requiredRoles.includes(userRole as UserRole)
    } catch (error) {
        console.error('Error checking roles:', error)
        return false
    }
}