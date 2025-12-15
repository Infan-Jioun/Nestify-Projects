import React from 'react'
import { Building } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'

interface BasicInformationSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
    propertyCategories: string[]
}

export function BasicInformationSection({
    register,
    errors,
    propertyCategories
}: BasicInformationSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Property Title *
                    </label>
                    <input
                        type="text"
                        {...register('title', {
                            required: 'Title is required',
                            minLength: { value: 5, message: 'Minimum 5 characters' }
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter property title"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Property Category *
                    </label>
                    <select
                        {...register('category.name', {
                            required: 'Category is required'
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Select Category</option>
                        {propertyCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category?.name && (
                        <p className="text-sm text-red-500">{errors.category.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Status *
                    </label>
                    <select
                        {...register('status')}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="Available">Available</option>
                        <option value="Rented">Rented</option>
                        <option value="Sold">Sold</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>
        </div>
    )
}