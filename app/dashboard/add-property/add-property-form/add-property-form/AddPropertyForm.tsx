"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { setAddPropertyLoader } from "@/app/features/loader/loaderSlice"
import axios from "axios"
import { motion } from "framer-motion"

// Components
import ImageSection from "../Components/ImageSection/ImageSection"
import PropertyTitle from "../Components/PropertyTitle/PropertyTitle"
import CategoryFrom from "../Components/CategoryForm/CategoryFrom/CategoryFrom"
import PropertyLocation from "../Components/PropertyLocation"
import PropertySize from "../Components/PropertySize/PropertySize"
import PropertyPrice from "../Components/PropertyPrice/PropertyPrice"
import Currency from "../Components/Currency"
import PropertyAddress from "../Components/PropertyAddress/PropertyAddress"
import ContactInfo from "../Components/ContactInfo/ContactInfo"
import { Inputs } from "../Components/Inputs"
import toast from "react-hot-toast"
import { useImageUpload } from "@/hooks/useImageUpload"

export default function AddPropertyFormPage() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { currency: "BDT" } })

  const loading = useSelector((state: RootState) => state.loader.loading)

  const onSubmit = async (data: Inputs) => {
    try {
      dispatch(setAddPropertyLoader(true))

  
      const categoryFields = Object.entries(data)
        .filter(([key, value]) =>
          ![
            "title", "currency", "propertySize", "price",
            "address", "contactNumber", "email",
            "division", "district", "upazila",
            "country", "category", 
          ].includes(key) && value !== undefined && value !== null
        )
        .map(([key, value]) => ({ name: key, value }))

      const transformedData = {
        ...data,
        category: {
          name: typeof data.category === "string" ? data.category : (data.category as { name: string }).name,
          fields: categoryFields
        },
        upazila: data.upazila || "",
       
      }

      const response = await axios.post("/api/properties", transformedData)

      if (response.status === 201 || response.status === 200) {
        toast.success("Property submitted successfully!")
      } else {
        toast.error("Failed to submit property.")
      }
    } catch (err) {
      console.error("Error adding property:", err)
      toast.error("Failed to submit property.")
    } finally {
      dispatch(setAddPropertyLoader(false))
    }
  }

  return (
    <div className="drop-shadow-xl px-3 mt-5 border-t-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100 hover:border-green-400"
      >
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <PropertyTitle register={register} errors={errors} />
          <ContactInfo register={register} control={control} errors={errors} />
        </div>

        <CategoryFrom register={register} errors={errors} setValue={setValue} />
        <PropertyLocation register={register} errors={errors} watch={watch} setValue={setValue} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PropertySize register={register} errors={errors} />
          <PropertyPrice register={register} errors={errors} />
          <Currency value={watch("currency")} setValue={setValue} errors={errors} />
        </div>

        <PropertyAddress register={register} errors={errors} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn h-10 px-4 w-full rounded-full bg-white text-black border border-gray-300 hover:text-green-500 hover:border-green-400 transition"
        >
          {loading ? "Submitting..." : "Add Property"}
        </motion.button>
      </form>
    </div>
  )
}
