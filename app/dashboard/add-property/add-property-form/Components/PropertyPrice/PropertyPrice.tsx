"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../Inputs'

type PropertyPriceProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function PropertyPrice({ register, errors }: PropertyPriceProps) {
    return (
        <div>
            {/* Price */}
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="price">
                    Price
                </Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Type property price"
                    {...register("price", { required: "Price is required", valueAsNumber: true })}
                />
                {errors.price && (
                    <span className="text-red-500 text-sm">{errors.price.message}</span>
                )}
            </div>
        </div>
    )
}
