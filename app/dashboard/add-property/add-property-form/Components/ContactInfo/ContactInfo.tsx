"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../Inputs'

type ContactInfoProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function ContactInfo({ register, errors }: ContactInfoProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-evenly items-end'>

            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="contactNumber">
                    Contact Number
                </Label>
                <Input
                    id="contactNumber"
                    placeholder="Type contact number"
                    {...register("contactNumber", { required: "Contact Number is required" })}
                />
                {errors.contactNumber && (
                    <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>
                )}
            </div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="email">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Type email address"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
            </div>

        </div>
    )
}
