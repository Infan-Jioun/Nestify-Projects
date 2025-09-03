"use client";

import React from "react";
import { PropertyType } from "@/app/Types/properties";
import Carousal from "../Carousal/Carousal";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/lib/store";

type PropertyCardProps = {
  property?: PropertyType;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  // Redux slice থেকে skeleton loading state
  const { skeletonLoading } = useSelector((state: RootState) => state.skeleton);

  if (skeletonLoading || !property) {
    return (
      <div className="border rounded-2xl p-4 shadow-md bg-white">
        <Skeleton />
        <Skeleton className="mt-3" />
        <Skeleton className="mt-1" />
        <Skeleton className="mt-1" />
        <Skeleton className="mt-3" />
      </div>
    );
  }

  return (
    <div className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition">
      {/* Image Carousel */}
      {property.images && property.images.length > 0 ? (
        <Carousal images={property.images} title={property.title} />
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
        <p className="text-green-500 font-semibold mb-2">
          {property.price.toLocaleString()} {property.currency}
        </p>

        {/* Extra details */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {property.bedrooms && <span>{property.bedrooms} Bed</span>}
          {property.bathrooms && <span>{property.bathrooms} Bath</span>}
          {property.kitchen && <span>{property.kitchen} Kitchen</span>}
          {property.propertySize && <span>{property.propertySize} sq ft</span>}
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
  );
}
