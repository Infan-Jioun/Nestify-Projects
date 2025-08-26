"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Category from "../Components/Category"

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
  division: string
  district: string
  upazila?: string
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
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  return (
    <div className="     mx-auto p-6">
        <h2 className="text-center font-bold">FORM FILL UP</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg shadow-md p-6"
      >
        {/* Title */}
        <div>
          <Label htmlFor="title">Property Title</Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
        </div>

        {/* category */}
       <Category register={register} errors={errors} />

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
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
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" {...register("currency", { required: true })} />
          </div>
        </div>

        {/* Property Size */}
        <div>
          <Label htmlFor="propertySize">Property Size (sqft)</Label>
          <Input
            id="propertySize"
            type="number"
            {...register("propertySize", { required: true, valueAsNumber: true })}
          />
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
            />
          </div>
          <div>
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register("address", { required: true })} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="division">Division</Label>
            <Input id="division" {...register("division", { required: true })} />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input id="district" {...register("district", { required: true })} />
          </div>
          <div>
            <Label htmlFor="upazila">Upazila</Label>
            <Input id="upazila" {...register("upazila")} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" {...register("contactNumber", { required: true })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: true })} />
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">
          Add Property
        </Button>
      </form>
    </div>
  )
}
