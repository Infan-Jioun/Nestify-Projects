"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Inputs } from '../add-property-form/AddPropertyForm'
import { FieldErrors, UseFormRegister as UseFrommRegister } from 'react-hook-form'
type CurrencyProps = {
    register: UseFrommRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function Currency({ register, errors }: CurrencyProps) {
    return (
        <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="currency">
                Currency
            </Label>
            <Select>
                <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select your currency" />
                </SelectTrigger>
                <SelectContent id="currency" {...register("currency", { required: true, valueAsNumber: true })}>
                    <SelectItem value="BD">BD</SelectItem>
                    <SelectItem value="US">US</SelectItem>

                </SelectContent>
                {errors.currency && (
                    <span className="text-red-500 text-sm">Currency is required</span>
                )}
            </Select>
        </div>
    )
}
