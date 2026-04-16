/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'
import { ImageIcon, Upload, Loader2, Trash2, Images } from 'lucide-react'
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
    const images = watch('images') || []

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setImageUploading(true)

        try {
            const currentImages = watch('images') || []
            const newImages: string[] = []

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                // ── In production replace this with your actual upload logic ──
                // e.g. upload to S3 / Cloudinary and push the returned URL
                const imageUrl = URL.createObjectURL(file)
                newImages.push(imageUrl)
            }

            setValue('images', [...currentImages, ...newImages], {
                shouldValidate: true,
                shouldDirty: true,
            })
            toast.success(`${newImages.length} image(s) added successfully`)
        } catch (error) {
            
            
            toast.error('Failed to upload images')
        } finally {
            setImageUploading(false)
            // Reset input so the same file can be re-selected if needed
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const removeImage = (index: number) => {
        const currentImages = watch('images') || []
        setValue('images', currentImages.filter((_, i) => i !== index), {
            shouldValidate: true,
            shouldDirty: true,
        })
        toast.success('Image removed')
    }

    return (
        <div className="space-y-3 sm:space-y-4">
     
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Property Images
                {images.length > 0 && (
                    <span className="ml-auto text-xs font-normal text-muted-foreground">
                        {images.length} image{images.length !== 1 ? 's' : ''}
                    </span>
                )}
            </h3>

            <div className="space-y-4">
                {/* ── Existing + newly added images grid ─────────────── */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {images.map((image, index) => (
                            <div
                                key={`${image}-${index}`}
                                className="group relative aspect-square rounded-lg overflow-hidden
                                           border border-border bg-muted"
                            >
                                <Image
                                    src={image}
                                    alt={`Property image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw,
                                           (max-width: 1024px) 33vw,
                                           25vw"
                                    className="object-cover transition-transform duration-200
                                               group-hover:scale-105"
                                    // Allow both remote URLs and local blob: URLs
                                    unoptimized={image.startsWith('blob:')}
                                />

                                {/* ── Dark overlay on hover ─────────────── */}
                                <div
                                    className="absolute inset-0 bg-black/40 opacity-0
                                               group-hover:opacity-100 transition-opacity duration-200"
                                />

                                {/* ── Image index badge ─────────────────── */}
                                <span
                                    className="absolute bottom-1 left-1.5
                                               text-[10px] font-semibold text-white/80
                                               opacity-0 group-hover:opacity-100
                                               transition-opacity duration-200"
                                >
                                    {index + 1}
                                </span>

                                {/* ── Delete button ─────────────────────── */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    aria-label={`Remove image ${index + 1}`}
                                    className="absolute top-1.5 right-1.5
                                               p-1.5 rounded-full
                                               bg-red-500 hover:bg-red-600
                                               text-white shadow-md
                                               "
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ))}

                        {/* ── Inline "add more" tile ───────────────────── */}
                        <button
                            type="button"
                            onClick={() => !imageUploading && fileInputRef.current?.click()}
                            disabled={imageUploading}
                            aria-label="Add more images"
                            className="aspect-square rounded-lg border-2 border-dashed border-input
                                       flex flex-col items-center justify-center gap-1.5
                                       text-muted-foreground
                                       hover:border-primary hover:text-primary hover:bg-primary/5
                                       disabled:opacity-50 disabled:cursor-not-allowed
                                       transition-colors duration-150"
                        >
                            {imageUploading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Images className="w-6 h-6" />
                                    <span className="text-[11px] font-medium">Add more</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* ── Full drop-zone (shown only when no images yet) ──── */}
                {images.length === 0 && (
                    <div
                        onClick={() => !imageUploading && fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ' ') && !imageUploading)
                                fileInputRef.current?.click()
                        }}
                        className={`border-2 border-dashed rounded-lg p-6 sm:p-10 text-center
                                    cursor-pointer transition-colors duration-150
                                    ${imageUploading
                                ? 'border-primary/50 bg-primary/10 cursor-not-allowed'
                                : 'border-input hover:border-primary hover:bg-primary/5'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            {imageUploading ? (
                                <Loader2 className="w-9 h-9 animate-spin text-primary" />
                            ) : (
                                <Upload className="w-9 h-9 text-muted-foreground" />
                            )}
                            <div>
                                <p className="text-sm font-medium">
                                    {imageUploading ? 'Uploading…' : 'Click to upload images'}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    JPG, PNG or WebP · max 5 MB each
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Single hidden file input shared by both triggers ── */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={imageUploading}
                />
            </div>
        </div>
    )
}