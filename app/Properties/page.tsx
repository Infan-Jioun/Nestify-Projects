"use client";

import React, { useEffect, useState } from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import PropertiesTitle from "./PropertiesTitle/PropertiesTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "../features/Properties/propertySlice";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  const filterState = useSelector((state: RootState) => state.filter)
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);
  // Filter Properties
  const filterProperties = properties.filter((property) => {
    const { location, status, propertyType, priceRange, bedrooms, bathrooms, squareFeat, yearBuild, otherFeatures } = filterState;
    if (location && !property.geoCountryLocation.toLowerCase().includes(location.toLowerCase())) return false;
    if (status !== "All" && property.status !== status) return false;
    if (propertyType.length > 0 && !propertyType.includes(property.category.name)) return false;
    

    return true;
  })
  return (
    <div className="mt-20 px-4 md:px-10 lg:px-20 xl:px-28">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      {/* Container */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">

        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>


        <main className="flex-1">

          <div className="md:hidden mb-4">
            <FilterSidebar />
          </div>


          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">

            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filterProperties.length}</span>{" "}
              results
            </p>


            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="latest">Latest</option>
              </select>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <p className="col-span-full text-center py-10">Loading...</p>
            )}

            {!loading && error && (
              <p className="col-span-full text-center text-red-500 py-10">
                {error}
              </p>
            )}

            {!loading && !error && filterProperties.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">
                No properties found.
              </p>
            )}

            {!loading &&
              !error &&
              filterProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isLoading={loading}
                  isError={!!error}
                />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
