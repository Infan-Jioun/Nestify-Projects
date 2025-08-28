"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../Inputs'

type PropertySizeProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function PropertySize({ register, errors }: PropertySizeProps) {
    return (
        <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="propertySize">
                Property Size (sqft)
            </Label>
            <Input
                id="propertySize"
                type="number"
                placeholder="Type property size"
                {...register("propertySize", {
                    required: "Property Size is required",
                    valueAsNumber: true,
                })}
            />
            {errors.propertySize && (
                <span className="text-red-500 text-sm">{errors.propertySize.message}</span>
            )}
        </div>
    )
}
