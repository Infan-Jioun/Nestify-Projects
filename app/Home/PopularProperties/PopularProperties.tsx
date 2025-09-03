"use client";

import React, { useState } from "react";

import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";
import { Circles } from "react-loader-spinner";

export default function PopularProperties() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();
  const tabs = ["House", "Duplex", "Office Space", "Apartment"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  if (isLoading) {
    return (
      <p className="text-center py-6 text-4xl text-green-500 min-h-screen flex justify-center items-center animate-pulse">
       <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {error?.message}
      </p>
    );
  }

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];
  const filteredProperties = props.filter(
    (p) => p.category?.name === activeTab
  );

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
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
              className={`px-2 py-2 rounded-md border ${activeTab === tab
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
        {filteredProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
