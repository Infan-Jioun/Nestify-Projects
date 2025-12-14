"use client"
import React from 'react'
import { ImageIcon, Upload, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ImagesSectionProps {
    images: string[]
    isUploading: boolean
    isLoading: boolean
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveImage: (index: number) => void
    fileInputRef: React.RefObject<HTMLInputElement | null>
}

const ImagesSection: React.FC<ImagesSectionProps> = ({
    images,
    isUploading,
    isLoading,
    onImageUpload,
    onRemoveImage,
    fileInputRef
}) => {
    return (
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
                    onChange={onImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isLoading}
                    className="flex flex-col items-center justify-center w-full p-4 sm:p-6 border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-muted-foreground/50 transition-colors bg-muted/50 hover:bg-muted disabled:opacity-50"
                >
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-muted-foreground" />
                    ) : (
                        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    )}
                    <span className="font-medium text-foreground mt-2 text-sm sm:text-base">
                        {isUploading ? 'Uploading Images...' : 'Click to Upload Images'}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                        PNG, JPG, JPEG up to 10MB
                    </span>
                </button>
            </div>

            {/* Images Grid */}
            {images.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                            {images.length} image(s) uploaded
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={image}
                                    alt={`Property image ${index + 1}`}
                                    className="w-full h-16 sm:h-20 object-cover rounded-md border"
                                    width={400}
                                    height={300}
                                />
                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(index)}
                                    disabled={isLoading}
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
    )
}

export default ImagesSection