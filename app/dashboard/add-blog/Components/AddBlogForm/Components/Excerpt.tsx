import { BlogPost } from '@/app/Types/BlogPost'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
type ExcerptProps = {
    register: UseFormRegister<BlogPost>
    errors: FieldErrors<BlogPost>
}
export default function Excerpt({ register, errors }: ExcerptProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="Excerpt">
                    Blog Excerpt
                </Label>
                <Textarea
                    {...register("excerpt", { required: "excerpt is required" })}
                    className="w-full"
                    placeholder="Enter full address here"
                />
                {errors.excerpt && (
                    <span className="text-red-500 text-sm">{errors.excerpt.message}</span>
                )}
            </div>

        </div>
    )
}
