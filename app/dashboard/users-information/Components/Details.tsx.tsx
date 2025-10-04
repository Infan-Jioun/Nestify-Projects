"use client"
import React from "react"
import { FiMail, FiCalendar, FiGlobe } from "react-icons/fi"
import { User } from "@/app/Types/user"

interface DetailsProps {
    user: User
}

const Details: React.FC<DetailsProps> = ({ user }) => {
    return (
        <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FiMail className="w-4 h-4 text-blue-500" />
                <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FiCalendar className="w-4 h-4 text-green-500" />
                <span>
                    Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    }) : "N/A"}
                </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FiGlobe className="w-4 h-4 text-purple-500" />
                <span>Provider: {user.provider || "Credentials"}</span>
            </div>
        </div>
    )
}

export default Details
