"use client"
import React from "react"
import { motion } from "framer-motion"
import { User } from "@/app/Types/user"
import UserCard from "./UserCard"



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
