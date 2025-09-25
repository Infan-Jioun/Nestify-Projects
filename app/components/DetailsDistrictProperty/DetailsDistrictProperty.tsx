"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import { PropertyType } from "@/app/Types/properties";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";

export default function DetailsDistrictProperty({ district }: { district: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(setSkletonLoader(true));
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

  // Skeleton Loader component
  const renderSkeletonLoaders = () => {
    const count = 6;
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="border rounded-lg shadow-sm p-4 animate-pulse"
      >
        <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-xl font-bold mb-6 text-center">
        Properties in {district}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading || skletonLoader ? (
          renderSkeletonLoaders()
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
