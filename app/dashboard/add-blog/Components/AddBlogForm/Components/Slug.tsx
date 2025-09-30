import { BlogPost } from '@/app/Types/BlogPost'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
type SlugProps = {
    register: UseFormRegister<BlogPost>
    errors: FieldErrors<BlogPost>
}
export default function Slug({ register, errors }: SlugProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="Slug">
                    Blog Slug
                </Label>
                <Input
                    id="Slug"
                    className="w-full"
                    placeholder="Type blog Slug"
                    {...register("slug", { required: "Slug is required" })}
                />
                {errors.slug && (
                    <span className="text-red-500 text-sm">{errors.slug.message}</span>
                )}
            </div>

        </div>
    )
}
