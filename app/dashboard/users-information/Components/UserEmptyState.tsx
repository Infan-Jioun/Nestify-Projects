"use client"
import React from "react"
import { motion } from "framer-motion"
import { FiUser } from "react-icons/fi"

const UserEmptyState = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center">
            <FiUser className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No Users Found</h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
            There are no users in the system yet. Users will appear here once they register.
        </p>
    </motion.div>
)

export default UserEmptyState
