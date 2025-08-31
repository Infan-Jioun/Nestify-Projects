"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiPlus, FiShare } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import usePropertiesData, { PropertyType } from "@/hooks/usePropertiesData";
import { FilterSidebar } from "../FilterSidebar/FilterSidebar";

export default function PropertyCard() {
  const [activeTab, setActiveTab] = useState<string>("House / Villa");

  const { data: properties, isLoading, isError, error } = usePropertiesData();

  if (isLoading) return <p className="text-center mt-10">Loading properties...</p>;
  if (isError) {
    const err = error as Error;
    return <p className="text-center mt-10">Error: {err.message}</p>;
  }

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  const filteredProperties = props.filter(
    (p) => p.category?.name === activeTab
  );

  return (
    <div>
      <FilterSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredProperties.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No properties found for {activeTab}.
          </p>
        )}

        {filteredProperties.map((property) => (
          <div
            key={property._id ?? Math.random()}
            className="relative overflow-hidden group rounded-xl shadow border"
          >
            {/* Image */}
            <Image
              src={property.images?.[0] ?? "/placeholder.jpg"}
              alt={property.title ?? "Property"}
              width={500}
              height={500}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {/* Top Right Icons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <Button className="bg-white p-2 rounded-full shadow hover:bg-red-100">
                <FiHeart className="text-xl text-green-500" />
              </Button>
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiPlus className="text-xl text-green-500" />
              </Button>
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiShare className="text-xl text-green-500" />
              </Button>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm px-4 py-3 z-10 flex flex-col gap-2 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{property.title ?? ""}</h3>
                  <p className="text-sm">
                    {property.address ?? ""}, {property.district ?? ""}
                  </p>
                  <p className="text-sm">Category: {property.category?.name ?? ""}</p>
                </div>
                <div className="bg-white text-black font-semibold px-3 py-1 rounded-2xl hover:bg-black hover:text-white transition">
                  {property.price ?? ""} {property.currency ?? ""}
                </div>
              </div>

              <ul className="text-sm mt-2 space-y-1">
                {property.category?.fields?.map((f, idx) => (
                  <li key={f.name ?? idx}>
                    {f.name ?? ""}: {f.value ?? ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
