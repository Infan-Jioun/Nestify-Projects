import React from 'react'
import { MapPin } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'
import ControlledSearchLocation from './ControlledSearchLocation'


interface LocationSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
    onInputChange: (field: keyof EditPropertyInputs, value: string) => void
    onLocationChange: (value: string) => void
    locationValue: string
}

const LocationSection: React.FC<LocationSectionProps> = ({
    register,
    errors,
    onInputChange,
    onLocationChange,
    locationValue
}) => {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Location Details
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {/* Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Address *</label>
                    <input
                        type="text"
                        {...register('address', {
                            required: 'Address is required',
                            minLength: {
                                value: 10,
                                message: 'Address should be at least 10 characters'
                            }
                        })}
                        onChange={(e) => onInputChange('address', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter full address"
                    />
                    {errors.address && (
                        <p className="text-sm text-destructive">{errors.address.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <label className="text-sm font-medium text-foreground">Location *</label>
                    <ControlledSearchLocation
                        value={locationValue}
                        onChange={onLocationChange}
                        error={errors.geoCountryLocation?.message}
                    />
                </div>
            </div>
        </div>
    )
}

export default LocationSection