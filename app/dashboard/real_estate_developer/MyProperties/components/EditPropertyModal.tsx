// app/dashboard/real_estate_developer/MyProperties/components/EditPropertyModal.tsx
"use client"
import React, { useState, useEffect } from 'react'
import { PropertyType, CategoryField } from '@/app/Types/properties'

interface EditPropertyModalProps {
    property: PropertyType | null
    isOpen: boolean
    onClose: () => void
    onSave: (propertyData: PropertyType) => void
    loading?: boolean
}

export default function EditPropertyModal({
    property,
    isOpen,
    onClose,
    onSave,
    loading = false
}: EditPropertyModalProps) {
    const [formData, setFormData] = useState<PropertyType>({
        title: '',
        category: { name: '', fields: [] },
        listingStatus: '',
        price: 0,
        currency: 'USD',
        propertySize: 0,
        address: '',
        geoCountryLocation: '',
        images: [],
        videos: [],
        contactNumber: '',
        email: '',
        status: 'Available',
        propertyFacilities: []
    })

    const [categoryFields, setCategoryFields] = useState<CategoryField[]>([])

    // Initialize form data when property changes
    useEffect(() => {
        if (property) {
            setFormData(property)
            setCategoryFields(property.category.fields || [])
        }
    }, [property])

    // Handle input changes for main fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'propertySize' ? Number(value) : value
        }))
    }

    // Handle category field changes
    const handleCategoryFieldChange = (fieldId: string, value: string | number | boolean) => {
        setCategoryFields(prev =>
            prev.map(field =>
                field.id === fieldId ? { ...field, value } : field
            )
        )
    }

    // Handle facilities change
    const handleFacilitiesChange = (facilities: string[]) => {
        setFormData(prev => ({
            ...prev,
            propertyFacilities: facilities
        }))
    }

    // Handle save
    const handleSave = () => {
        const updatedProperty: PropertyType = {
            ...formData,
            category: {
                ...formData.category,
                fields: categoryFields
            }
        }
        onSave(updatedProperty)
    }

    // Common facilities options
    const commonFacilities = [
        'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden',
        'Balcony', 'Elevator', 'Air Conditioning', 'Heating',
        'WiFi', 'Pet Friendly', 'Furnished'
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold">Edit Property</h2>
                        <p className="text-blue-100 mt-1">Update your property details</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white text-2xl transition-colors"
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Property Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                                placeholder="Enter property title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                            >
                                <option value="Available">Available</option>
                                <option value="Sold">Sold</option>
                                <option value="Pending">Pending</option>
                                <option value="Rented">Rented</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                                placeholder="Enter price"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Currency *
                            </label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="BDT">BDT</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Property Size (sq ft) *
                            </label>
                            <input
                                type="number"
                                name="propertySize"
                                value={formData.propertySize}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                                placeholder="Enter property size"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Contact Number *
                            </label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors"
                                placeholder="Enter contact number"
                            />
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span>📍</span> Location Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                    placeholder="Enter full address"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        name="geoCountryLocation"
                                        value={formData.geoCountryLocation}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                        placeholder="Enter country"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        District
                                    </label>
                                    <input
                                        type="text"
                                        name="districtName"
                                        value={formData.districtName || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                        placeholder="Enter district"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Specific Fields */}
                    {categoryFields.length > 0 && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🏠</span> {formData.category.name} Specific Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categoryFields.map((field) => (
                                    <div key={field.id}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            {field.name}
                                        </label>
                                        {field.name.toLowerCase().includes('area') ||
                                            field.name.toLowerCase().includes('rooms') ||
                                            field.name.toLowerCase().includes('bedrooms') ||
                                            field.name.toLowerCase().includes('bathrooms') ? (
                                            <input
                                                type="number"
                                                value={field.value as number}
                                                onChange={(e) => handleCategoryFieldChange(field.id, Number(e.target.value))}
                                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                            />
                                        ) : field.name.toLowerCase().includes('furnishing') ? (
                                            <select
                                                value={field.value as string}
                                                onChange={(e) => handleCategoryFieldChange(field.id, e.target.value)}
                                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                            >
                                                <option value="Furnished">Furnished</option>
                                                <option value="Semi-Furnished">Semi-Furnished</option>
                                                <option value="Unfurnished">Unfurnished</option>
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                value={field.value as string}
                                                onChange={(e) => handleCategoryFieldChange(field.id, e.target.value)}
                                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Facilities */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span>⭐</span> Facilities & Amenities
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {commonFacilities.map((facility) => (
                                <label key={facility} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.propertyFacilities.includes(facility)}
                                        onChange={(e) => {
                                            const updatedFacilities = e.target.checked
                                                ? [...formData.propertyFacilities, facility]
                                                : formData.propertyFacilities.filter(f => f !== facility)
                                            handleFacilitiesChange(updatedFacilities)
                                        }}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{facility}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images Preview */}
                    {formData.images.length > 0 && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>🖼️</span> Property Images ({formData.images.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image}
                                            alt={`Property image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold disabled:opacity-50 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                        {loading && (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>{loading ? 'Saving Changes...' : '💾 Save Changes'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}