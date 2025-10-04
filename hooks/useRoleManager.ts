"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast" //
import { AppDispatch } from "@/lib/store"
import { updateUserRole } from "@/app/features/user/userAuthSlice"
import { Role } from "@/lib/roles"
import { User } from "@/app/Types/user"

interface UseRoleManagerProps {
    user: User
    refetch?: () => Promise<User[]> 
}

export function useRoleManager({ user, refetch }: UseRoleManagerProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [selectedRole, setSelectedRole] = useState<Role>(user.role)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleRoleChange = async () => {
        if (selectedRole === user.role) {
            toast("Role is already selected.", { icon: "ℹ️" })
            return
        }

        setIsUpdating(true)
        try {
            await dispatch(updateUserRole({ id: user._id, role: selectedRole })).unwrap()
            toast.success(`Role updated to ${selectedRole}!`)
            if (refetch) await refetch()
        } catch (error) {
            console.error("Failed to update role:", error)
            toast.error("Failed to update role. Try again.")
        } finally {
            setIsUpdating(false)
        }
    }

    return {
        selectedRole,
        setSelectedRole,
        isUpdating,
        handleRoleChange,
    }
}
