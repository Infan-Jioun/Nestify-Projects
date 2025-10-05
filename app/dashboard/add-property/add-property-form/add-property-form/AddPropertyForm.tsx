"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setAddPropertyLoader, setButtonLoader } from "@/app/features/loader/loaderSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
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
import { Loader } from "lucide-react";
import MultiSeclectService from "../Components/MultiSeclectService/MultiSeclectService";
import { useRouter } from "next/navigation";
import ListingStatus from "../Components/ListingStatus/ListingStatus";
import Skeleton from "react-loading-skeleton";
import YearBuild from "../Components/YearBuildForm/YearBuild";

// Skeleton Loader Components
const ImageSectionSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={30} width={200} />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="aspect-square">
          <Skeleton height="100%" />
        </div>
      ))}
    </div>
  </div>
);

const InputFieldSkeleton = () => (
  <div className="space-y-2">
    <Skeleton height={20} width={100} />
    <Skeleton height={40} />
  </div>
);

const PropertyTitleSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
  </div>
);

const ContactInfoSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
    <InputFieldSkeleton />
  </div>
);

const CategoryFormSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={30} width={200} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputFieldSkeleton />
      <InputFieldSkeleton />
    </div>
  </div>
);

const MultiSelectServiceSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={30} width={200} />
    <div className="grid grid-cols-2 gap-2">
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Skeleton circle width={20} height={20} />
          <Skeleton height={20} width={100} />
        </div>
      ))}
    </div>
  </div>
);

const PropertyLocationSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
  </div>
);

const PropertySizeSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
  </div>
);

const ListingStatusSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={30} width={150} />
    <Skeleton height={40} width="100%" />
  </div>
);

const PropertyPriceSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
  </div>
);

const CurrencySkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={30} width={150} />
    <Skeleton height={40} width="100%" />
  </div>
);

const PropertyAddressSkeleton = () => (
  <div className="space-y-4">
    <InputFieldSkeleton />
  </div>
);

const ButtonSkeleton = () => (
  <Skeleton height={40} width="100%" />
);

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
  const skeletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const router = useRouter()

  const onSubmit = async (data: Inputs) => {
    try {
      dispatch(setAddPropertyLoader(true));
      dispatch(setButtonLoader(true));

      let uploadedImages: string[] = [];
      if (data.images && data.images.length > 0) {
        const files = Array.from(data.images);
        const uploads = await Promise.all(
          files.map(async (file) => {
            const url = await imageUpload(file);
            return url;
          })
        );
        uploadedImages = uploads.filter(Boolean) as string[];
      }
      const categoryFields = Object.entries(data)
        .filter(
          ([key, value]) =>
            ![
              "title", "currency", "propertySize", "price", "address", "contactNumber",
              "email",
              "geoCountryLocation",
              "category",
              "yearBuild",
              "listingStatus",
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
      const transformedData: PropertyType = {

        ...data,
        yearBuild: data.yearBuild || 2025,
        images: uploadedImages,
        videos: data.videos || [],
        propertyFacilities: data.propertyFacilities || [],
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

      const resultAction = await dispatch(addProperty(transformedData));
      unwrapResult(resultAction);
      router.push("/Properties");
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


  if (skeletonLoader) {
    return (
      <div className="drop-shadow-xl mt-5 border-t-2 px-5">
        <div className="mt-7 space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          <ImageSectionSkeleton />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyTitleSkeleton />
            <ContactInfoSkeleton />
          </div>

          <CategoryFormSkeleton />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MultiSelectServiceSkeleton />
            <PropertyLocationSkeleton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PropertySizeSkeleton />
            <ListingStatusSkeleton />
            <PropertyPriceSkeleton />
            <CurrencySkeleton />
          </div>

          <PropertyAddressSkeleton />

          <ButtonSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="drop-shadow-xl mt-5 border-t-2 px-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100 hover:border-green-400"
      >
        <ImageSection register={register} errors={errors} setValue={setValue} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyTitle register={register} errors={errors} />
          <ContactInfo register={register} control={control} errors={errors} />
        </div>

        <CategoryFrom register={register} errors={errors} setValue={setValue} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MultiSeclectService setValue={setValue} errors={errors} />
          <PropertyLocation register={register} errors={errors} watch={watch} setValue={setValue} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PropertySize register={register} errors={errors} />
          <ListingStatus errors={errors} setValue={setValue} />
          <PropertyPrice register={register} errors={errors} />
          <Currency value={watch("currency")} setValue={setValue} errors={errors} />
        </div>
        <div>
          <YearBuild control={control} />
        </div>
        <PropertyAddress register={register} errors={errors} />

        <Button className="h-10 px-4 w-full rounded-full bg-white text-green-500 hover:bg-green-500 hover:text-white border border-gray-300 hover:border-green-500 font-semibold transition">
          {buttonLoader ? <Loader className="animate-spin" /> : "Add Your Property"}
        </Button>
      </form>
    </div>
  );
}