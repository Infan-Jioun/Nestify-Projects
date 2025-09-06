"use client";

import React from "react";
import NextHead from "../components/NextHead/NextHead";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";
import PropertiesTitle from "./PropertiesTitle/PropertiesTitle";

export default function PropertiesPage() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();
  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>

        {/* Properties list */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          ))}

          {/* যদি কোনো property না থাকে */}
          {!isLoading && !isError && props.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-10">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
