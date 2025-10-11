// app/dashboard/real_estate_developer/MyProperties/components/PropertyCard.tsx
import React from 'react'
import { PropertyType } from '@/app/Types/properties'

interface PropertyCardProps {
    property: PropertyType
    isEditing: boolean
    isDeleting: boolean
    statusValue: string
    onEditClick: () => void
    onDeleteClick: () => void
    onStatusChange: (value: string) => void
    onStatusUpdate: () => void
    onCancelEdit: () => void
    onStartEdit: () => void
    onCancelDelete: () => void
    onConfirmDelete: () => void
}

export default function PropertyCard({
    property,
    isEditing,
    isDeleting,
    statusValue,
    onEditClick,
    onDeleteClick,
    onStatusChange,
    onStatusUpdate,
    onCancelEdit,
    onStartEdit,
    onCancelDelete,
    onConfirmDelete
}: PropertyCardProps) {
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Available': return 'bg-emerald-500 text-white'
            case 'Sold': return 'bg-blue-500 text-white'
            case 'Pending': return 'bg-amber-500 text-white'
            case 'Rented': return 'bg-purple-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case 'Available': return '🟢'
            case 'Sold': return '🔵'
            case 'Pending': return '🟡'
            case 'Rented': return '🟣'
            default: return '⚪'
        }
    }

    const getCategoryColor = (categoryName: string): string => {
        const colors: Record<string, string> = {
            'house': 'from-orange-500 to-amber-500',
            'apartment': 'from-indigo-500 to-purple-500',
            'condo': 'from-pink-500 to-rose-500',
            'townhouse': 'from-teal-500 to-cyan-500',
            'land': 'from-lime-500 to-green-500',
            'commercial': 'from-amber-500 to-yellow-500',
            'duplex': 'from-cyan-500 to-blue-500',
            'office space': 'from-violet-500 to-purple-500',
            'shop': 'from-fuchsia-500 to-pink-500',
            'warehouse': 'from-rose-500 to-red-500',
            'restaurant': 'from-emerald-500 to-green-500',
            'hotel': 'from-sky-500 to-blue-500'
        }
        return colors[categoryName.toLowerCase()] || 'from-gray-500 to-gray-600'
    }

    const formatPrice = (price: number): string => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`
        } else if (price >= 1000) {
            return `$${(price / 1000).toFixed(1)}K`
        }
        return `$${price}`
    }

    return (
        <>
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:scale-[1.02]">
                {/* Property Image with Gradient Overlay */}
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                        <>
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="text-center">
                                <div className="text-4xl mb-2">🏠</div>
                                <span className="text-gray-500 text-sm font-medium">No Image</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Status and Category Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(property.status)}`}>
                            {getStatusIcon(property.status)} {property.status}
                        </span>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(property.category.name)} shadow-lg`}>
                            {property.category.name}
                        </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-2xl">
                            <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(property.price)}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">{property.currency}</span>
                        </div>
                    </div>

                    {/* Quick Info Overlay on Hover */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>{property.propertySize} sq ft</span>
                                {property.bedrooms && <span>{property.bedrooms} bed</span>}
                                {property.bathrooms && <span>{property.bathrooms} bath</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                    {/* Title and Location */}
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                            {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{property.address}</span>
                        </div>
                        {property.districtName && (
                            <p className="text-gray-500 text-sm mt-1">{property.districtName}</p>
                        )}
                    </div>

                    {/* Property Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {property.bedrooms && (
                            <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                                <span>🛏️ {property.bedrooms} Bed</span>
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                                <span>🚿 {property.bathrooms} Bath</span>
                            </div>
                        )}
                        {property.propertySize && (
                            <div className="flex items-center bg-purple-50 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
                                <span>📐 {property.propertySize} sq ft</span>
                            </div>
                        )}
                    </div>

                    {/* Status Update Section */}
                    {isEditing ? (
                        <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
                            <select
                                value={statusValue}
                                onChange={(e) => onStatusChange(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                                <option value="Pending">Pending</option>
                                <option value="Rented">Rented</option>
                            </select>
                            <div className="flex gap-2">
                                <button
                                    onClick={onStatusUpdate}
                                    className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                                >
                                    Update Status
                                </button>
                                <button
                                    onClick={onCancelEdit}
                                    className="flex-1 bg-gray-500 text-white py-2.5 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={onEditClick}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={onStartEdit}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2.5 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                            >
                                🔄 Status
                            </button>
                        </div>
                    )}

                    {/* Delete Button */}
                    {!isEditing && (
                        <button
                            onClick={onDeleteClick}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            🗑️ Delete Property
                        </button>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl transform animate-in zoom-in-95">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Delete</h3>
                            <p className="text-gray-600">
                                Are you sure you want to delete <strong>&quot;{property.title}&quot;</strong>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onCancelDelete}
                                className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}