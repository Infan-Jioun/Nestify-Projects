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
            category: { name: '', fields: [] }
        },
        mode: 'onChange'
    })

    const [imageUploading, setImageUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [initialFormData, setInitialFormData] = useState<EditPropertyInputs | null>(null)

    const categoryName = watch('category.name')
    const watchedValues = watch()

    const getCategoryFields = useCallback(() => {
        if (!categoryName || !propertyCategoryData[categoryName]) return []
        return propertyCategoryData[categoryName] as CategoryField[]
    }, [categoryName])

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

    useEffect(() => {
        if (property && isOpen && initialFormData) {
            const current = getValues()
            setHasChanges(JSON.stringify(current) !== JSON.stringify(initialFormData) || isDirty)
        }
    }, [watchedValues, property, isOpen, isDirty, initialFormData, getValues])

    const onSubmit = async (data: EditPropertyInputs) => {
        if (!property) { toast.error('No property selected'); return }

        try {
            const categoryFields: OriginalCategoryField[] = []
            getCategoryFields().forEach(field => {
                const val = data[field.name as keyof EditPropertyInputs]
                if (val !== undefined && val !== '') {
                    categoryFields.push({ id: field.name, name: field.label, value: val as string | number | boolean })
                }
            })

            const updatedProperty: PropertyType = {
                ...property,
                ...data,
                category: { name: data.category.name, fields: categoryFields },
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
        if (hasChanges) {
            toast((t) => (
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                        Are you sure you want to close?
                    </p>
                    <p className="text-xs text-gray-500">
                        Unsaved changes will be lost.
                    </p>

                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id)
                                onClose()
                            }}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                        >
                            Yes
                        </button>

                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="px-3 py-1 text-xs bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ), { duration: 5000 })
        } else {
            onClose()
        }
    }
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, hasChanges, loading])

    if (!isOpen) return null

    return (
        // ── Backdrop ──────────────────────────────────────────────────────
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                        bg-black/60 backdrop-blur-sm
                        p-0 sm:p-4">

            {/*
              ── Modal shell ─────────────────────────────────────────────
              Mobile  : slides up from bottom, full width, rounded top corners
              sm+     : centered, max-w-2xl
              lg+     : wider, max-w-5xl, two-column form sections
            */}
            <div className="bg-white dark:bg-gray-900 w-full
                            rounded-t-2xl sm:rounded-2xl
                            shadow-xl border border-gray-200 dark:border-gray-700
                            sm:max-w-2xl lg:max-w-5xl
                            max-h-[95vh] sm:max-h-[92vh]
                            flex flex-col overflow-hidden">

                <ModalHeader
                    hasChanges={hasChanges}
                    onClose={handleClose}
                    loading={loading}
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col flex-1 overflow-hidden"
                >
                    {/* ── Scrollable body ────────────────────────────── */}
                    <div className="flex-1 overflow-y-auto overscroll-contain
                                    px-4 py-4
                                    sm:px-6 sm:py-5
                                    space-y-5 sm:space-y-6">

                        {/*
                          On lg screens the sections sit side-by-side where it makes
                          sense (Basic + Category  |  Pricing + Contact).
                          On mobile they're a single column.
                        */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
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
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                            <PricingSizeSection
                                register={register}
                                errors={errors}
                            />
                            <ContactInformationSection
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <LocationSection
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                        />

                        <FacilitiesSection
                            facilities={watch('propertyFacilities') || []}
                            onFacilityChange={(facility, checked) => {
                                const current = watch('propertyFacilities') || []
                                setValue(
                                    'propertyFacilities',
                                    checked ? [...current, facility] : current.filter(f => f !== facility),
                                    { shouldValidate: true, shouldDirty: true }
                                )
                            }}
                        />

                        {/* ImagesSection — delete + add handled inside */}
                        <ImagesSection
                            watch={watch}
                            setValue={setValue}
                            imageUploading={imageUploading}
                            setImageUploading={setImageUploading}
                        />
                    </div>

                    {/* ── Sticky footer ──────────────────────────────── */}
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