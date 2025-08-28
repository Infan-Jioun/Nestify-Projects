"use client"
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../Inputs'
import { Textarea } from '@/components/ui/textarea'

type PropertyAddressProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function PropertyAddress({ register, errors }: PropertyAddressProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs">Property Address</Label>
                <Textarea
                    {...register("address", { required: "Address is required" })}
                    className="w-full"
                    placeholder="Enter full address here"
                />
                {errors.address && (
                    <span className="text-red-500 text-sm">{errors.address.message}</span>
                )}
            </div>

        </div>
    )
}
