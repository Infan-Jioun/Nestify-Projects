// app/dashboard/real_estate_developer/MyProperties/components/EditPropertyModal.tsx
"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useForm, UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { PropertyType, CategoryField } from '@/app/Types/properties'
import {
    X,
    Save,
    Upload,
    MapPin,
    Home,
    DollarSign,
    Ruler,
    Phone,
    Building,
    Star,
    Image as ImageIcon,
    Loader2,
    BadgeCheck,
    Trash2,
    Dumbbell,
    Car,
    Shield,
    TreePine,
    Square,
    ArrowUp,
    ThermometerSun,
    Wifi,
    PawPrint,
    Sofa
} from 'lucide-react'
import { FaSwimmingPool } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

interface EditPropertyModalProps {
    property: PropertyType | null
    isOpen: boolean
    onClose: () => void
    onSave: (propertyData: PropertyType) => Promise<void> | void
    loading?: boolean
}

// PropertyLocation এর জন্য আলাদা interface
interface PropertyLocationData {
    geoCountryLocation: string;
}

interface PropertyLocationProps {
    register: UseFormRegister<PropertyLocationData>;
    errors: FieldErrors<PropertyLocationData>;
    watch: UseFormWatch<PropertyLocationData>;
    setValue: UseFormSetValue<PropertyLocationData>;
}

// EditPropertyModal এর জন্য আলাদা Inputs interface
interface EditPropertyInputs {
    title: string
    status: 'Available' | 'Rented' | 'Sold' | 'Pending'
    price: number
    currency: string
    propertySize: number
    contactNumber: string
    address: string
    geoCountryLocation: string
    districtName?: string
    images: string[]
    videos: string[]
    email: string
    propertyFacilities: string[]
}

