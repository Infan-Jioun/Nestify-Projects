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
            <div className="md:flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
                <div className="p-2 bg-green-100 dark:bg-green-800/40 rounded-lg">
                    <FiMail className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">EMAIL</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{user.email}</p>
                </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-800/40 rounded-lg">
                    <FiCalendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">JOINED DATE</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                        }) : "N/A"}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-lime-50 dark:bg-lime-900/20 rounded-xl border border-lime-100 dark:border-lime-800/30">
                <div className="p-2 bg-lime-100 dark:bg-lime-800/40 rounded-lg">
                    <FiGlobe className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                </div>
                <div>
                    <p className="text-xs text-lime-600 dark:text-lime-400 font-medium">PROVIDER</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 capitalize">{user.provider || "Credentials"}</p>
                </div>
            </div>
        </div>
    )
}

export default Details;