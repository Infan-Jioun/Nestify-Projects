"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function ImageSection() {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="space-y-4">
            <Label htmlFor="propertyImage" className="text-sm font-medium text-gray-700">
                Upload Property Image
            </Label>
            <Input
                id="propertyImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
            />

            {preview && (
                <div className="mt-4">
                    <Image
                        src={preview}
                        alt="Preview"
                        width={200}
                        height={150}
                        className="rounded-xl shadow-md border"
                    />
                </div>
            )}
        </div>
    )
}
