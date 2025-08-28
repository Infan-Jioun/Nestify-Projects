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

      // API call
      const response = await axios.post("/api/properties", data)

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
        {/* Title */}
        <div>
          <Label className="mb-2 block text-gray-700 text-xs" htmlFor="title">
            Property Title
          </Label>
          <Input
            id="title"
            className="w-full"
            placeholder="Type property title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Category & Size */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryFrom register={register} errors={errors} watch={watch} setValue={setValue} />
          <PropertyLocation register={register} errors={errors} watch={watch} setValue={setValue} />
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="propertySize">
              Property Size (sqft)
            </Label>
            <Input
              id="propertySize"
              type="number"
              placeholder="Type property size"
              {...register("propertySize", {
                required: "Property Size is required",
                valueAsNumber: true,
              })}
            />
            {errors.propertySize && (
              <span className="text-red-500 text-sm">{errors.propertySize.message}</span>
            )}
          </div>
        </section>

        {/* Price & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Type property price"
              {...register("price", { required: "Price is required", valueAsNumber: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price.message}</span>
            )}
          </div>
          <div>
            <Currency value={watch("currency")} setValue={setValue} errors={errors} />
          </div>
        </div>

        {/* Address */}
        <div>
          <Label className="mb-2 block text-gray-700 text-xs">Address</Label>
          <Textarea
            {...register("address", { required: "Address is required" })}
            className="w-full"
            placeholder="Enter full address here"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address.message}</span>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="contactNumber">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              placeholder="Type contact number"
              {...register("contactNumber", { required: "Contact Number is required" })}
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>
            )}
          </div>
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Type email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
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
