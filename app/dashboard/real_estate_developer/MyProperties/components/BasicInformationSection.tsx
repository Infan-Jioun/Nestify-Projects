import React from 'react'
import { Home, Building, DollarSign, Ruler, Phone, BadgeCheck } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'


interface BasicInformationSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
    onInputChange: (field: keyof EditPropertyInputs, value: string | number) => void
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
    register,
    errors,
    onInputChange
}) => {
    return (
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
                            onChange={(e) => onInputChange('title', e.target.value)}
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
                            onChange={(e) => onInputChange('status', e.target.value)}
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
                            onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
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
                        onChange={(e) => onInputChange('currency', e.target.value)}
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
                            onChange={(e) => onInputChange('propertySize', parseFloat(e.target.value) || 0)}
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
                            onChange={(e) => onInputChange('contactNumber', e.target.value)}
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
    )
}

export default BasicInformationSection