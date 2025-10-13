"use client"
import React from "react"
import { Users, Shield, Building2, UserCheck, TrendingUp } from "lucide-react"

interface Props {
    totalUsers: number
    adminCount: number
    real_esate_developerCount: number
}

const UserOverview: React.FC<Props> = ({ totalUsers, adminCount, real_esate_developerCount }) => {
    // Calculate regular user count
    const regularUserCount = totalUsers - adminCount - real_esate_developerCount

    // Calculate percentages
    const adminPercentage = totalUsers > 0 ? (adminCount / totalUsers) * 100 : 0
    const developerPercentage = totalUsers > 0 ? (real_esate_developerCount / totalUsers) * 100 : 0
    const regularUserPercentage = totalUsers > 0 ? (regularUserCount / totalUsers) * 100 : 0

    const userStats = [
        {
            role: "Total Users",
            count: totalUsers,
            percentage: 100,
            icon: Users,
            color: "bg-blue-500",
            textColor: "text-blue-600",
            bgColor: "bg-blue-50",
            description: "All platform users"
        },
        {
            role: "Admins",
            count: adminCount,
            percentage: adminPercentage,
            icon: Shield,
            color: "bg-red-500",
            textColor: "text-red-600",
            bgColor: "bg-red-50",
            description: "Platform administrators"
        },
        {
            role: "Real Estate Developers",
            count: real_esate_developerCount,
            percentage: developerPercentage,
            icon: Building2,
            color: "bg-green-500",
            textColor: "text-green-600",
            bgColor: "bg-green-50",
            description: "Property developers"
        },
        {
            role: "Regular Users",
            count: regularUserCount,
            percentage: regularUserPercentage,
            icon: UserCheck,
            color: "bg-purple-500",
            textColor: "text-purple-600",
            bgColor: "bg-purple-50",
            description: "Standard platform users"
        }
    ]

    return (
        <div className="bg-white w-full rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        User Overview
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Platform user distribution and statistics
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Active</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {userStats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 ${stat.bgColor}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                                        <IconComponent className={`h-5 w-5 ${stat.textColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.role}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-semibold ${stat.textColor}`}>
                                        {stat.percentage.toFixed(1)}%
                                    </div>
                                    <div className="text-xs text-gray-500">of total</div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${stat.color}`}
                                        style={{ width: `${stat.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                        </div>
                    )
                })}
            </div>

            {/* Summary Section */}
            <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-600">Admin Ratio</p>
                        <p className="text-lg font-semibold text-red-600">{adminPercentage.toFixed(1)}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Developer Ratio</p>
                        <p className="text-lg font-semibold text-green-600">{developerPercentage.toFixed(1)}%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">User Ratio</p>
                        <p className="text-lg font-semibold text-purple-600">{regularUserPercentage.toFixed(1)}%</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Health:</span>
                    <span className="font-medium text-green-600">Excellent</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">User Growth:</span>
                    <span className="font-medium text-blue-600">+12.5% this month</span>
                </div>
            </div>
        </div>
    )
}

export default UserOverview