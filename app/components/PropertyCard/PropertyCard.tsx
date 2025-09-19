"use client";

import React, { useState } from "react";
import { PropertyType } from "@/app/Types/properties";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { deleteProperty } from "@/app/features/Properties/propertySlice";
import { AppDispatch } from "@/lib/store";
import DeleteConfirmation from "./DeletedConfirmation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Carousal from "../Carousal/Carousal";

type PropertyCardProps = {
  property: PropertyType;
  isLoading?: boolean;
  isError?: boolean;
};

export default function PropertyCard({
  property,
  isLoading,
  isError,
}: PropertyCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleDelete = () => {
    if (property._id) {
      dispatch(deleteProperty(property._id));
      setShowDeleteModal(false);
    }
  };

  const toggleBookmark = () => setBookmarked(!bookmarked);

  if (isLoading) {
    return (
      <div className="border rounded-2xl shadow-md overflow-hidden bg-white animate-pulse">
        <Skeleton height={224} />
        <div className="p-4">
          <Skeleton height={20} width="60%" className="mb-2" />
          <Skeleton height={15} width="40%" className="mb-2" />
          <Skeleton height={20} width="30%" className="mb-3" />
          <Skeleton count={3} height={15} className="mb-2" />
          <Skeleton height={36} width="100%" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">Failed to load property</p>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.3 }}
      className="border rounded-2xl shadow-md overflow-hidden bg-white relative"
    >
      {/* Carousel */}
      <Carousal images={property.images || []} title={property.title} />

      <div className="p-4 relative">
        {/* Price */}
        <p className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-lg shadow">
          {property.price.toLocaleString()} {property.currency}
        </p>

        {/* Title & Address */}
        <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
        <p className="text-gray-600 text-sm mb-3">
          {property.address}, {property.geoCountryLocation}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
          {property.bedrooms && (
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
              {property.bedrooms} Bed
            </span>
          )}
          {property.bathrooms && (
            <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded">
              {property.bathrooms} Bath
            </span>
          )}
          {property.kitchen && (
            <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded">
              {property.kitchen} Kitchen
            </span>
          )}
          {property.propertySize && (
            <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded">
              {property.propertySize} sqft
            </span>
          )}
          {property.floorArea && (
            <span className="px-2 py-1 bg-teal-50 text-teal-600 rounded">
              {property.floorArea} sqft
            </span>
          )}
          {property.parkingSpaces && (
            <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
              {property.parkingSpaces} Parking
            </span>
          )}
          {property.roomsSections && (
            <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded">
              {property.roomsSections} Rooms
            </span>
          )}
        </div>

        {/* Status */}
        <p
          className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
            property.status === "Available"
              ? "bg-green-100 text-green-600"
              : property.status === "Sold"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {property.status}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <FaInfoCircle /> Details
          </Button>
          <Button
            variant={bookmarked ? "secondary" : "ghost"}
            className="flex items-center justify-center"
            onClick={toggleBookmark}
          >
            <FaBookmark className={bookmarked ? "text-yellow-500" : ""} />
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteConfirmation
          name={property.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </motion.div>
  );
}
