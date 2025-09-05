"use client";

import React, { useState, useMemo } from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";
import PropertiesTitle from "./PropertiesTitle/PropertiesTitle";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";


export default function PropertiesPage() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();
  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    listingStatus: "All",
    propertyTypes: ["All"],
    priceRange: [0, 100],
    bedrooms: "any",
    bathrooms: "any",
    minSqFt: "",
    maxSqFt: "",
    minYear: "",
    maxYear: "",
    features: [] as string[],
  });

  const updateFilter = <K extends keyof typeof filters>(key: K, value: typeof filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredProperties = useMemo(() => {
    return props.filter((p) => {
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.location !== "all" && p.district !== filters.location) return false;
      if (filters.listingStatus !== "All" && filters.listingStatus !== p.status) return false;
      if (!filters.propertyTypes.includes("All") && !filters.propertyTypes.includes(p.category.name)) return false;
      if (p.price < filters.priceRange[0] * 100 || p.price > filters.priceRange[1] * 100) return false;

      if (filters.bedrooms !== "any" && p.bedrooms) {
        const minBeds = parseInt(filters.bedrooms.replace("+", ""));
        if (p.bedrooms < minBeds) return false;
      }

      if (filters.bathrooms !== "any" && p.bathrooms) {
        const minBaths = parseInt(filters.bathrooms.replace("+", ""));
        if (p.bathrooms < minBaths) return false;
      }

      if (filters.minSqFt && p.propertySize < parseInt(filters.minSqFt)) return false;
      if (filters.maxSqFt && p.propertySize > parseInt(filters.maxSqFt)) return false;

      if (filters.minYear && p.createdAt && new Date(p.createdAt).getFullYear() < parseInt(filters.minYear)) return false;
      if (filters.maxYear && p.createdAt && new Date(p.createdAt).getFullYear() > parseInt(filters.maxYear)) return false;

      if (filters.features.length > 0) {
        const missingFeature = filters.features.some(f => !p.facilities?.includes(f));
        if (missingFeature) return false;
      }

      return true;
    });
  }, [props, filters]);

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/4">
          <FilterSidebar
            filters={filters}
            onFilterChange={updateFilter}
          />
        </div>

        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500 col-span-full">
              Failed to load properties: {error?.message}
            </p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No properties found.
            </p>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
