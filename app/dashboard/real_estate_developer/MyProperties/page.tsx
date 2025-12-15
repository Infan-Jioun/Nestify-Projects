"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail, deleteProperty, updatePropertyStatus, updateProperty } from '@/app/features/Properties/propertySlice' // Added updateProperty
import { PropertyType, SessionUser } from '@/app/Types/properties'
import Link from 'next/link'
import EditPropertyModal from './components/EditPropertyModal'
import {
    Home,
    Plus,
    Filter,
    Search,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Calendar,
    DollarSign,
    MapPin,
    TrendingUp,
    Building
} from 'lucide-react'
import Image from 'next/image'

// Skeleton Loader Component - Updated with modern design
function PropertiesSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
                    <div className="space-y-3">
                        <div className="h-9 bg-gray-200/70 rounded-xl w-64 animate-pulse"></div>
                        <div className="h-4 bg-gray-200/70 rounded-xl w-48 animate-pulse"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-12 bg-gray-200/70 rounded-xl w-40 animate-pulse"></div>
                        <div className="h-12 bg-gray-200/70 rounded-xl w-32 animate-pulse"></div>
                    </div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm animate-pulse">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-5 bg-gray-200/70 rounded-xl w-24 mb-2"></div>
                                    <div className="h-8 bg-gray-200/70 rounded-xl w-16"></div>
                                </div>
                                <div className="h-12 w-12 bg-gray-200/70 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Properties Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden animate-pulse">
                        <div className="h-56 bg-gradient-to-r from-gray-200/70 to-gray-300/70 relative">
                            <div className="absolute top-4 right-4 h-8 w-20 bg-gray-300/70 rounded-full"></div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-200/70 rounded-xl w-3/4"></div>
                                <div className="h-4 bg-gray-200/70 rounded-xl w-1/2"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 bg-gray-200/70 rounded-lg"></div>
                                <div className="h-4 bg-gray-200/70 rounded-xl w-32"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div className="h-10 bg-gray-200/70 rounded-xl w-28"></div>
                                <div className="h-10 bg-gray-200/70 rounded-xl w-28"></div>
                            </div>
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
    const { properties, loading: reduxLoading } = useSelector((state: RootState) => state.properties) // Changed from loading to reduxLoading

    const [editingProperty, setEditingProperty] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [statusUpdate, setStatusUpdate] = useState<{ [key: string]: string }>({})
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [localLoading, setLocalLoading] = useState(true)

    // Fetch properties when component mounts and session is available
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            const userEmail = session.user.email
            console.log('Fetching properties for:', userEmail)
            dispatch(fetchPropertiesByEmail(userEmail))
                .then(() => setLocalLoading(false))
                .catch(() => setLocalLoading(false))
        } else {
            setLocalLoading(false)
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

            const updatedPropertyData = {
                ...propertyData,
                _id: selectedProperty._id,
                category: propertyData.category || selectedProperty.category
            }

            console.log('Updated property data:', updatedPropertyData)

            await dispatch(updateProperty({
                id: selectedProperty._id, // Changed from propertyId to id
                propertyData: updatedPropertyData
            })).unwrap()

            console.log('Property updated successfully via API')

            setEditModalOpen(false)
            setSelectedProperty(null)

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

    // Filter properties based on search and status
    const filteredProperties = properties?.filter(property => {
        const matchesSearch = searchQuery === '' ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.geoCountryLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.category.name.toLowerCase().includes(searchQuery.toLowerCase()) // Changed from .category to .category.name

        const matchesStatus = statusFilter === 'all' || property.status === statusFilter

        return matchesSearch && matchesStatus
    })

    if (status === 'loading' || reduxLoading || localLoading) {
        return <PropertiesSkeleton />
    }

    const sessionUser = session?.user as SessionUser

    // Calculate stats
    const totalProperties = properties?.length || 0
    const availableCount = properties?.filter(p => p.status === 'Available').length || 0
    const pendingCount = properties?.filter(p => p.status === 'Pending').length || 0
    const soldCount = properties?.filter(p => p.status === 'Sold').length || 0
    const rentedCount = properties?.filter(p => p.status === 'Rented').length || 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                                <Building className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                        </div>
                        <p className="text-gray-600">Manage and track all your property listings in one place</p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {session?.user?.email}
                            </span>
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                {sessionUser?.role || 'Real Estate Developer'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/dashboard/real_estate_developer/add-property"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Property
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 font-medium shadow-sm"
                        >
                            <Home className="w-5 h-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Properties</p>
                                <h3 className="text-2xl font-bold text-gray-900">{totalProperties}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                                <Home className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Available</p>
                                <h3 className="text-2xl font-bold text-emerald-600">{availableCount}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <h3 className="text-2xl font-bold text-amber-600">{pendingCount}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Rented/Sold</p>
                                <h3 className="text-2xl font-bold text-purple-600">{rentedCount + soldCount}</h3>
                            </div>
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search properties by title, location, or category..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <div className="flex flex-wrap gap-2">
                                {['all', 'Available', 'Pending', 'Rented', 'Sold'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${statusFilter === status
                                            ? status === 'all'
                                                ? 'bg-emerald-500 text-white shadow-lg'
                                                : status === 'Available'
                                                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                                                    : status === 'Pending'
                                                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-500'
                                                        : status === 'Rented'
                                                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                                                            : 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status === 'all' ? 'All Properties' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            {filteredProperties && filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property: PropertyType) => (
                        property._id && (
                            <div key={property._id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                                {/* Property Image */}
                                <div className="relative h-56 overflow-hidden bg-gradient-to-r from-gray-200 to-gray-300">
                                    {property.images && property.images[0] && (
                                        <Image
                                            src={property.images[0]}
                                            alt={property.title}
                                            priority
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${property.status === 'Available'
                                            ? 'bg-emerald-500 text-white'
                                            : property.status === 'Pending'
                                                ? 'bg-amber-500 text-white'
                                                : property.status === 'Rented'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-purple-500 text-white'
                                            }`}>
                                            {property.status}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-lg text-sm font-medium">
                                            {property.category?.name || 'Uncategorized'} {/* Added optional chaining */}
                                        </span>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">{property.geoCountryLocation}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-emerald-600">${property.price?.toLocaleString() || '0'}</div> {/* Added optional chaining */}
                                            <div className="text-sm text-gray-500">{property.propertySize} sqft</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Added: {new Date(property?.createdAt || Date.now()).toLocaleDateString()}</span> {/* Fixed date */}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>{property.views || 0} views</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                                        <Link
                                            href={`/properties/${property._id}`}
                                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-all duration-300"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </Link>

                                        <button
                                            onClick={() => handleEditProperty(property)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2.5 rounded-lg font-medium transition-all duration-300"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => setDeleteConfirm(property._id!)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-lg font-medium transition-all duration-300"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-gray-200/50">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center">
                        <Home className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Properties Found</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {searchQuery || statusFilter !== 'all'
                            ? 'No properties match your search criteria. Try adjusting your filters.'
                            : "You haven't added any properties yet. Start by adding your first property listing."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/dashboard/real_estate_developer/add-property"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Your First Property
                        </Link>
                        {(searchQuery || statusFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setStatusFilter('all')
                                }}
                                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 font-medium shadow-sm"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Delete Property</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this property? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteProperty(deleteConfirm)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-all duration-300"
                            >
                                Delete Property
                            </button>
                        </div>
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