"use client"
import React from "react"
import Skeleton from "react-loading-skeleton"

const UserSkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
        {[...Array(8)].map((_, idx) => (
            <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Skeleton circle height={60} width={60} />
                    <div className="flex-1">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={80} height={16} className="mt-2" />
                    </div>
                </div>
                <Skeleton width="100%" height={40} className="mt-4 rounded-xl" />
            </div>
        ))}
    </div>
)

export default UserSkeletonGrid
