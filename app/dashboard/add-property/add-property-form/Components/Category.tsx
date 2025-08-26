"use client"
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../..//add-property-form/add-property-form/AddPropertyForm'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
type CategoryProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function Category({ register, errors }: CategoryProps) {
    return (
        <div>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent   id="category"
                {...register("category", { required: true })}>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
                {errors.category && (
                <span className="text-red-500 text-sm">Category is required</span>
            )}
            </Select>
           
            
        </div>
    )
}
