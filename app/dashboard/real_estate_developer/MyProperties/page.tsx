// app/dashboard/real_estate_developer/MyProperties/page.tsx
"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail, deleteProperty, updatePropertyStatus, updateProperty } from '@/app/features/Properties/propertySlice'
import { PropertyType, SessionUser } from '@/app/Types/properties'
import Link from 'next/link'
import EditPropertyModal from './components/EditPropertyModal'
import PropertyCard from './components/PropertyCard'
// Add this to your MyProperties page
function PropertiesSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-3">
                        <div className="h-9 bg-gray-200 rounded-2xl w-80 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-2xl w-60 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded-2xl w-40 animate-pulse"></div>
                    </div>
                    <div className="h-14 bg-gray-200 rounded-2xl w-44 animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 bg-gray-200 rounded-2xl w-24 animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Properties Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded-2xl"></div>
                            <div className="h-4 bg-gray-200 rounded-2xl w-3/4"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                                <div className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                                <div className="h-6 bg-gray-200 rounded-2xl w-24"></div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <div className="h-12 bg-gray-200 rounded-2xl flex-1"></div>
                                <div className="h-12 bg-gray-200 rounded-2xl flex-1"></div>
                            </div>
                            <div className="h-12 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default function MyProperties() {
    const { data: session, status } = useSession()
    const dispatch = useDispatch<AppDispatch>()
    const { properties, loading, error } = useSelector((state: RootState) => state.properties)

    const [editingProperty, setEditingProperty] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [statusUpdate, setStatusUpdate] = useState<{ [key: string]: string }>({})
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    // Fetch properties when component mounts and session is available
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            const userEmail = session.user.email
            console.log('Fetching properties for:', userEmail)
            dispatch(fetchPropertiesByEmail(userEmail))
        }
    }, [dispatch, status, session?.user?.email])

    // Handle property deletion
    const handleDeleteProperty = async (propertyId: string) => {
        try {
            await dispatch(deleteProperty(propertyId)).unwrap()
            setDeleteConfirm(null)
            console.log('Property deleted successfully')
        } catch (error) {
            console.error('Failed to delete property:', error)
        }
    }

    // Handle status update
    const handleStatusUpdate = async (propertyId: string) => {
        const newStatus = statusUpdate[propertyId]
        if (!newStatus) return

        try {
            await dispatch(updatePropertyStatus({
                propertyId,
                status: newStatus as "Available" | "Rented" | "Sold" | "Pending"
            })).unwrap()
            setEditingProperty(null)
            setStatusUpdate(prev => ({ ...prev, [propertyId]: '' }))
            console.log('Property status updated successfully')
        } catch (error) {
            console.error('Failed to update property status:', error)
        }
    }

    // Handle edit property modal
    const handleEditProperty = (property: PropertyType) => {
        setSelectedProperty(property)
        setEditModalOpen(true)
    }

    // Handle save edited property
    const handleSaveProperty = async (propertyData: PropertyType) => {
        if (!selectedProperty?._id) return

        setUpdateLoading(true)
        try {
            await dispatch(updateProperty({
                propertyId: selectedProperty._id,
                propertyData
            })).unwrap()

            setEditModalOpen(false)
            setSelectedProperty(null)
            console.log('Property updated successfully')

            // Refresh the properties list
            if (session?.user?.email) {
                dispatch(fetchPropertiesByEmail(session.user.email))
            }
        } catch (error) {
            console.error('Failed to update property:', error)
        } finally {
            setUpdateLoading(false)
        }
    }

    if (status === 'loading' || loading) {
        return <PropertiesSkeleton />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        )
    }

    const sessionUser = session?.user as SessionUser

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                        <p className="text-gray-600 mt-2">Manage your property listings</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Email: {session?.user?.email} • Role: {sessionUser?.role || 'Real Estate Developer'}
                        </p>
                    </div>
                    <Link
                        href="/dashboard/real_estate_developer/add-property"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        + Add New Property
                    </Link>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Total: {properties?.length || 0}
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Available: {properties?.filter(p => p.status === 'Available').length || 0}
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Pending: {properties?.filter(p => p.status === 'Pending').length || 0}
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        Sold: {properties?.filter(p => p.status === 'Sold').length || 0}
                    </div>
                    <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        Rented: {properties?.filter(p => p.status === 'Rented').length || 0}
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((property: PropertyType) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            isEditing={editingProperty === property._id}
                            isDeleting={deleteConfirm === property._id}
                            statusValue={statusUpdate[property._id!] || property.status}
                            onEditClick={() => handleEditProperty(property)}
                            onDeleteClick={() => setDeleteConfirm(property._id!)}
                            onStatusChange={(value: string) => setStatusUpdate(prev => ({ ...prev, [property._id!]: value }))}
                            onStatusUpdate={() => handleStatusUpdate(property._id!)}
                            onCancelEdit={() => {
                                setEditingProperty(null)
                                setStatusUpdate(prev => ({ ...prev, [property._id!]: '' }))
                            }}
                            onStartEdit={() => setEditingProperty(property._id!)}
                            onCancelDelete={() => setDeleteConfirm(null)}
                            onConfirmDelete={() => handleDeleteProperty(property._id!)}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Properties Found</h3>
                    <p className="text-gray-600 mb-8 text-lg">You haven't added any properties yet.</p>
                    <Link
                        href="/dashboard/real_estate_developer/add-property"
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
                    >
                        Add Your First Property
                    </Link>
                </div>
            )}

            {/* Edit Property Modal */}
            <EditPropertyModal
                property={selectedProperty}
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false)
                    setSelectedProperty(null)
                }}
                onSave={handleSaveProperty}
                loading={updateLoading}
            />
        </div>
    )
}