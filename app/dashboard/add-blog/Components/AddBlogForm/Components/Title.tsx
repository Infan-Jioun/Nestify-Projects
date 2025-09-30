import { BlogPost } from '@/app/Types/BlogPost'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
type TitleProps = {
    register: UseFormRegister<BlogPost>
    errors: FieldErrors<BlogPost>
}
export default function Title({ register, errors }: TitleProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="title">
                    Blog Title
                </Label>
                <Input
                    id="title"
                    className="w-full"
                    placeholder="Type blog title"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
            </div>

        </div>
    )
}
