"use client"
import React from "react"

interface Props {
    totalUsers: number
    adminCount: number
    moderatorCount: number
    ownerCount: number
}

const UserOverview: React.FC<Props> = ({ totalUsers, adminCount, moderatorCount, ownerCount }) => {
    return (
        <div className="p-4 rounded-lg shadow bg-white">
            <h2 className="font-semibold text-lg mb-2">User Overview</h2>
            <p>Total Users: {totalUsers}</p>
            <p>Admins: {adminCount}</p>
            <p>Moderators: {moderatorCount}</p>
            <p>Owners: {ownerCount}</p>
        </div>
    )
}

export default UserOverview
