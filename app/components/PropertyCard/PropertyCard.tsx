"use client";

import React, { useState } from "react";
import { PropertyType } from "@/app/Types/properties";
import Carousal from "../Carousal/Carousal";
import { Circles } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { deleteProperty } from "@/app/features/Properties/propertySlice";
import { AppDispatch } from "@/lib/store";
import DeleteConfirmation from "./DeletedConfirmation";

type PropertyCardProps = {
  property: PropertyType;
  isLoading?: boolean;
  isError?: boolean;
};

export default function PropertyCard({ property, isLoading, isError }: PropertyCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (property._id) {
      dispatch(deleteProperty(property._id));
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" visible />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500 py-6">Failed to load property</p>;
  }

  return (
    <div className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition relative">
      {property.images?.length > 0 ? (
        <Carousal images={property.images} title={property.title} />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
        <p className="text-gray-600 text-sm mb-1">
          {property.address}, {property.geoCountryLocation}
        </p>
        <p className="text-green-500 font-semibold mb-2">
          {property.price.toLocaleString()} {property.currency}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {property.bedrooms && <span>{property.bedrooms} Bed</span>}
          {property.bathrooms && <span>{property.bathrooms} Bath</span>}
          {property.kitchen && <span>{property.kitchen} Kitchen</span>}
          {property.propertySize && <span>{property.propertySize} sqft</span>}
          {property.floorArea && <span>{property.floorArea} sqft</span>}
          {property.parkingSpaces && <span>{property.parkingSpaces} Parking</span>}
          {property.roomsSections && <span>{property.roomsSections} Rooms</span>}
        </div>

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

        <Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
      </div>

      {showDeleteModal && (
        <DeleteConfirmation
          name={property.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
