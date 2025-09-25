"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import { PropertyType } from "@/app/Types/properties";

export default function DetailsDistrictProperty({ district }: { district: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  const filteredProperties = props.filter((p) =>
    p.geoCountryLocation?.toLowerCase().includes(district.toLowerCase())
  );

  if (error) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-xl font-bold mb-6 text-center">
        Properties in {district}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              isLoading={loading}
              isError={!!error}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No properties found for {district}.
          </p>
        )}
      </div>
    </div>
  );
}
