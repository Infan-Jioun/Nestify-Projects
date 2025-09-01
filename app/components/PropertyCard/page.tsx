"use client";

import Image from "next/image";
import usePropertiesData from "@/hooks/usePropertiesData";
import { FilterSidebar } from "../FilterSidebar/FilterSidebar";
import { PropertyType } from "@/app/Types/properties";

export default function PropertyCard() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();

  if (isLoading) {
    return <p className="text-center py-6">Loading properties...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {error?.message}
      </p>
    );
  }

  const props: PropertyType[] = Array.isArray(properties) ? properties : [];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-1/4">
        <FilterSidebar />
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
        {props.map((property) => (
          <div
            key={property._id}
            className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition"
          >
            {/* Image with unoptimized flag */}
            {property.images && property.images.length > 0 ? (
              <Image
                src={property.images[0]}
                alt={property.title || "Property Image"}
                width={600}
                height={400}
                unoptimized
                className="w-full h-56 object-cover rounded-t-xl"
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            {/* Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                {property.address}, {property.district}
              </p>
              <p className="text-gray-800 font-bold mb-2">
                {property.price.toLocaleString()} {property.currency}
              </p>

              {/* Extra details */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                {property.bedrooms && <span>🛏 {property.bedrooms} Bed</span>}
                {property.bathrooms && <span>🛁 {property.bathrooms} Bath</span>}
                {property.kitchen && <span>🍳 {property.kitchen} Kitchen</span>}
                {property.propertySize && (
                  <span>📐 {property.propertySize} sq ft</span>
                )}
              </div>

              {/* Status */}
              <p
                className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${property.status === "Available"
                  ? "bg-green-100 text-green-600"
                  : property.status === "Sold"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                {property.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
