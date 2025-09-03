"use client";

import React from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertiesTitle from "./PropertiesTitle/page";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";
import PropertyCard from "../components/PropertyCard/page";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";

export default function PropertiesPage() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>

        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
