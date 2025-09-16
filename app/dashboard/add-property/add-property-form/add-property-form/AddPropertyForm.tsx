"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setAddPropertyLoader, setButtonLoader } from "@/app/features/loader/loaderSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// Components
import ImageSection from "../Components/ImageSection/ImageSection";
import PropertyTitle from "../Components/PropertyTitle/PropertyTitle";
import CategoryFrom from "../Components/CategoryForm/CategoryFrom/CategoryFrom";
import PropertyLocation from "../Components/PropertyLocation";
import PropertySize from "../Components/PropertySize/PropertySize";
import PropertyPrice from "../Components/PropertyPrice/PropertyPrice";
import Currency from "../Components/Currency";
import PropertyAddress from "../Components/PropertyAddress/PropertyAddress";
import ContactInfo from "../Components/ContactInfo/ContactInfo";
import { Inputs } from "../Components/Inputs";
import { imageUpload } from "@/hooks/useImageUpload";
import { Button } from "@/components/ui/button";
import { addProperty } from "@/app/features/Properties/propertySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { PropertyType } from "@/app/Types/properties";
import { dataTagErrorSymbol } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export default function AddPropertyFormPage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const buttonLoader = useSelector((state: RootState) => state.loader.buttonLoader);

  const onSubmit = async (data: Inputs) => {
    try {
      dispatch(setAddPropertyLoader(true));
      dispatch(setButtonLoader(true));

      // 1) Upload images
      let uploadedImages: string[] = [];
      if (data.images && data.images.length > 0) {
        const files = Array.from(data.images);
        const uploads = await Promise.all(
          files.map(async (file) => {
            const res = await imageUpload(file);
            return res?.data?.url || res?.data?.display_url;
          })
        );
        uploadedImages = uploads.filter(Boolean) as string[];
      }

      // 2) Transform category fields with id
      const categoryFields = Object.entries(data)
        .filter(
          ([key, value]) =>
            ![
              "title",
              "currency",
              "propertySize",
              "price",
              "address",
              "contactNumber",
              "email",
              "geoCountryLocation",
              "category",
              "images",
              "videos",
              "createdAt",
              "updatedAt",
            ].includes(key) &&
            value !== undefined &&
            value !== null
        )
        .map(([key, value]) => ({
          id: uuidv4(),
          name: key,
          value: value as string | number | boolean,
        }));

      // 3) Final payload matching PropertyType
      const transformedData: PropertyType = {
        ...data,
        images: uploadedImages,
        videos: data.videos || [],
        category: {
          name:
            typeof data.category === "string"
              ? data.category
              : (data.category as { name: string }).name,
          fields: categoryFields,
        },

        geoCountryLocation: data.geoCountryLocation || "",
        status: data.status || "Available",
        createdAt: data.createdAt ? data.createdAt.toISOString() : new Date().toISOString(),
        updatedAt: data.updatedAt ? data.updatedAt.toISOString() : new Date().toISOString(),
      };

      // 4) Dispatch addProperty
      const resultAction = await dispatch(addProperty(transformedData));
      unwrapResult(resultAction);

      toast.success("Property submitted successfully!");
      reset();
    } catch (err: unknown) {
      console.error("Error adding property:", err);
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to submit property.");
    } finally {
      dispatch(setAddPropertyLoader(false));
      dispatch(setButtonLoader(false));
    }
  };

  return (
    <div className="drop-shadow-xl mt-5 border-t-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100 hover:border-green-400"
      >
        <ImageSection register={register} errors={errors} setValue={setValue} />

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

        <Button className="h-10 px-4 w-full rounded-full bg-white text-green-500 hover:bg-green-500 hover:text-white border border-gray-300 hover:border-green-500 font-semibold transition">
          {buttonLoader ? <Loader/> : "Add Your Property"}
        </Button>
      </form>
    </div>
  );
}
