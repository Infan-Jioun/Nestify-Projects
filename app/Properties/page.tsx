"use client";

import React, { useEffect } from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertiesTitle from "./PropertiesTitle/page";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";
import PropertyCard from "../components/PropertyCard/page";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setSkeletonLoading } from "@/app/features/skeleton/skeletonSlice";

export default function PropertiesPage() {
  const dispatch = useDispatch();
  const { skeletonLoading } = useSelector((state: RootState) => state.skeleton);

  const { data: properties, isLoading, isError, error } = usePropertiesData();

  // Sync loading with Redux skeleton slice
  useEffect(() => {
    dispatch(setSkeletonLoading(isLoading));
  }, [isLoading, dispatch]);

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {error?.message}
      </p>
    );
  }

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>

        {/* Property Cards Grid */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonLoading
            ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="border rounded-2xl p-4 flex justify-center items-center min-h-[300px] bg-white shadow-md"
                >
                  <Circles
                    height="60"
                    width="60"
                    color="#4fa94d"
                    ariaLabel="loading"
                    visible={true}
                  />
                </div>
              ))
            : props.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
        </div>
      </div>
    </div>
  );
}
