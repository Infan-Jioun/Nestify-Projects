import React from 'react'
import { MapPin } from 'lucide-react'
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'
import ControlledSearchLocation from './ControlledSearchLocation'

interface LocationSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
    watch: UseFormWatch<EditPropertyInputs>
    setValue: UseFormSetValue<EditPropertyInputs>
}

export function LocationSection({
    register,
    errors,
    watch,
    setValue
}: LocationSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Location Details
            </h3>
            <div className="space-y-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Full Address *
                    </label>
                    <textarea
                        {...register('address', {
                            required: 'Address is required'
                        })}
                        rows={2}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter complete address"
                    />
                    {errors.address && (
                        <p className="text-sm text-red-500">{errors.address.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            District/Area
                        </label>
                        <input
                            type="text"
                            {...register('districtName')}
                            className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter district name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Country Location *
                        </label>
                        <ControlledSearchLocation
                            value={watch('geoCountryLocation') || ''}
                            onChange={(value) => setValue('geoCountryLocation', value, {
                                shouldValidate: true,
                                shouldDirty: true
                            })}
                            // placeholder="Enter country or city"
                        />
                        {errors.geoCountryLocation && (
                            <p className="text-sm text-red-500">{errors.geoCountryLocation.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}