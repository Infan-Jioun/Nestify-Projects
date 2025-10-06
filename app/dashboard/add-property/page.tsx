import React from 'react'
import AddPropertyBanner from './banner/AddPropertyBanner'
import AddPropertyFormPage from './add-property-form/add-property-form/AddPropertyForm'
import { useRoleGuard } from '@/app/hook/useRoleGuard'
import { UserRole } from '@/app/Types/auth'

export default function AddProperty() {
    useRoleGuard({
        allowedRoles: [UserRole.REAL_ESTATE_DEVELOPER, UserRole.ADMIN],
        callbackUrl: "/dashboard/add-property"
    })
    return (
        <div>
            <AddPropertyBanner />
            <AddPropertyFormPage />
        </div>
    )
}