// Simple PropertyLocation Component (without any type)
const SimplePropertyLocation: React.FC<{
    value: string;
    onChange: (value: string) => void;
    error?: string;
}> = ({ value, onChange, error }) => {
    const [localQuery, setLocalQuery] = useState(value)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setLocalQuery(newValue)
        onChange(newValue)

        // Simulate search functionality
        if (newValue.trim()) {
            setIsLoading(true)
            setShowDropdown(true)
            // Simulate API call delay
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        } else {
            setShowDropdown(false)
            setIsLoading(false)
        }
    }

    const handleSelectLocation = (location: string) => {
        setLocalQuery(location)
        onChange(location)
        setShowDropdown(false)
    }

    return (
        <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <label className="mb-2 block text-gray-700 text-xs">Search Your Property Location</label>
            <div className="relative">
                <input
                    type="text"
                    value={localQuery}
                    onChange={handleInputChange}
                    className="px-8 py-2 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                    placeholder="Search by name or location..."
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                    <MapPin className="w-4 h-4" />
                </div>
                {isLoading && (
                    <div className="absolute right-3 top-2">
                        <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                    </div>
                )}
            </div>

            {showDropdown && !isLoading && localQuery.trim() && (
                <div className="relative">
                    <div className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                        <div
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                            onClick={() => handleSelectLocation(localQuery)}
                        >
                            Use: <span className="font-semibold">{localQuery}</span>
                        </div>
                        <div className="px-3 py-2 text-sm text-gray-500 border-t">
                            Continue typing for more suggestions...
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    )
}

export default function EditPropertyModal({
    property,
    isOpen,
    onClose,
    onSave,
    loading = false
}: EditPropertyModalProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<EditPropertyInputs>({
        defaultValues: {
            title: '',
            status: 'Available',
            price: 0,
            currency: 'USD',
            propertySize: 0,
            contactNumber: '',
            address: '',
            geoCountryLocation: '',
            images: [],
            videos: [],
            email: '',
            propertyFacilities: []
        }
    })

    const [categoryFields, setCategoryFields] = useState<CategoryField[]>([])
    const [imageUploading, setImageUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Watch for form changes
    const watchedValues = watch()

    // Check for changes
    useEffect(() => {
        if (property) {
            const currentValues = {
                title: watchedValues.title,
                status: watchedValues.status,
                price: watchedValues.price,
                currency: watchedValues.currency,
                propertySize: watchedValues.propertySize,
                contactNumber: watchedValues.contactNumber,
                address: watchedValues.address,
                geoCountryLocation: watchedValues.geoCountryLocation,
                districtName: watchedValues.districtName,
                images: watchedValues.images,
                propertyFacilities: watchedValues.propertyFacilities
            }

            const originalValues = {
                title: property.title || '',
                status: property.status || 'Available',
                price: property.price || 0,
                currency: property.currency || 'USD',
                propertySize: property.propertySize || 0,
                contactNumber: property.contactNumber || '',
                address: property.address || '',
                geoCountryLocation: property.geoCountryLocation || '',
                districtName: property.districtName || '',
                images: property.images || [],
                propertyFacilities: property.propertyFacilities || []
            }

            const hasFormChanges = JSON.stringify(currentValues) !== JSON.stringify(originalValues)
            const hasCategoryChanges = JSON.stringify(categoryFields) !== JSON.stringify(property.category.fields || [])

            setHasChanges(hasFormChanges || hasCategoryChanges)
        }
    }, [watchedValues, categoryFields, property])

    // Initialize form data when property changes
    useEffect(() => {
        if (property && isOpen) {
            reset({
                title: property.title || '',
                status: property.status || 'Available',
                price: property.price || 0,
                currency: property.currency || 'USD',
                propertySize: property.propertySize || 0,
                contactNumber: property.contactNumber || '',
                address: property.address || '',
                geoCountryLocation: property.geoCountryLocation || '',
                districtName: property.districtName || '',
                images: property.images || [],
                videos: property.videos || [],
                email: property.email || '',
                propertyFacilities: property.propertyFacilities || []
            })
            setCategoryFields(property.category.fields || [])
            setHasChanges(false)
        }
    }, [property, isOpen, reset])

    // Handle category field changes
    const handleCategoryFieldChange = (fieldId: string, value: string | number | boolean) => {
        setCategoryFields(prev =>
            prev.map(field =>
                field.id === fieldId ? { ...field, value } : field
            )
        )
    }

    // Handle facilities change
    const handleFacilitiesChange = (facility: string, checked: boolean) => {
        const currentFacilities = watch('propertyFacilities') || []
        const updatedFacilities = checked
            ? [...currentFacilities, facility]
            : currentFacilities.filter(f => f !== facility)

        setValue('propertyFacilities', updatedFacilities, { shouldDirty: true })
    }

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setImageUploading(true)

        try {
            const currentImages = watch('images') || []
            const newImages: string[] = []

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                // Simulate upload - replace with actual cloud storage upload
                const imageUrl = URL.createObjectURL(file)
                newImages.push(imageUrl)
            }

            setValue('images', [...currentImages, ...newImages], { shouldDirty: true })
        } catch (error) {
            console.error('Error uploading images:', error)
            toast.error('Failed to upload images')
        } finally {
            setImageUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    // Remove image
    const removeImage = (index: number) => {
        const currentImages = watch('images') || []
        const updatedImages = currentImages.filter((_, i) => i !== index)
        setValue('images', updatedImages, { shouldDirty: true })
    }

    // Handle form submission
    const onSubmit = async (data: EditPropertyInputs) => {
        if (!property) {
            toast.error('No property selected')
            return
        }

        try {
            console.log('Submitting form data:', data)
            console.log('Category fields:', categoryFields)

            const updatedProperty: PropertyType = {
                ...property,
                title: data.title,
                status: data.status,
                price: data.price,
                currency: data.currency,
                propertySize: data.propertySize,
                contactNumber: data.contactNumber,
                address: data.address,
                geoCountryLocation: data.geoCountryLocation,
                districtName: data.districtName,
                images: data.images,
                videos: data.videos,
                email: data.email,
                propertyFacilities: data.propertyFacilities,
                category: {
                    ...property.category,
                    fields: categoryFields
                },
                updatedAt: new Date().toISOString()
            }

            console.log('Updated property to save:', updatedProperty)

            // Call the onSave function passed from parent
            await onSave(updatedProperty)

            // Reset form state after successful save
            setHasChanges(false)

        } catch (error) {
            console.error('Error in form submission:', error)
            toast.error('Failed to save property changes')
        }
    }

    // Handle close with confirmation if there are changes
    const handleClose = () => {
        if (hasChanges) {
            const confirmClose = window.confirm(
                'You have unsaved changes. Are you sure you want to close?'
            )
            if (!confirmClose) return
        }
        onClose()
    }

    // Common facilities options with icons
    const commonFacilities = [
        { id: 'pool', name: 'Swimming Pool', icon: FaSwimmingPool },
        { id: 'gym', name: 'Gym', icon: Dumbbell },
        { id: 'parking', name: 'Parking', icon: Car },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'garden', name: 'Garden', icon: TreePine },
        { id: 'balcony', name: 'Balcony', icon: Square },
        { id: 'elevator', name: 'Elevator', icon: ArrowUp },
        { id: 'ac', name: 'Air Conditioning', icon: ThermometerSun },
        { id: 'heating', name: 'Heating', icon: ThermometerSun },
        { id: 'wifi', name: 'WiFi', icon: Wifi },
        { id: 'pets', name: 'Pet Friendly', icon: PawPrint },
        { id: 'furnished', name: 'Furnished', icon: Sofa }
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-muted/50">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                            <Home className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Edit Property</h2>
                            <p className="text-muted-foreground text-sm">
                                {hasChanges ? 'You have unsaved changes' : 'Update property details and images'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                        disabled={loading}
                    >
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        {/* Basic Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-primary" />
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Property Title */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Property Title *</label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            {...register('title', {
                                                required: 'Property title is required',
                                                minLength: {
                                                    value: 5,
                                                    message: 'Title must be at least 5 characters'
                                                }
                                            })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter property title"
                                        />
                                    </div>
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Status *</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <select
                                            {...register('status')}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Sold">Sold</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rented">Rented</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Price *</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="number"
                                            step="0.01"
                                            {...register('price', {
                                                required: 'Price is required',
                                                min: { value: 0, message: 'Price must be positive' },
                                                valueAsNumber: true
                                            })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter price"
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-sm text-destructive">{errors.price.message}</p>
                                    )}
                                </div>

                                {/* Currency */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Currency *</label>
                                    <select
                                        {...register('currency')}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="BDT">BDT</option>
                                    </select>
                                </div>

                                {/* Property Size */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Property Size (sq ft) *</label>
                                    <div className="relative">
                                        <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="number"
                                            {...register('propertySize', {
                                                required: 'Property size is required',
                                                min: { value: 0, message: 'Property size must be positive' },
                                                valueAsNumber: true
                                            })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter property size"
                                        />
                                    </div>
                                    {errors.propertySize && (
                                        <p className="text-sm text-destructive">{errors.propertySize.message}</p>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Contact Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            {...register('contactNumber', {
                                                required: 'Contact number is required',
                                                pattern: {
                                                    value: /^[+]?[0-9\s\-()]+$/,
                                                    message: 'Please enter a valid phone number'
                                                }
                                            })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter contact number"
                                        />
                                    </div>
                                    {errors.contactNumber && (
                                        <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                Location Details
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Address *</label>
                                    <input
                                        type="text"
                                        {...register('address', {
                                            required: 'Address is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Address should be at least 10 characters'
                                            }
                                        })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter full address"
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-destructive">{errors.address.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SimplePropertyLocation
                                        value={watch('geoCountryLocation')}
                                        onChange={(value) => setValue('geoCountryLocation', value, { shouldValidate: true })}
                                        error={errors.geoCountryLocation?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category Specific Fields */}
                        {categoryFields.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                    <Building className="w-5 h-5 text-primary" />
                                    {property?.category.name} Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categoryFields.map((field) => (
                                        <div key={field.id} className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">{field.name}</label>
                                            {field.name.toLowerCase().includes('area') ||
                                                field.name.toLowerCase().includes('rooms') ||
                                                field.name.toLowerCase().includes('bedrooms') ||
                                                field.name.toLowerCase().includes('bathrooms') ? (
                                                <input
                                                    type="number"
                                                    value={field.value as number}
                                                    onChange={(e) => handleCategoryFieldChange(field.id, Number(e.target.value))}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            ) : field.name.toLowerCase().includes('furnishing') ? (
                                                <select
                                                    value={field.value as string}
                                                    onChange={(e) => handleCategoryFieldChange(field.id, e.target.value)}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Facilities Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <Star className="w-5 h-5 text-primary" />
                                Facilities & Amenities
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {commonFacilities.map((facility) => {
                                    const IconComponent = facility.icon
                                    const currentFacilities = watch('propertyFacilities') || []
                                    const isChecked = currentFacilities.includes(facility.name)

                                    return (
                                        <label
                                            key={facility.id}
                                            className={`flex items-center space-x-2 p-3 rounded-md border text-sm font-medium cursor-pointer transition-colors ${isChecked
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={(e) => handleFacilitiesChange(facility.name, e.target.checked)}
                                                className="rounded border-primary text-primary focus:ring-primary"
                                            />
                                            <span className="flex items-center gap-2">
                                                <IconComponent className="w-4 h-4" />
                                                {facility.name}
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                Property Images
                            </h3>

                            {/* Upload Area */}
                            <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={imageUploading}
                                    className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-muted-foreground/50 transition-colors bg-muted/50 hover:bg-muted disabled:opacity-50"
                                >
                                    {imageUploading ? (
                                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                    ) : (
                                        <Upload className="w-8 h-8 text-muted-foreground" />
                                    )}
                                    <span className="font-medium text-foreground mt-2">
                                        {imageUploading ? 'Uploading Images...' : 'Click to Upload Images'}
                                    </span>
                                    <span className="text-sm text-muted-foreground mt-1">
                                        PNG, JPG, JPEG up to 10MB
                                    </span>
                                </button>
                            </div>

                            {/* Images Grid */}
                            {watch('images') && watch('images')!.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">
                                            {watch('images')!.length} image(s) uploaded
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {watch('images')!.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Property image ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-md border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 p-6 border-t bg-muted/50">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !hasChanges}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}