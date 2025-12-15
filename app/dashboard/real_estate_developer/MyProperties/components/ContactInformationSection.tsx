import React from 'react'
import { Phone } from 'lucide-react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'

interface ContactInformationSectionProps {
    register: UseFormRegister<EditPropertyInputs>
    errors: FieldErrors<EditPropertyInputs>
}

export function ContactInformationSection({
    register,
    errors
}: ContactInformationSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Contact Number *
                    </label>
                    <input
                        type="tel"
                        {...register('contactNumber', {
                            required: 'Contact number is required'
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter contact number"
                    />
                    {errors.contactNumber && (
                        <p className="text-sm text-red-500">{errors.contactNumber.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                        className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}