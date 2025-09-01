"use client";
import usePropertiesData from "@/hooks/usePropertiesData";

import { FilterSidebar } from "../FilterSidebar/FilterSidebar";
import { PropertyType } from "@/app/Types/properties";

export default function PropertyCard() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();
  console.log(properties);

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];


  return (
    <div>
      <FilterSidebar />


    </div>
  );
}
