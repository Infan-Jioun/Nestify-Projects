"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FiEdit, FiUser, FiShield, FiCheck } from "react-icons/fi"
import { LuBuilding } from "react-icons/lu"
import { RiDeleteBinLine } from "react-icons/ri"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/app/Types/user"
import { Role } from "@/lib/roles"
import { useRoleManager } from "@/hooks/useRoleManager"

const roles: { value: Role; label: string; icon: React.ReactNode; description: string; color: string }[] = [
    {
        value: "user",
        label: "User",
        icon: <FiUser className="w-4 h-4" />,
        description: "Basic access with limited permissions",
        color: "bg-green-500/10 text-green-700 border-green-200",
    },
    {
        value: "admin",
        label: "Administrator",
        icon: <FiShield className="w-4 h-4" />,
        description: "Full system access and management",
        color: "bg-red-500/10 text-red-700 border-red-200",
    },
    {
        value: "real_estate_developer",
        label: "Real Estate Developer",
        icon: <LuBuilding className="w-4 h-4" />,
        description: "Property management and development access",
        color: "bg-green-500/10 text-green-700 border-green-200",
    },
]

interface ActionsProps {
    user: User
    onDelete: (user: User) => void
}

const Actions: React.FC<ActionsProps> = ({ user, onDelete }) => {
    const [open, setOpen] = useState(false)
    const { selectedRole, setSelectedRole, isUpdating, handleRoleChange } = useRoleManager({ user })


    const getCurrentRole = () => roles.find((r) => r.value === user.role)
    const currentRole = getCurrentRole()

    return (
        <div className="flex flex-col space-y-3">
            {/* Current Role Display */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${currentRole?.color}`}>{currentRole?.icon}</div>
                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">CURRENT ROLE</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{currentRole?.label}</p>
                    </div>
                </div>
                <Badge variant="secondary" className={currentRole?.color}>
                    Active
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg shadow-green-500/25 hover:shadow-green-600/30 hover:scale-105 transition-all duration-200 rounded-lg group hover:text-white"
                        >
                            <div className="flex items-center justify-center">
                                <FiEdit className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                                Edit Role
                            </div>
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-lg">
                                <FiEdit className="w-5 h-5 text-green-600" />
                                Update User Role
                            </DialogTitle>
                        </DialogHeader>

                        {/* User Info */}
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.image || ""} alt={user.name} />
                                <AvatarFallback className="bg-green-100 text-green-600">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                            <Badge variant="secondary" className={currentRole?.color}>
                                Current: {user.role}
                            </Badge>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-4 py-4">
                            <Label className="text-base font-semibold">Select New Role</Label>
                            <RadioGroup value={selectedRole} onValueChange={(v) => setSelectedRole(v as Role)} className="space-y-3">
                                {roles.map((role) => (
                                    <div
                                        key={role.value}
                                        className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedRole === role.value
                                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                            }`}
                                        onClick={() => setSelectedRole(role.value)}
                                    >
                                        <div className="flex items-center h-5 mt-0.5">
                                            <RadioGroupItem value={role.value} id={role.value} />
                                        </div>
                                        <div className="flex items-start space-x-3 flex-1">
                                            <div className={`p-2 rounded-lg ${role.color}`}>{role.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor={role.value} className="text-sm font-semibold cursor-pointer">
                                                        {role.label}
                                                    </Label>
                                                    {selectedRole === role.value && <FiCheck className="w-4 h-4 text-green-600" />}
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{role.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <DialogFooter className="flex gap-2 sm:gap-0">
                            <Button variant="outline" onClick={() => setOpen(false)} disabled={isUpdating} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                onClick={async () => {
                                    await handleRoleChange()
                                    setOpen(false)
                                }}
                                disabled={isUpdating || selectedRole === user.role}
                                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                            >
                                {isUpdating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Role"
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(user)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 shadow-lg shadow-red-500/25 hover:shadow-red-600/30 hover:scale-105 transition-all duration-200 rounded-lg group"
                >
                    <div className="flex items-center justify-center">
                        <RiDeleteBinLine className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                        Delete User
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Actions
