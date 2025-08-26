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
import { Input } from "@/components/ui/input"

interface LocationProps {
    register: UseFormRegister<any>
    errors: FieldErrors<any>
    watch: UseFormWatch<any>
    setValue: UseFormSetValue<any>
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

    // Custom Select
    const CustomSelect = ({
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
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={isLoading}
                className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"
                    } ${isLoading ? "bg-gray-100" : "bg-white"}`}
                name={name}
            >
                <option value="">{isLoading ? "Loading..." : placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    )

    return (
        <div className="space-y-6 ">
            

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <Input
                    {...register("address", { required: "Address is required" })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                    placeholder="Enter full address"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <CustomSelect
                    options={[
                        { value: "Bangladesh", label: "Bangladesh" },
                        { value: "Other", label: "Other Country" }
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
                        className="space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Division */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                            <CustomSelect
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

                        {/* District */}
                        {watchDivision && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                <CustomSelect
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
                            </motion.div>
                        )}

                        {/* Upazila */}
                        {watchDistrict && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                                <CustomSelect
                                    options={upazilas}
                                    placeholder="Select Upazila"
                                    isLoading={loading.upazila}
                                    value={watch("upazila") || ""}
                                    onChange={val => setValue("upazila", val, { shouldValidate: true })}
                                    error={errors.upazila}
                                    name="upazila"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
