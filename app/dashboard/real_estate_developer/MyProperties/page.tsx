"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail, deleteProperty, updatePropertyStatus, updateProperty } from '@/app/features/Properties/propertySlice'
import { PropertyType, SessionUser } from '@/app/Types/properties'
import Link from 'next/link'
import PropertyCard from './components/PropertyCard'
import EditPropertyModal from './components/EditPropertyModal'

// Skeleton Loader Component
function PropertiesSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header Skeleton */}
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 sm:mb-6">
                    <div className="space-y-2 sm:space-y-3 flex-1">
                        <div className="h-7 sm:h-9 bg-gray-200 rounded-2xl w-48 sm:w-80 animate-pulse"></div>
                        <div className="h-3 sm:h-4 bg-gray-200 rounded-2xl w-32 sm:w-60 animate-pulse"></div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded-2xl w-24 sm:w-40 animate-pulse"></div>
                    </div>
                    <div className="h-12 sm:h-14 bg-gray-200 rounded-2xl w-full sm:w-44 animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-6 sm:h-8 bg-gray-200 rounded-2xl w-16 sm:w-24 animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Properties Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                        <div className="h-40 sm:h-48 bg-gray-200"></div>
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                            <div className="h-5 sm:h-6 bg-gray-200 rounded-2xl"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 rounded-2xl w-3/4"></div>
                            <div className="flex gap-1 sm:gap-2 flex-wrap">
                                <div className="h-5 sm:h-6 bg-gray-200 rounded-2xl w-16 sm:w-20"></div>
                                <div className="h-5 sm:h-6 bg-gray-200 rounded-2xl w-16 sm:w-20"></div>
                                <div className="h-5 sm:h-6 bg-gray-200 rounded-2xl w-20 sm:w-24"></div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 pt-2">
                                <div className="h-10 sm:h-12 bg-gray-200 rounded-2xl flex-1"></div>
                                <div className="h-10 sm:h-12 bg-gray-200 rounded-2xl flex-1"></div>
                            </div>
                            <div className="h-10 sm:h-12 bg-gray-200 rounded-2xl"></div>
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
        if (!propertyId) return

        try {
            console.log('Deleting property:', propertyId)
            await dispatch(deleteProperty(propertyId)).unwrap()
            setDeleteConfirm(null)
            console.log('Property deleted successfully')

            // Refresh properties after deletion
            if (session?.user?.email) {
                dispatch(fetchPropertiesByEmail(session.user.email))
            }
        } catch (error) {
            console.error('Failed to delete property:', error)
        }
    }

    // Handle status update
    const handleStatusUpdate = async (propertyId: string) => {
        if (!propertyId) return

        const newStatus = statusUpdate[propertyId]
        if (!newStatus) return

        try {
            console.log('Updating status for:', propertyId, 'to:', newStatus)
            await dispatch(updatePropertyStatus({
                propertyId,
                status: newStatus as "Available" | "Rented" | "Sold" | "Pending"
            })).unwrap()

            setEditingProperty(null)
            setStatusUpdate(prev => ({ ...prev, [propertyId]: '' }))
            console.log('Property status updated successfully')

            // Refresh properties after status update
            if (session?.user?.email) {
                dispatch(fetchPropertiesByEmail(session.user.email))
            }
        } catch (error) {
            console.error('Failed to update property status:', error)
        }
    }

    // Handle edit property modal
    const handleEditProperty = (property: PropertyType) => {
        console.log('Editing property:', property)
        setSelectedProperty(property)
        setEditModalOpen(true)
    }

    // Handle save edited property
    const handleSaveProperty = async (propertyData: PropertyType) => {
        if (!selectedProperty?._id) {
            console.error('No property ID found for update')
            return
        }

        setUpdateLoading(true)
        try {
            console.log('Saving property update for:', selectedProperty._id)

            // Ensure we're sending the full property data with category
            const updatedPropertyData = {
                ...propertyData,
                _id: selectedProperty._id, // Ensure ID is included
                category: propertyData.category || selectedProperty.category // Ensure category exists
            }

            console.log('Updated property data:', updatedPropertyData)

            await dispatch(updateProperty({
                propertyId: selectedProperty._id,
                propertyData: updatedPropertyData
            })).unwrap()

            console.log('Property updated successfully via API')

            setEditModalOpen(false)
            setSelectedProperty(null)

            // Refresh the properties list after successful update
            if (session?.user?.email) {
                console.log('Refreshing properties list...')
                dispatch(fetchPropertiesByEmail(session.user.email))
            }
        } catch (error) {
            console.error('Failed to update property:', error)
        } finally {
            setUpdateLoading(false)
        }
    }

    // Handle modal close
    const handleModalClose = () => {
        setEditModalOpen(false)
        setSelectedProperty(null)
        setUpdateLoading(false)
    }

    if (status === 'loading' || loading) {
        return <PropertiesSkeleton />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base">
                    <strong>Error:</strong> {error}
                </div>
                <div className="mt-4">
                    <Link href={"/"}>
                        <button className='w-full mx-auto bg-green-500 hover:bg-green-600 p-3 text-white rounded-2xl drop-shadow-2xl font-medium'>
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    const sessionUser = session?.user as SessionUser

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Properties</h1>
                        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your property listings</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Email: {session?.user?.email} • Role: {sessionUser?.role || 'Real Estate Developer'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link
                            href="/dashboard/real_estate_developer/add-property"
                            className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm sm:text-base w-full text-center"
                        >
                            + Add New Property
                        </Link>
                        <Link
                            href="/"
                            className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base w-full text-center"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Total: {properties?.length || 0}
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Available: {properties?.filter(p => p.status === 'Available').length || 0}
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Pending: {properties?.filter(p => p.status === 'Pending').length || 0}
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Sold: {properties?.filter(p => p.status === 'Sold').length || 0}
                    </div>
                    <div className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Rented: {properties?.filter(p => p.status === 'Rented').length || 0}
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            {properties && properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {properties.map((property: PropertyType) => (
                        property._id && (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                isEditing={editingProperty === property._id}
                                isDeleting={deleteConfirm === property._id}
                                statusValue={statusUpdate[property._id] || property.status}
                                onEditClick={() => handleEditProperty(property)}
                                onDeleteClick={() => setDeleteConfirm(property._id)}
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
                        )
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-12 text-center border border-gray-100">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🏠</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No Properties Found</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-lg">{"You haven't added any properties yet."}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/dashboard/real_estate_developer/add-property"
                            className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-600 transition-colors font-semibold text-sm sm:text-lg w-full sm:w-auto inline-block text-center"
                        >
                            Add Your First Property
                        </Link>
                        <Link
                            href="/"
                            className="bg-gray-200 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-lg w-full sm:w-auto inline-block text-center"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            )}

            {/* Edit Property Modal */}
            {editModalOpen && (
                <EditPropertyModal
                    property={selectedProperty}
                    isOpen={editModalOpen}
                    onClose={handleModalClose}
                    onSave={handleSaveProperty}
                    loading={updateLoading}
                />
            )}
        </div>
    )
}