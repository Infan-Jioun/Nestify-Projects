"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PropertyLocation from "../Components/PropertyLocation"
import Currency from "../Components/Currency"
import { Textarea } from "@/components/ui/textarea"
import { Inputs } from "../Components/Inputs"
import CategoryFrom from "../Components/CategoryForm/CategoryFrom/CategoryFrom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { setAddPropertyLoader } from "@/app/features/loader/loaderSlice"
import axios from "axios"
import ImageSection from "../Components/ImageSection/ImageSection"
import PropertyTitle from "../Components/PropertyTitle/PropertyTitle"
import PropertySize from "../Components/PropertySize/PropertySize"
import PropertyPrice from "../Components/PropertyPrice/PropertyPrice"
import PropertyAddress from "../Components/PropertyAddress/PropertyAddress"
import ContactInfo from "../Components/ContactInfo/ContactInfo"

export default function AddPropertyFormPage() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      currency: "BDT",
    },
  })

  const loading = useSelector((state: RootState) => state?.loader?.loading)

  const onSubmit = async (data: Inputs) => {

    try {
      dispatch(setAddPropertyLoader(true))
      const categoryFields = Object.entries(data)
        .filter(([key, value]) =>
          ![
            "title", "currency", "propertySize", "price",
            "address", "contactNumber", "email",
            "division", "district", "upazila", "country",
            "category"
          ].includes(key) && value !== undefined && value !== null
        )
        .map(([key, value]) => ({ name: key, value }));

      const transformedData = {
        ...data,
        category: {
          name: typeof data.category === "string" ? data.category : (data.category as { name: string }).name,
          fields: categoryFields,
        },
        upazila: data.upazila || "",
      };

      // API call
      console.log(data);
      const response = await axios.post("/api/properties", transformedData)

      if (response.status === 201 || response.status === 200) {
        alert("Property submitted successfully!")
      } else {
        alert("Failed to submit property.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to submit property.")
    } finally {
      dispatch(setAddPropertyLoader(false))
    }
  }

  return (
    <div className="drop-shadow-xl">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-green-500 mb-6 mt-6">
        Add New Property
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100"
      >

        <ImageSection />
        <PropertyTitle register={register} errors={errors} />
        {/* Category & Size */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryFrom register={register} errors={errors} watch={watch} setValue={setValue} />
          <PropertyLocation register={register} errors={errors} watch={watch} setValue={setValue} />
          <PropertySize register={register} errors={errors} />
        </section>

        {/* Price & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyPrice register={register} errors={errors} />
          <div>
            <Currency value={watch("currency")} setValue={setValue} errors={errors} />
          </div>
        </div>

        {/* Address */}

        <PropertyAddress register={register} errors={errors} />
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactInfo register={register} errors={errors} />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-green-500 hover:bg-green-600 transition-all"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Property"}
        </Button>
      </form>
    </div>
  )
}
