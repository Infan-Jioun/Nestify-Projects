"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
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
import ControlledSearchLocation from './ControlledSearchLocation'

interface EditPropertyModalProps {
    property: PropertyType | null
    isOpen: boolean
    onClose: () => void
    onSave: (propertyData: PropertyType) => Promise<void> | void
    loading?: boolean
}

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

        if (newValue.trim()) {
            setIsLoading(true)
            setShowDropdown(true)
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
        <div className="p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <label className="mb-2 block text-gray-700 text-xs sm:text-sm">Search Your Property Location</label>
            <div className="relative">
                <input
                    type="text"
                    value={localQuery}
                    onChange={handleInputChange}
                    className="px-8 sm:px-10 py-2 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm sm:text-base"
                    placeholder="Search by name or location..."
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                {isLoading && (
                    <div className="absolute right-3 top-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-green-500" />
                    </div>
                )}
            </div>

            {showDropdown && !isLoading && localQuery.trim() && (
                <div className="relative">
                    <div className="absolute z-10 mt-2 w-full max-h-48 sm:max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                        <div
                            className="px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                            onClick={() => handleSelectLocation(localQuery)}
                        >
                            Use: <span className="font-semibold">{localQuery}</span>
                        </div>
                        <div className="px-3 py-2 text-xs sm:text-sm text-gray-500 border-t">
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
        formState: { errors, isDirty },
        getValues,
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
        },
        mode: 'onChange'
    })

    const [categoryFields, setCategoryFields] = useState<CategoryField[]>([])
    const [imageUploading, setImageUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [initialFormData, setInitialFormData] = useState<EditPropertyInputs | null>(null)
    const [initialCategoryFields, setInitialCategoryFields] = useState<CategoryField[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Watch all form values
    const watchedValues = watch()

    // Initialize form with property data and store initial state
    useEffect(() => {
        if (property && isOpen) {
            console.log('Initializing form with property:', property)

            const formData = {
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
            }

            const categoryFieldsData = property.category.fields || []

            reset(formData)
            setCategoryFields([...categoryFieldsData])
            
            // Store initial data for comparison
            setInitialFormData(formData)
            setInitialCategoryFields([...categoryFieldsData])
            
            setHasChanges(false)
        }
    }, [property, isOpen, reset])

    // Enhanced change detection - use getValues() for real-time values
    useEffect(() => {
        if (property && isOpen && initialFormData) {
            const currentFormValues = getValues()
            
            const hasFormChanges = 
                currentFormValues.title !== initialFormData.title ||
                currentFormValues.status !== initialFormData.status ||
                currentFormValues.price !== initialFormData.price ||
                currentFormValues.currency !== initialFormData.currency ||
                currentFormValues.propertySize !== initialFormData.propertySize ||
                currentFormValues.contactNumber !== initialFormData.contactNumber ||
                currentFormValues.address !== initialFormData.address ||
                currentFormValues.geoCountryLocation !== initialFormData.geoCountryLocation ||
                currentFormValues.districtName !== initialFormData.districtName ||
                JSON.stringify(currentFormValues.images) !== JSON.stringify(initialFormData.images) ||
                JSON.stringify(currentFormValues.videos) !== JSON.stringify(initialFormData.videos) ||
                currentFormValues.email !== initialFormData.email ||
                JSON.stringify(currentFormValues.propertyFacilities) !== JSON.stringify(initialFormData.propertyFacilities)

            const hasCategoryChanges = JSON.stringify(categoryFields) !== JSON.stringify(initialCategoryFields)
            
            console.log('Form changes detected:', hasFormChanges)
            console.log('Category changes detected:', hasCategoryChanges)
            console.log('React Hook Form dirty:', isDirty)
            
            setHasChanges(hasFormChanges || hasCategoryChanges || isDirty)
        }
    }, [watchedValues, categoryFields, property, isOpen, isDirty, initialFormData, initialCategoryFields, getValues])

    const handleCategoryFieldChange = useCallback((fieldId: string, value: string | number | boolean) => {
        setCategoryFields(prev =>
            prev.map(field =>
                field.id === fieldId ? { ...field, value } : field
            )
        )
    }, [])

    const handleFacilitiesChange = useCallback((facility: string, checked: boolean) => {
        const currentFacilities = watch('propertyFacilities') || []
        const updatedFacilities = checked
            ? [...currentFacilities, facility]
            : currentFacilities.filter(f => f !== facility)

        setValue('propertyFacilities', updatedFacilities, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [watch, setValue])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setImageUploading(true)

        try {
            const currentImages = watch('images') || []
            const newImages: string[] = []

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                // In a real application, you would upload the file to your server
                // For now, we'll create object URLs for demonstration
                const imageUrl = URL.createObjectURL(file)
                newImages.push(imageUrl)
            }

            setValue('images', [...currentImages, ...newImages], {
                shouldValidate: true,
                shouldDirty: true
            })
            toast.success(`${newImages.length} image(s) uploaded successfully`)
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

    const removeImage = useCallback((index: number) => {
        const currentImages = watch('images') || []
        const updatedImages = currentImages.filter((_, i) => i !== index)
        setValue('images', updatedImages, {
            shouldValidate: true,
            shouldDirty: true
        })
        toast.success('Image removed')
    }, [watch, setValue])

    // Handle direct input changes to set dirty state
    const handleInputChange = useCallback((field: keyof EditPropertyInputs, value: any) => {
        setValue(field, value, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [setValue])

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

            await onSave(updatedProperty)
            setHasChanges(false)
            // Reset initial data after successful save
            setInitialFormData(data)
            setInitialCategoryFields([...categoryFields])
            toast.success('Property updated successfully')

        } catch (error) {
            console.error('Error in form submission:', error)
            toast.error('Failed to save property changes')
        }
    }

    const handleClose = () => {
        if (hasChanges && !loading) {
            const confirmClose = window.confirm(
                'You have unsaved changes. Are you sure you want to close?'
            )
            if (!confirmClose) return
        }
        setInitialFormData(null)
        setInitialCategoryFields([])
        onClose()
    }

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, hasChanges, loading])

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
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-card rounded-lg border shadow-lg w-full max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-muted/50">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg">
                            <Home className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Edit Property</h2>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1"
                        disabled={loading}
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-200px)]">
                        {/* Basic Information Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* Property Title */}
                                <div className="space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
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
                                            onChange={(e) => handleInputChange('title', e.target.value)}
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
                                            onChange={(e) => handleInputChange('status', e.target.value)}
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
                                            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
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
                                        onChange={(e) => handleInputChange('currency', e.target.value)}
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
                                            onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value) || 0)}
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
                                            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
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
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                Location Details
                            </h3>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
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
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter full address"
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-destructive">{errors.address.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                    <label className="text-sm font-medium text-foreground">Location *</label>
                                    <ControlledSearchLocation
                                        value={watch('geoCountryLocation')}
                                        onChange={(value) => {
                                            setValue('geoCountryLocation', value, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            })
                                        }}
                                        error={errors.geoCountryLocation?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category Specific Fields */}
                        {categoryFields.length > 0 && (
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                    {property?.category.name} Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {categoryFields.map((field) => (
                                        <div key={field.id} className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">{field.name}</label>
                                            {field.name.toLowerCase().includes('area') ||
                                                field.name.toLowerCase().includes('rooms') ||
                                                field.name.toLowerCase().includes('bedrooms') ||
                                                field.name.toLowerCase().includes('bathrooms') ? (
                                                <input
                                                    type="number"
                                                    value={field.value as number || ''}
                                                    onChange={(e) => {
                                                        const value = e.target.value === '' ? 0 : Number(e.target.value)
                                                        handleCategoryFieldChange(field.id, value)
                                                    }}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            ) : field.name.toLowerCase().includes('furnishing') ? (
                                                <select
                                                    value={field.value as string || ''}
                                                    onChange={(e) => {
                                                        handleCategoryFieldChange(field.id, e.target.value)
                                                    }}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="Furnished">Furnished</option>
                                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                                    <option value="Unfurnished">Unfurnished</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={field.value as string || ''}
                                                    onChange={(e) => {
                                                        handleCategoryFieldChange(field.id, e.target.value)
                                                    }}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Facilities Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                Facilities & Amenities
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                {commonFacilities.map((facility) => {
                                    const IconComponent = facility.icon
                                    const currentFacilities = watch('propertyFacilities') || []
                                    const isChecked = currentFacilities.includes(facility.name)

                                    return (
                                        <label
                                            key={facility.id}
                                            className={`flex items-center space-x-2 p-2 sm:p-3 rounded-md border text-xs sm:text-sm font-medium cursor-pointer transition-colors ${isChecked
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={(e) => handleFacilitiesChange(facility.name, e.target.checked)}
                                                className="rounded border-primary text-primary focus:ring-primary sr-only"
                                            />
                                            <span className="flex items-center gap-1 sm:gap-2">
                                                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span className="hidden xs:inline">{facility.name}</span>
                                                <span className="xs:hidden text-xs">{facility.name.split(' ')[0]}</span>
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
                                    disabled={imageUploading || loading}
                                    className="flex flex-col items-center justify-center w-full p-4 sm:p-6 border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-muted-foreground/50 transition-colors bg-muted/50 hover:bg-muted disabled:opacity-50"
                                >
                                    {imageUploading ? (
                                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-muted-foreground" />
                                    ) : (
                                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                                    )}
                                    <span className="font-medium text-foreground mt-2 text-sm sm:text-base">
                                        {imageUploading ? 'Uploading Images...' : 'Click to Upload Images'}
                                    </span>
                                    <span className="text-xs sm:text-sm text-muted-foreground mt-1">
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
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                        {watch('images')!.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Property image ${index + 1}`}
                                                    className="w-full h-16 sm:h-20 object-cover rounded-md border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    disabled={loading}
                                                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                >
                                                    <Trash2 className="w-2 h-2 sm:w-3 sm:h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t bg-muted/50">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 sm:h-10 px-3 sm:px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !hasChanges}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 sm:h-10 px-3 sm:px-4 py-2 gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                            ) : (
                                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}