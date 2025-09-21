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

import { FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Inputs } from './Inputs'
type CurrencyProps = {
    value?: string
    setValue: UseFormSetValue<Inputs>
    errors: FieldErrors<Inputs>
}
export default function Currency({ setValue, errors }: CurrencyProps) {
    return (
        <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="currency">
                Currency
            </Label>
            <Select onValueChange={(val) => setValue("currency", val as Inputs["currency"])}>
                <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Select your currency" />
                </SelectTrigger>
                <SelectContent id="currency">
                    <SelectItem value="BDT">BDT</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="SAR">SAR</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
                {errors.currency && (
                    <span className="text-red-500 text-sm">Currency is required</span>
                )}
            </Select>
        </div>
    )
}
