"use client"

import React, { useEffect } from "react"
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { bangladeshGeoData } from "@/lib/geo-data"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import {
    setDivisions,
    setDivisionLoading,
    setDistricts,
    setDistrictLoading,
    setUpazilas,
    setUpazilaLoading,
    resetLocation,
    SelectOption
} from "../../../../features/location/locationSlice"

import { Label } from "@/components/ui/label"
import { Inputs } from "./Inputs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LocationProps {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
    watch: UseFormWatch<Inputs>
    setValue: UseFormSetValue<Inputs>
}

export default function PropertyLocation({ register, errors, watch, setValue }: LocationProps) {
    const dispatch = useDispatch()
    const { divisions, districts, upazilas, loading } = useSelector(
        (state: RootState) => state.location
    )

    const watchCountry = watch("country")
    const watchDivision = watch("division")
    const watchDistrict = watch("district")

    // Load divisions
    useEffect(() => {
        if (watchCountry === "Bangladesh") {
            dispatch(setDivisionLoading(true))
            const timer = setTimeout(() => {
                const divisionOptions: SelectOption[] = bangladeshGeoData.map(d => ({
                    value: d.division,
                    label: d.division
                }))
                dispatch(setDivisions(divisionOptions))
                dispatch(setDivisionLoading(false))
            }, 400)
            return () => clearTimeout(timer)
        } else {
            dispatch(resetLocation())
            setValue("division", "")
            setValue("district", "")
            setValue("upazila", "")
        }
    }, [watchCountry, dispatch, setValue])

    // Load districts
    useEffect(() => {
        if (watchCountry === "Bangladesh" && watchDivision) {
            dispatch(setDistrictLoading(true))
            const timer = setTimeout(() => {
                const divisionObj = bangladeshGeoData.find(d => d.division === watchDivision)
                if (divisionObj) {
                    const districtOptions: SelectOption[] = divisionObj.districts.map(d => ({
                        value: d.district,
                        label: d.district
                    }))
                    dispatch(setDistricts(districtOptions))
                }
                dispatch(setDistrictLoading(false))
            }, 400)
            return () => clearTimeout(timer)
        } else {
            dispatch(setDistricts([]))
            dispatch(setUpazilas([]))
            setValue("district", "")
            setValue("upazila", "")
        }
    }, [watchDivision, watchCountry, dispatch, setValue])

    // Load upazilas
    useEffect(() => {
        if (watchCountry === "Bangladesh" && watchDivision && watchDistrict) {
            dispatch(setUpazilaLoading(true))
            const timer = setTimeout(() => {
                const divisionObj = bangladeshGeoData.find(d => d.division === watchDivision)
                const districtObj = divisionObj?.districts.find(d => d.district === watchDistrict)
                if (districtObj) {
                    const upazilaOptions: SelectOption[] = districtObj.upazilas.map(u => ({
                        value: u,
                        label: u
                    }))
                    dispatch(setUpazilas(upazilaOptions))
                }
                dispatch(setUpazilaLoading(false))
            }, 400)
            return () => clearTimeout(timer)
        } else {
            dispatch(setUpazilas([]))
            setValue("upazila", "")
        }
    }, [watchDistrict, watchDivision, watchCountry, dispatch, setValue])

    // shadcn Select helper
    const ShadcnSelect = ({
        options,
        placeholder,
        isLoading,
        value,
        onChange,
        error,
        name
    }: {
        options: SelectOption[]
        placeholder: string
        isLoading: boolean
        value: string
        onChange: (value: string) => void
        error?: { message?: string }
        name: string
    }) => (
        <div>
            <Select
                value={value}
                onValueChange={onChange}
                disabled={isLoading}
                {...register("country", { required: "country is required" })}
            >
                <SelectTrigger className={`w-full ${error ? "border-red-500" : ""}`}>
                    <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    )

    return (
        <div className="space-y-6">
            {/* Country */}
            <div>
                <Label className="mb-2 block text-gray-700 text-xs">Country</Label>
                <ShadcnSelect
                    options={[
                        { value: "Bangladesh", label: "Bangladesh" },

                    ]}
                    placeholder="Select Country"
                    isLoading={false}
                    value={watchCountry || ""}
                    onChange={val => {
                        setValue("country", val, { shouldValidate: true })
                        setValue("division", "")
                        setValue("district", "")
                        setValue("upazila", "")
                    }}
                    error={errors.country}
                    name="country"
                />

            </div>

            <AnimatePresence>
                {watchCountry === "Bangladesh" && (
                    <motion.div
                        key="bangladesh-location"
                        className="space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Division */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2 mt-2">Division</Label>
                            <ShadcnSelect

                                options={divisions}
                                placeholder="Select Division"
                                isLoading={loading.division}
                                value={watchDivision || ""}
                                onChange={val => {
                                    setValue("division", val, { shouldValidate: true })
                                    setValue("district", "")
                                    setValue("upazila", "")
                                }}
                                error={errors.division}
                                name="division"
                            />

                        </div>
                        {errors && <p className="mt-1 text-sm text-red-600">Division is required</p>}

                        {/* District */}
                        {watchDivision && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <Label className="mb-2 block text-gray-700 text-xs">District</Label>
                                <ShadcnSelect
                                    options={districts}
                                    placeholder="Select District"
                                    isLoading={loading.district}
                                    value={watchDistrict || ""}
                                    onChange={val => {
                                        setValue("district", val, { shouldValidate: true })
                                        setValue("upazila", "")
                                    }}
                                    error={errors.district}
                                    name="district"
                                />
                                {errors && <p className="mt-1 text-sm text-red-600">District is required</p>}
                            </motion.div>
                        )}

                        {/* Upazila */}
                        {watchDistrict && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                <Label className="mb-2 block text-gray-700 text-xs">Upazila</Label>
                                <ShadcnSelect
                                    options={upazilas}
                                    placeholder="Select Upazila"
                                    isLoading={loading.upazila}
                                    value={watch("upazila") || ""}
                                    onChange={val => setValue("upazila", val, { shouldValidate: true })}
                                    error={errors.upazila}
                                    name="upazila"
                                />
                                {errors && <p className="mt-1 text-sm text-red-600">Upazila is required</p>}

                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
