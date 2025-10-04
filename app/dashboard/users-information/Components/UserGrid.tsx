"use client"
import React from "react"
import { motion } from "framer-motion"
import UserCard from "./UserCard"
import { User } from "@/app/Types/user"


const UserGrid = ({ users, onDelete }: { users: User[], onDelete: (user: User) => void }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
    >
        {users.map((user) => (
            <UserCard key={user._id} user={user} onDelete={onDelete} />
        ))}
    </motion.div>
)

export default UserGrid
