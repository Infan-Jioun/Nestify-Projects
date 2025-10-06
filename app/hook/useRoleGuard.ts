"use client"

import { useEffect } from "react"
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
    callbackUrl = "/dashboard",
}: UseRoleGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return

        if (!session?.user) {
            router.push(`/LoginPage?callbackUrl=${callbackUrl}`)
            return
        }
        const userRole = session.user.role as UserRole

        if (!allowedRoles.includes(userRole)) {
            router.push(redirectTo)
            return
        }
    }, [session, status, router, allowedRoles, redirectTo, callbackUrl])
}
