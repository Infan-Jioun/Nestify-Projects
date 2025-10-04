"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { User } from "@/app/Types/user"
import Details from "./Details"
import Actions from "./Actions"

const getRoleBadgeColor = (role: string) => {
    switch (role) {
        case "admin": return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30"
        case "moderator": return "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30"
        case "owner": return "bg-gradient-to-r from-lime-500 to-emerald-600 text-white shadow-lg shadow-lime-500/30"
        default: return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
    }
}

const getProviderIcon = (provider?: string) => {
    switch (provider) {
        case "google": return "🔴"
        case "github": return "⚫"
        case "credentials": return "🔵"
        default: return "🟢"
    }
}

interface UserCardProps {
    user: User
    onDelete: (user: User) => void
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl border border-green-100 dark:border-green-900/30 overflow-hidden transition-all duration-300"
        >
            {/* Green Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 dark:from-green-900/10 dark:via-emerald-900/10 dark:to-lime-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Green Accent Border on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 dark:group-hover:border-green-800/40 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            
            <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                                <Image
                                    src={user.image || "/image/businessman-character-avatar-isolated.png"}
                                    alt={user.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs shadow-lg">
                                {getProviderIcon(user.provider)}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg leading-tight">{user.name}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                                {user.role?.toUpperCase() || ""}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Component */}
                <Details user={user} />

                {/* Actions Component */}
                <Actions user={user} onDelete={onDelete} />
            </div>

         
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-emerald-300 to-lime-200 dark:from-green-600 dark:via-emerald-500 dark:to-lime-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
    )
}

export default UserCard;