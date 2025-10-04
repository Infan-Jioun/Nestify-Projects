"use client"
import React from "react"
import { motion } from "framer-motion"

const UserHeader = ({ totalUsers }: { totalUsers: number }) => (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    User Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage all users and their permissions in one place
                </p>
            </div>
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Users: {totalUsers}
                </span>
            </div>
        </div>
    </motion.div>
)

export default UserHeader
