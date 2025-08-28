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
import Currency from "../Components/Currency"
import { Textarea } from "@/components/ui/textarea"

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
    <div className=" drop-shadow-xl">
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
            className="w-full" placeholder="Type property title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        {/* Category & Size */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Category value={watch("category")} setValue={setValue} errors={errors} />
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="propertySize">
              Property Size (sqft)
            </Label>
            <Input
              id="propertySize"
              type="number" placeholder="Type property size"
              {...register("propertySize", {
                required: true,
                valueAsNumber: true,
              })}
            />
            {errors.propertySize && (
              <span className="text-red-500 text-sm">PropertySize is required</span>
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
              type="number" placeholder="Type property price"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">Price is required</span>
            )}
          </div>
          <div>

            <Currency register={register} errors={errors} />
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="bedrooms">
              Bedrooms
            </Label>
            <Input
              id="bedrooms"
              type="number" placeholder="Type number of bedrooms"
              {...register("bedrooms", { required: "Bedrooms is reqiure", valueAsNumber: true })}
            />
            {errors.bedrooms && (
              <span className="text-red-500 text-sm">{errors.bedrooms.message}</span>
            )}
          </div>
          <div>
            <Label className="mb-2 block text-gray-700 text-xs" htmlFor="bathrooms">
              Bathrooms
            </Label>
            <Input
              id="bathrooms"
              type="number" placeholder="Type number of bathrooms"
              {...register("bathrooms", { required: "Bathrooms is reqiured", valueAsNumber: true })}
            />
            {errors.bathrooms && (
              <span className="text-red-500 text-sm">{errors.bathrooms.message}</span>
            )}
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
            <Label
              className="mb-2 block text-gray-700 text-xs"
              htmlFor="contactNumber"
            >
              Contact Number
            </Label>
            <Input
              id="contactNumber" placeholder="Type contact number"
              {...register("contactNumber", { required: "Contect Number is required" })}
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
              type="email" placeholder="Type email address"
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
        >
          Add Property
        </Button>
      </form>
    </div>
  )
}
