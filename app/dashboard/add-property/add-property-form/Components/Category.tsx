"use client"
import React from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Inputs } from '../..//add-property-form/add-property-form/AddPropertyForm'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectLabel } from '@radix-ui/react-select'
import { Label } from '@/components/ui/label'
type CategoryProps = {

    errors: FieldErrors<Inputs>
    setValue: UseFormSetValue<Inputs>
    value?: string
}
export default function Category({ errors, setValue, value }: CategoryProps) {
    return (
        <div>

            <Label className='mb-2 block text-gray-700 text-xs'>Category</Label>
            <Select onValueChange={(val) => setValue("category", val as Inputs["category"])}>


                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Property" />
                </SelectTrigger>
                <SelectContent id="category">
                    <SelectGroup className='px-2 pt-3'>
                        <SelectLabel className='text-gray-600'>Property Category</SelectLabel>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>

                    </SelectGroup>

                </SelectContent>
                {errors.category && (
                    <span className="text-red-500 text-sm">Category is required</span>
                )}
            </Select>
        </div>
    )
}
