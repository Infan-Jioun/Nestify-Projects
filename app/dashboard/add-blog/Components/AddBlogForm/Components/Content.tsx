import { BlogPost } from '@/app/Types/BlogPost'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
type ContentProps = {
    register: UseFormRegister<BlogPost>
    errors: FieldErrors<BlogPost>
}
export default function Content({ register, errors }: ContentProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="Content">
                    Blog Content
                </Label>
                <Textarea
                    {...register("content", { required: "Content is required" })}
                    className="w-full"
                    placeholder="Enter full address here"
                />
                {errors.content && (
                    <span className="text-red-500 text-sm">{errors.content.message}</span>
                )}
            </div>

        </div>
    )
}
