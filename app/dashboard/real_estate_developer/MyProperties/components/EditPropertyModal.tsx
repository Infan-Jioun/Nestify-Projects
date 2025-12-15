"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { PropertyType, CategoryField as OriginalCategoryField } from '@/app/Types/properties'
import { toast } from 'react-hot-toast'
import { propertyCategoryData } from '@/lib/proprtyCategory'
import { ModalHeader } from './ModalHeader'
import { BasicInformationSection } from './BasicInformationSection'
import { CategoryFieldsSection } from './CategoryFieldsSection'
import { PricingSizeSection } from './PricingSizeSection'
import { ContactInformationSection } from './ContactInformationSection'
import { LocationSection } from './LocationSection'
import { ImagesSection } from './ImagesSection'
import { ModalFooter } from './ModalFooter'
import FacilitiesSection from './FacilitiesSection'
import { CategoryField, EditPropertyInputs } from './types/property-form.types'

interface EditPropertyModalProps {
    property: PropertyType | null
    isOpen: boolean
    onClose: () => void
    onSave: (propertyData: PropertyType) => Promise<void> | void
    loading?: boolean
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
            propertyFacilities: [],
            category: {
                name: '',
                fields: []
            }
        },
        mode: 'onChange'
    })

    const [imageUploading, setImageUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [initialFormData, setInitialFormData] = useState<EditPropertyInputs | null>(null)

    // Watch category name to determine which fields to show
    const categoryName = watch('category.name')
    const watchedValues = watch()

    // Get category fields based on selected category
    const getCategoryFields = useCallback(() => {
        if (!categoryName || !propertyCategoryData[categoryName]) return []
        return propertyCategoryData[categoryName] as CategoryField[] 
    }, [categoryName])

    // Initialize form with property data
    useEffect(() => {
        if (property && isOpen) {
            const formData: EditPropertyInputs = {
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
                propertyFacilities: property.propertyFacilities || [],
                category: property.category || { name: '', fields: [] },
                // Map category-specific fields
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                drawingRoom: property.drawingRoom,
                kitchen: property.kitchen,
                floor: property.floor,
                furnishing: property.furnishing,
                floorArea: property.floorArea,
                parkingSpaces: property.parkingSpaces,
                roomsSections: property.roomsSections,
                landArea: property.landArea,
                plotNumber: property.plotNumber,
                landType: property.landType,
                facilities: property.facilities
            }

            reset(formData)
            setInitialFormData(formData)
            setHasChanges(false)
        }
    }, [property, isOpen, reset])

    // Detect form changes
    useEffect(() => {
        if (property && isOpen && initialFormData) {
            const currentFormValues = getValues()
            const hasFormChanges = !areObjectsEqual(currentFormValues, initialFormData)
            setHasChanges(hasFormChanges || isDirty)
        }
    }, [watchedValues, property, isOpen, isDirty, initialFormData, getValues])

    // Helper function to compare objects
    const areObjectsEqual = (obj1: unknown, obj2: unknown): boolean => {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    }

    const onSubmit = async (data: EditPropertyInputs) => {
        if (!property) {
            toast.error('No property selected')
            return
        }

        try {
            // Prepare category fields
            const categoryFields: OriginalCategoryField[] = []
            const categoryFieldNames = getCategoryFields()

            categoryFieldNames.forEach(field => {
                const fieldValue = data[field.name as keyof EditPropertyInputs]
                if (fieldValue !== undefined && fieldValue !== '') {
                    categoryFields.push({
                        id: field.name,
                        name: field.label,
                        value: fieldValue as string | number | boolean
                    })
                }
            })

            const updatedProperty: PropertyType = {
                ...property,
                ...data,
                category: {
                    name: data.category.name,
                    fields: categoryFields
                },
                updatedAt: new Date().toISOString()
            }

            await onSave(updatedProperty)
            setHasChanges(false)
            setInitialFormData(data)
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
        onClose()
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose()
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, hasChanges, loading])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-card rounded-lg border shadow-lg w-full max-w-2xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-0">
                <ModalHeader
                    hasChanges={hasChanges}
                    onClose={handleClose}
                    loading={loading}
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-200px)]">
                        <BasicInformationSection
                            register={register}
                            errors={errors}
                            propertyCategories={Object.keys(propertyCategoryData)}
                        />

                        <CategoryFieldsSection
                            categoryName={categoryName}
                            categoryFields={getCategoryFields()}
                            register={register}
                        />

                        <PricingSizeSection
                            register={register}
                            errors={errors}
                        />

                        <ContactInformationSection
                            register={register}
                            errors={errors}
                        />

                        <LocationSection
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                        />

                        <FacilitiesSection
                            facilities={watch('propertyFacilities') || []}
                            onFacilityChange={(facility, checked) => {
                                const currentFacilities = watch('propertyFacilities') || []
                                const updatedFacilities = checked
                                    ? [...currentFacilities, facility]
                                    : currentFacilities.filter(f => f !== facility)

                                setValue('propertyFacilities', updatedFacilities, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                })
                            }}
                        />

                        <ImagesSection
                            watch={watch}
                            setValue={setValue}
                            imageUploading={imageUploading}
                            setImageUploading={setImageUploading}
                        />
                    </div>

                    <ModalFooter
                        loading={loading}
                        hasChanges={hasChanges}
                        onClose={handleClose}
                        onSave={handleSubmit(onSubmit)}
                    />
                </form>
            </div>
        </div>
    )
}