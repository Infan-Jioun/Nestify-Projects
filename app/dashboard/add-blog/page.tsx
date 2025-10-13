"use client"
import React from 'react'
import AddBlogForm from './Components/AddBlogForm/AddBlogForm'
import BlogBanner from './Components/BlogBanner/BlogBanner'
import { useRoleGuard } from '@/app/hook/useRoleGuard'
import { UserRole } from '@/app/Types/auth'

export default function AddBlogPage() {
    useRoleGuard({
        allowedRoles: [UserRole.REAL_ESTATE_DEVELOPER, UserRole.ADMIN],
        callbackUrl: "/dashboard"
    })
    return (
        <div>
            {/* <BlogBanner /> */}
            <AddBlogForm />
        </div>
    )
}
