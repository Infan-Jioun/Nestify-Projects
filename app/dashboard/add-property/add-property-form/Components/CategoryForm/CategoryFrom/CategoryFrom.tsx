"use client"

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { setCategory } from "@/app/features/property/propertySlice"
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form"
import { Inputs } from "../../Inputs"
import { Field, propertyCategoryData } from "@/lib/proprtyCategory"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

type CategoryFormProps = {
    register: UseFormRegister<Inputs>
    watch: UseFormWatch<Inputs>
    setValue: UseFormSetValue<Inputs>
    errors: FieldErrors<Inputs>
}

export default function CategoryForm({ register, watch, setValue, errors }: CategoryFormProps) {
    const dispatch = useDispatch()
    const category = useSelector((state: RootState) => state.property.category)

    const handleCategoryChange = (value: string) => {
        setValue("category", value)
        dispatch(setCategory(value))
    }

    const fields: Field[] = category ? propertyCategoryData[category] || [] : []

    return (
        <div className="space-y-6">
            {/* Category Select */}
            <div>
                <Label className="mb-2 block text-gray-700 text-xs">Category</Label>
                <Select
                    value={category || ""}
                    onValueChange={handleCategoryChange}

                    {...register("category", { required: "Category is required" })}
                >
                    <SelectTrigger className={`w-full ${errors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {Object.keys(propertyCategoryData).map(cat => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <AnimatePresence mode="wait">
                {fields.length > 0 && (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 "
                    >
                        {fields.map(field => (
                            <div key={field.name}>
                                <Label className="mb-2 block text-gray-700 text-xs">{field.label}</Label>
                                <Input
                                    type={field.type || "text"}
                                    {...register(field.name as keyof Inputs)}
                                />
                                {errors[field.name as keyof Inputs] && (
                                    <p className="text-red-500 text-sm">
                                        {errors[field.name as keyof Inputs]?.message as string}
                                    </p>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
