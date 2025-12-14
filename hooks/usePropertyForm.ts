// app/hooks/usePropertyForm.ts
import { useState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { PropertyType, CategoryField, } from '@/app/Types/properties'
import { useSelector, useDispatch } from 'react-redux'
import { EditPropertyInputs } from '@/app/dashboard/real_estate_developer/MyProperties/components/types/property-form.types'
import { RootState } from '@/lib/store'

interface UsePropertyFormProps {
    property: PropertyType | null
    isOpen: boolean
}

export const usePropertyForm = ({ property, isOpen }: UsePropertyFormProps) => {
    const { currentProperty } = useSelector((state: RootState) => state.properties)
    const [categoryFields, setCategoryFields] = useState<CategoryField[]>([])
    const [imageUploading, setImageUploading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [initialFormData, setInitialFormData] = useState<EditPropertyInputs | null>(null)
    const [initialCategoryFields, setInitialCategoryFields] = useState<CategoryField[]>([])

    const fileInputRef = useRef<HTMLInputElement>(null)

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

    const watchedValues = watch()

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
                propertyFacilities: property.propertyFacilities || []
            }

            const categoryFieldsData = property.category.fields || []

            reset(formData)
            setCategoryFields([...categoryFieldsData])

            setInitialFormData(formData)
            setInitialCategoryFields([...categoryFieldsData])
            setHasChanges(false)
        }
    }, [property, isOpen, reset])

    // Check for changes
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

            setHasChanges(hasFormChanges || hasCategoryChanges || isDirty)
        }
    }, [watchedValues, categoryFields, isDirty, property, isOpen, initialFormData, initialCategoryFields, getValues])

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
                const imageUrl = URL.createObjectURL(file)
                newImages.push(imageUrl)
            }

            setValue('images', [...currentImages, ...newImages], {
                shouldValidate: true,
                shouldDirty: true
            })
        } catch (error) {
            console.error('Error uploading images:', error)
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
    }, [watch, setValue])

    const handleInputChange = useCallback((field: keyof EditPropertyInputs, value: string | number) => {
        setValue(field, value, {
            shouldValidate: true,
            shouldDirty: true
        })
    }, [setValue])

    const onSubmit = async (data: EditPropertyInputs) => {
        return {
            ...data,
            categoryFields
        }
    }

    const resetForm = () => {
        reset()
        setCategoryFields([])
        setHasChanges(false)
        setInitialFormData(null)
        setInitialCategoryFields([])
    }

    return {
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
        categoryFields,
        imageUploading,
        hasChanges,
        fileInputRef,
        handleCategoryFieldChange,
        handleFacilitiesChange,
        handleImageUpload,
        removeImage,
        handleInputChange,
        onSubmit,
        setHasChanges,
        resetForm
    }
}