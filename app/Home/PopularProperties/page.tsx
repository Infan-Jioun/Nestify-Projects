"use client";

import Carousal from "@/app/components/Carousal/Carousal";
import { PropertyType } from "@/app/Types/properties";
import usePropertiesData from "@/hooks/usePropertiesData";
import { useState } from "react";
import { FiHeart, FiPlus, FiShare } from "react-icons/fi";
import { TbBuildingBurjAlArab } from "react-icons/tb";

export default function PopularProperties() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();

  const tabs = ["House", "Duplex", "Office Space", "Apartment"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  if (isLoading) {
    return (
      <p className="text-center py-6 text-4xl text-green-500 min-h-screen flex justify-center items-center animate-pulse">
        <TbBuildingBurjAlArab />
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
          <div
            key={property._id} // MongoDB _id ব্যবহার
            className="relative overflow-hidden group rounded-xl shadow border"
          >
            {/* Image */}
            {property.images && property.images.length > 0 ? (
              <Carousal images={property.images} title={property.title} />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            {/* Top Right Icons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button className="bg-white p-2 rounded-full shadow hover:bg-red-100">
                <FiHeart className="text-xl text-green-500" />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiPlus className="text-xl text-green-500" />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiShare className="text-xl text-green-500" />
              </button>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm px-4 py-3 z-10 flex justify-between items-center text-white">
              <div>
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm">{property.address}</p>
              </div>
              <div className="bg-white text-black font-semibold px-3 py-1 rounded-2xl hover:bg-black hover:text-white transition">
                {property.price} BDT
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
