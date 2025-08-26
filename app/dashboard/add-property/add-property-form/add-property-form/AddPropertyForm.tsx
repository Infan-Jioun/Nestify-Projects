"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Category from "../Components/Category"
import PropertyLocation from "../Components/PropertyLocation"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export type Inputs = {
  title: string
  category: "Apartment" | "House" | "Land" | "Commercial"
  price: number
  currency: "BDT" | "USD"
  propertySize: number
  bedrooms?: number
  bathrooms?: number
  floor?: number
  furnishing?: "Furnished" | "Semi-furnished" | "Unfurnished"
  address: string
  country: string
  division: string
  district: string
  upazila: string
  geoLocation?: { lat: number; lng: number }
  images: string[]
  videos?: string[]
  ownerId: string
  contactNumber: string
  email: string
  status: "Available" | "Rented" | "Sold" | "Pending"
  createdAt: Date
  updatedAt: Date
}

export default function AddPropertyFormPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log(data)
  }
  const loading = useSelector((state: RootState) => state?.loader?.loading)
  return (
    <div className=" p-4 sm:p-6 lg:p-10">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">
        Add New Property
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100"
      >
        {/* Title */}
        <div>
          <Label className="mb-2 block text-gray-700" htmlFor="title">
            Property Title
          </Label>
          <Input
            id="title"
            className="w-full"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        {/* Category & Size */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Category register={register} errors={errors} />
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="propertySize">
              Property Size (sqft)
            </Label>
            <Input
              id="propertySize"
              type="number"
              {...register("propertySize", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
        </section>

        {/* Price & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">Price is required</span>
            )}
          </div>
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="currency">
              Currency
            </Label>
            <Input
              id="currency"
              {...register("currency", { required: true })}
            />
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="bedrooms">
              Bedrooms
            </Label>
            <Input
              id="bedrooms"
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="bathrooms">
              Bathrooms
            </Label>
            <Input
              id="bathrooms"
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Address & Location */}
        <PropertyLocation
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <div>
          <Label className="mb-2 block text-gray-700">Address</Label>
          <Input
            {...register("address", { required: "Address is required" })}
            type="text"
            className="w-full"
            placeholder="Enter full address here"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              className="mb-2 block text-gray-700"
              htmlFor="contactNumber"
            >
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              {...register("contactNumber", { required: true })}
            />
          </div>
          <div>
            <Label className="mb-2 block text-gray-700" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold rounded-xl shadow-md bg-green-500 hover:bg-green-600 transition-all"
        >
          Add Property
        </Button>
      </form>
    </div>
  )
}
