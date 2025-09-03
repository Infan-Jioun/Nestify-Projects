"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "@/app/components/PropertyCard/page";
import usePropertiesData from "@/hooks/usePropertiesData";
import { PropertyType } from "@/app/Types/properties";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setSkeletonLoading } from "@/app/features/skeleton/skeletonSlice";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularProperties() {
  const dispatch = useDispatch();
  const { skeletonLoading } = useSelector((state: RootState) => state.skeleton);

  const { data: properties, isLoading, isError, error } = usePropertiesData();
  const tabs = ["House", "Duplex", "Office Space", "Apartment"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // Sync loading with Redux skeleton slice
  useEffect(() => {
    dispatch(setSkeletonLoading(isLoading));
  }, [isLoading, dispatch]);

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
        {skeletonLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-2xl p-4 shadow-md bg-white">
                  <Skeleton height={200} />
                  <Skeleton count={3} className="mt-3" />
                </div>
              ))
          : filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
      </div>
    </div>
  );
}
