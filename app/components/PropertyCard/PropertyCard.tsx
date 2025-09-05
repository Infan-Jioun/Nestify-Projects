// components/PropertyCard/PropertyCard.tsx
"use client";

import React from "react";
import { PropertyType } from "@/app/Types/properties";
import Carousal from "../Carousal/Carousal";
import { Circles } from "react-loader-spinner";

type PropertyCardProps = {
  property: PropertyType;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown; 
};

export default function PropertyCard({
  property,
  isLoading,
  isError,
  error,
}: PropertyCardProps) {
  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  // Error State
  if (isError) {
    // Check if error is an Error object
    const message = error instanceof Error ? error.message : "Something went wrong";
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load properties: {message}
      </p>
    );
  }

  // Main Card
  return (
    <div>
      <div className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition">
        {property.images && property.images.length > 0 ? (
          <Carousal images={property.images} title={property.title} />
        ) : (
          <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
          <p className="text-gray-600 text-sm mb-1">
            {property.address}, {property.district}
          </p>
          <p className="text-green-500 font-semibold mb-2">
            {property.price.toLocaleString()} {property.currency}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {property.bedrooms && <span>{property.bedrooms} Bed</span>}
            {property.bathrooms && <span>{property.bathrooms} Bath</span>}
            {property.kitchen && <span>{property.kitchen} Kitchen</span>}
            {property.propertySize && <span>{property.propertySize} sq ft</span>}
          </div>

          <p
            className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${
              property.status === "Available"
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
    </div>
  );
}
