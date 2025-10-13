"use client"
import React from "react"

interface Props {
    totalUsers: number
    adminCount: number
    real_esate_developerCount: number

}

const UserOverview: React.FC<Props> = ({ totalUsers, adminCount, real_esate_developerCount}) => {
    return (
        <div className="p-4 rounded-lg shadow bg-white">
            <h2 className="font-semibold text-lg mb-2">User Overview</h2>
            <p>Total Users: {totalUsers}</p>
            <p>Admins: {adminCount}</p>
            <p>Real Esate Developer : {real_esate_developerCount}</p>
            
        </div>
    )
}

export default UserOverview
