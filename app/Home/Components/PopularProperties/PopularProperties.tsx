"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import { PropertyType } from "@/app/Types/properties";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "@/app/features/Properties/propertySlice";

export default function PopularProperties() {
  const tabs = ["House", "Duplex", "Office Space", "Apartment"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

 
  const PropertyCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {error}
      </p>
    );
  }

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];
  const filteredProperties = props.filter(
    (p) => p.category?.name === activeTab
  );

  return (
    <div className="mt-6 px-4 md:px-20 lg:px-44">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl text-center sm:text-left font-bold mb-1">
            Discover Popular Properties
          </h2>
          <p className="text-gray-500 text-center sm:text-left">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>
        <div className="flex space-x-3 px-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-2 rounded-md border ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading ? (
        
          Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : filteredProperties.length > 0 ? (
          // Show actual properties when loaded
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
            No properties found for {activeTab}.
          </p>
        )}
      </div>
    </div>
  );
}