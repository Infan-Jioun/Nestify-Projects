"use client";

import React, { useEffect } from "react";
import NextHead from "../components/NextHead/NextHead";

import PropertyCard from "../components/PropertyCard/PropertyCard";
import PropertiesTitle from "./PropertiesTitle/PropertiesTitle";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "../features/Properties/propertySlice";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector((state: RootState) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

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
          {loading && 
          <p className="col-span-full text-center py-10">Loading...</p>
          
          }

          {!loading && error && (
            <p className="col-span-full text-center text-red-500 py-10">{error}</p>
          )}

          {!loading && !error && properties.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-10">
              No properties found.
            </p>
          )}

          {!loading && !error &&
            properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isLoading={loading}
                isError={!!error}
               
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
