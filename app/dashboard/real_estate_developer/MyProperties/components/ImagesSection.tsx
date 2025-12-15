import React, { useRef } from 'react'
import { ImageIcon, Upload, Loader2, Trash2 } from 'lucide-react'
import { UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

interface ImagesSectionProps {
    watch: UseFormWatch<EditPropertyInputs>
    setValue: UseFormSetValue<EditPropertyInputs>
    imageUploading: boolean
    setImageUploading: React.Dispatch<React.SetStateAction<boolean>>
}

export function ImagesSection({
    watch,
    setValue,
    imageUploading,
    setImageUploading
}: ImagesSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

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

    const removeImage = (index: number) => {
        const currentImages = watch('images') || []
        const updatedImages = currentImages.filter((_, i) => i !== index)
        setValue('images', updatedImages, {
            shouldValidate: true,
            shouldDirty: true
        })
        toast.success('Image removed')
    }

    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Property Images
            </h3>
            <div className="space-y-3">
                <div
                    onClick={() => !imageUploading && fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors ${imageUploading
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-input hover:border-primary hover:bg-primary/5'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={imageUploading}
                    />
                    <div className="flex flex-col items-center gap-2">
                        {imageUploading ? (
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        ) : (
                            <Upload className="w-8 h-8 text-muted-foreground" />
                        )}
                        <div>
                            <p className="text-sm font-medium">
                                {imageUploading ? 'Uploading...' : 'Click to upload images'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Upload JPG, PNG or WebP files (max 5MB each)
                            </p>
                        </div>
                    </div>
                </div>

                {watch('images') && watch('images').length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {watch('images').map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={image}
                                    fill
                                    priority
                                    alt={`Property ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}