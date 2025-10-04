"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FiEdit } from "react-icons/fi"
import { TiUserDeleteOutline } from "react-icons/ti"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Role } from "@/lib/roles"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import { updateUserRole } from "@/app/features/user/userAuthSlice"
import { User } from "@/app/Types/user"

const roles: Role[] = ["user", "admin", "real_estate_developer"]

interface ActionsProps {
    user: User
    onDelete: (user: User) => void
}

const Actions: React.FC<ActionsProps> = ({ user, onDelete }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const [selectedRole, setSelectedRole] = useState<Role>(user.role)

    const handleRoleChange = () => {
        dispatch(updateUserRole({ id: user._id, role: selectedRole }))
        setOpen(false)
    }

    return (
        <div className="flex space-x-2 mt-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-200 rounded-xl">
                        <FiEdit className="mr-2 w-4 h-4" /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Role</DialogTitle>
                    </DialogHeader>
                    <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)} className="space-y-2 mt-4">
                        {roles.map((role) => (
                            <div key={role} className="flex items-center space-x-2">
                                <RadioGroupItem value={role} id={role} />
                                <label htmlFor={role} className="text-sm font-medium">{role.toUpperCase()}</label>
                            </div>
                        ))}
                    </RadioGroup>
                    <DialogFooter>
                        <Button onClick={handleRoleChange}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(user)}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 hover:scale-105 transition-transform duration-200 rounded-xl shadow-lg shadow-red-500/30"
            >
                <TiUserDeleteOutline className="mr-2 w-4 h-4" /> Delete
            </Button>
        </div>
    )
}

export default Actions
