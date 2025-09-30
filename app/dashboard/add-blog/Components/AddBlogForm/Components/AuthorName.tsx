import { BlogPost } from '@/app/Types/BlogPost'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
type AuthorProps = {
    register: UseFormRegister<BlogPost>
    errors: FieldErrors<BlogPost>
}
export default function AuthorName({ register, errors }: AuthorProps) {
    return (
        <div>
            <div>
                <Label className="mb-2 block text-gray-700 text-xs" htmlFor="Author">
                    Blog Author
                </Label>
                <Input
                    id="Author"
                    className="w-full"
                    placeholder="Type blog Author Name"
                    {...register("author.name", { required: "Author is required" })}
                />
                {errors.author && (
                    <span className="text-red-500 text-sm">{errors.author.message}</span>
                )}
            </div>

        </div>
    )
}
