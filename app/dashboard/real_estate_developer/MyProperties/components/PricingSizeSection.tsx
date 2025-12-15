import React from 'react'
import { DollarSign, Ruler } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'

interface PricingSizeSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
}

export function PricingSizeSection({ register, errors }: PricingSizeSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Pricing & Size
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price *
                    </label>
                    <input
                        type="number"
                        {...register('price', {
                            required: 'Price is required',
                            min: { value: 0, message: 'Price cannot be negative' }
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter price"
                        min={0}
                    />
                    {errors.price && (
                        <p className="text-sm text-red-500">{errors.price.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Currency *
                    </label>
                    <select
                        {...register('currency')}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="BDT">BDT (৳)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        Property Size *
                    </label>
                    <input
                        type="number"
                        {...register('propertySize', {
                            required: 'Size is required',
                            min: { value: 0, message: 'Size cannot be negative' }
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter size in sq ft"
                        min={0}
                    />
                    {errors.propertySize && (
                        <p className="text-sm text-red-500">{errors.propertySize.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}