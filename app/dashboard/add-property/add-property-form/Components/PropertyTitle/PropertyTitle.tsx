import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Inputs } from '../Inputs'

type PropertyTitleProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
}
export default function PropertyTitle({ register, errors }: PropertyTitleProps) {
    return (
        <div>
            {/* Title */}
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="title">
                    Property Title
                </Label>
                <Input
                    id="title"
                    className="w-full"
                    placeholder="Type property title"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
            </div>

        </div>
    )
}
