// app/hooks/useRoleGuard.ts
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { UserRole } from "@/app/Types/auth"

interface UseRoleGuardProps {
    allowedRoles: UserRole[]
    redirectTo?: string
    callbackUrl?: string
}

export function useRoleGuard({
    allowedRoles,
    redirectTo = "/unauthorized",
    callbackUrl = "/",
}: UseRoleGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        if (status === "loading") {
            setIsChecking(true)
            return
        }

        setIsChecking(false)
   
        if (!session?.user) {
            console.log(" No session, redirecting to login")
            const loginUrl = `/LoginPage?callbackUrl=${encodeURIComponent(callbackUrl)}`
            router.push(loginUrl)
            return
        }

        const userRole = session.user.role as UserRole

        // Debugging
        if (process.env.NODE_ENV === 'development') {
            console.log(' Role Guard Debug:')
            console.log('User Role:', userRole)
            console.log('User ID:', session.user.id)
            console.log('Allowed Roles:', allowedRoles)
            console.log('Has Access:', allowedRoles.includes(userRole))
        }

        // Role check
        if (!userRole || !allowedRoles.includes(userRole)) {
            console.log(" Access denied, redirecting to:", redirectTo)
            router.push(redirectTo)
            return
        }

        console.log(" Access granted")
    }, [session, status, router, allowedRoles, redirectTo, callbackUrl])

    return {
        hasAccess: session?.user?.role ? allowedRoles.includes(session.user.role as UserRole) : false,
        isLoading: status === "loading" || isChecking,
        userRole: session?.user?.role as UserRole,
        user: session?.user
    }
}