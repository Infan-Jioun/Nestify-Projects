"use client"
import React from 'react'
import AddDistrictForm from './components/AddCityForm/AddDistrictForm'
import DistrictBanner from './components/DsitrictBanner'
import { useRoleGuard } from '@/app/hook/useRoleGuard'
import { UserRole } from '@/app/Types/auth'


export default function AddCity() {
    useRoleGuard({
        allowedRoles: [UserRole.ADMIN],
        callbackUrl: "/dashboard/add-city"
    })
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Banner Section */}
            <div className="max-w-7xl mx-auto">
                <DistrictBanner />
            </div>

            {/* Form Section */}
            <div className=" mx-auto mt-8 md:mt-12">
                <AddDistrictForm />
            </div>
        </div>
    )
}
