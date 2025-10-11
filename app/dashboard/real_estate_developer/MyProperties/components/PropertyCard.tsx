import React from 'react'
import { PropertyType } from '@/app/Types/properties'
import {
    MapPin,
    Bed,
    Bath,
    Square,
    Edit3,
    RefreshCw,
    Trash2,
    Home,
    Building,
    LandPlot,
    Store,
    Utensils,
    Warehouse
} from 'lucide-react'
import Carousal from '@/app/components/Carousal/Carousal'

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
            case 'Available': return 'bg-emerald-500 text-white border-emerald-600'
            case 'Sold': return 'bg-blue-500 text-white border-blue-600'
            case 'Pending': return 'bg-amber-500 text-white border-amber-600'
            case 'Rented': return 'bg-purple-500 text-white border-purple-600'
            default: return 'bg-gray-500 text-white border-gray-600'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Available': return <div className="w-2 h-2 bg-white rounded-full" />
            case 'Sold': return <div className="w-2 h-2 bg-white rounded-full" />
            case 'Pending': return <div className="w-2 h-2 bg-white rounded-full" />
            case 'Rented': return <div className="w-2 h-2 bg-white rounded-full" />
            default: return <div className="w-2 h-2 bg-white rounded-full" />
        }
    }

    const getCategoryIcon = (categoryName: string) => {
        const icons: Record<string, React.ReactNode> = {
            'house': <Home className="w-3 h-3" />,
            'apartment': <Building className="w-3 h-3" />,
            'condo': <Building className="w-3 h-3" />,
            'townhouse': <Home className="w-3 h-3" />,
            'land': <LandPlot className="w-3 h-3" />,
            'commercial': <Store className="w-3 h-3" />,
            'duplex': <Home className="w-3 h-3" />,
            'office space': <Building className="w-3 h-3" />,
            'shop': <Store className="w-3 h-3" />,
            'warehouse': <Warehouse className="w-3 h-3" />,
            'restaurant': <Utensils className="w-3 h-3" />,
            'hotel': <Building className="w-3 h-3" />
        }
        return icons[categoryName.toLowerCase()] || <Home className="w-3 h-3" />
    }

    const getCategoryColor = (categoryName: string): string => {
        const colors: Record<string, string> = {
            'house': 'from-emerald-400 to-emerald-600',
            'apartment': 'from-teal-400 to-teal-600',
            'condo': 'from-green-400 to-green-600',
            'townhouse': 'from-lime-400 to-lime-600',
            'land': 'from-emerald-300 to-emerald-500',
            'commercial': 'from-cyan-400 to-cyan-600',
            'duplex': 'from-teal-300 to-teal-500',
            'office space': 'from-green-300 to-green-500',
            'shop': 'from-lime-300 to-lime-500',
            'warehouse': 'from-emerald-200 to-emerald-400',
            'restaurant': 'from-teal-200 to-teal-400',
            'hotel': 'from-green-200 to-green-400'
        }
        return colors[categoryName.toLowerCase()] || 'from-gray-400 to-gray-600'
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
            <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 overflow-hidden hover:scale-[1.02] bg-gradient-to-br from-white to-emerald-50">
                {/* Property Image with Green Overlay */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                        <>
                            <Carousal images={property.images || []} title={property.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200">
                            <div className="text-center text-emerald-700">
                                <Home className="w-12 h-12 mx-auto mb-2 opacity-60" />
                                <span className="text-emerald-600 text-sm font-medium">No Image Available</span>
                            </div>
                        </div>
                    )}

                    {/* Status and Category Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border ${getStatusColor(property.status)} flex items-center gap-1.5`}>
                            {getStatusIcon(property.status)}
                            {property.status}
                        </span>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(property.category.name)} shadow-lg border border-white/20 flex items-center gap-1.5`}>
                            {getCategoryIcon(property.category.name)}
                            {property.category.name}
                        </span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-2xl border border-emerald-200">
                            <span className="text-2xl font-bold text-emerald-700">
                                {formatPrice(property.price)}
                            </span>
                            <span className="text-sm text-emerald-600 ml-1 font-medium">{property.currency}</span>
                        </div>
                    </div>

                    {/* Quick Info Overlay on Hover */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-emerald-200">
                            <div className="flex justify-between text-xs text-emerald-700 font-medium">
                                <span className="flex items-center gap-1">
                                    <Square className="w-3 h-3" />
                                    {property.propertySize} sq ft
                                </span>
                                {property.bedrooms && (
                                    <span className="flex items-center gap-1">
                                        <Bed className="w-3 h-3" />
                                        {property.bedrooms} bed
                                    </span>
                                )}
                                {property.bathrooms && (
                                    <span className="flex items-center gap-1">
                                        <Bath className="w-3 h-3" />
                                        {property.bathrooms} bath
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                    {/* Title and Location */}
                    <div className="mb-4">
                        <h3 className="font-bold text-emerald-900 text-lg mb-2 line-clamp-2 leading-tight">
                            {property.title}
                        </h3>
                        <div className="flex items-center text-emerald-700 text-sm">
                            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                            <span className="truncate">{property.address}</span>
                        </div>
                        {property.districtName && (
                            <p className="text-emerald-600 text-sm mt-1 font-medium">{property.districtName}</p>
                        )}
                    </div>

                    {/* Property Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {property.bedrooms && (
                            <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-200">
                                <Bed className="w-3 h-3 mr-1.5" />
                                <span>{property.bedrooms} Bed</span>
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center bg-teal-100 text-teal-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-teal-200">
                                <Bath className="w-3 h-3 mr-1.5" />
                                <span>{property.bathrooms} Bath</span>
                            </div>
                        )}
                        {property.propertySize && (
                            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-green-200">
                                <Square className="w-3 h-3 mr-1.5" />
                                <span>{property.propertySize} sq ft</span>
                            </div>
                        )}
                    </div>

                    {/* Status Update Section */}
                    {isEditing ? (
                        <div className="space-y-3 mb-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                            <select
                                value={statusValue}
                                onChange={(e) => onStatusChange(e.target.value)}
                                className="w-full p-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-emerald-900"
                            >
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                                <option value="Pending">Pending</option>
                                <option value="Rented">Rented</option>
                            </select>
                            <div className="flex gap-2">
                                <button
                                    onClick={onStatusUpdate}
                                    className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 border border-emerald-700"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Update Status
                                </button>
                                <button
                                    onClick={onCancelEdit}
                                    className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl hover:bg-emerald-600 transition-colors font-medium border border-emerald-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={onEditClick}
                                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl border border-emerald-600 flex items-center justify-center gap-2"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={onStartEdit}
                                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl border border-teal-600 flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Status
                            </button>
                        </div>
                    )}

                    {/* Delete Button */}
                    {!isEditing && (
                        <button
                            onClick={onDeleteClick}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl border border-red-600 flex items-center justify-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Property
                        </button>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl transform animate-in zoom-in-95 border border-emerald-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-emerald-900 mb-2">Confirm Delete</h3>
                            <p className="text-emerald-700">
                                Are you sure you want to delete <strong className="text-emerald-900">&quot;{property.title}&quot;</strong>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={onCancelDelete}
                                className="flex-1 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium border border-emerald-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-medium border border-red-700 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}