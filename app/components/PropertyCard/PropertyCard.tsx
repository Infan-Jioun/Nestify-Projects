
"use client";

import React, { useState, useMemo } from "react";
import { PropertyType } from "@/app/Types/properties";
import { Button } from "@/components/ui/button";

import { FaBookmark, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteProperty } from "@/app/features/Properties/propertySlice";
import { toggleBookmark } from "@/app/features/bookmark/bookmarkSlice";
import DeleteConfirmation from "./DeletedConfirmation";
import Carousal from "../Carousal/Carousal";
import { useSession } from "next-auth/react";
import { UserRole } from "@/app/Types/auth";

interface PropertyCardProps {
  property: PropertyType;
  isLoading?: boolean;
  isError?: boolean;
  viewMode?: "grid" | "list";
  showDeveloperInfo?: boolean;
}

export default function PropertyCard({
  property,
  isLoading,
  isError,
  viewMode = "grid",
  showDeveloperInfo = true,
}: PropertyCardProps) {
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: session } = useSession();
  // Get bookmarked properties from Redux store
  const bookmarkedProperties = useAppSelector((state) => state.bookmarks.bookmarkedProperties);

  // Check if current property is bookmarked
  const isBookmarked = useMemo(() =>
    bookmarkedProperties.some(bookmarkedProperty => bookmarkedProperty._id === property._id),
    [bookmarkedProperties, property._id]
  );

  const handleDelete = () => {
    if (property._id) {
      dispatch(deleteProperty(property._id));
      setShowDeleteModal(false);
    }
  };

  const handleToggleBookmark = () => {
    dispatch(toggleBookmark(property));
  };

  if (isLoading) {
    return (
      <div className={cn(
        "border rounded-2xl shadow-md overflow-hidden bg-white animate-pulse",
        viewMode === "list" && "flex"
      )}>
        {viewMode === "list" && (
          <div className="w-64 h-48 bg-gray-200 flex-shrink-0" />
        )}
        <div className="p-4 flex-1">
          {viewMode === "grid" && (
            <div className="h-48 bg-gray-200 mb-4 rounded-lg" />
          )}
          <div className="h-5 bg-gray-200 mb-2 w-3/4 rounded" />
          <div className="h-4 bg-gray-200 mb-3 w-1/2 rounded" />
          <div className="h-3 bg-gray-200 mb-2 rounded" />
          <div className="h-3 bg-gray-200 w-2/3 rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border rounded-2xl shadow-md p-6 text-center text-red-500 bg-white">
        Failed to load property
      </div>
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
          {property.price?.toLocaleString()} {property.currency}
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
        <div className="flex gap-2">
          <p
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${property.listingStatus === "Sale"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
              }`}
          >
            {property.listingStatus}
          </p>
          <p
            className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${property.status === "Available"
              ? "bg-green-100 text-green-600"
              : property.status === "Sold"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
              }`}
          >
            {property.status}
          </p>
        </div>

        {/* Developer Info (Optional) */}
        {showDeveloperInfo && property.ownerId && (
          <div className="pt-3 border-t border-gray-200 mt-3">
            <p className="text-xs text-gray-500">
              Listed by Developer
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Link href={`/Properties/${property._id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <FaInfoCircle /> Details
            </Button>
          </Link>
          <Button
            variant={isBookmarked ? "secondary" : "ghost"}
            className="flex items-center justify-center"
            onClick={handleToggleBookmark}
          >
            <FaBookmark className={isBookmarked ? "text-yellow-500 fill-yellow-500" : "text-gray-500"} />
          </Button>
          {
            session?.user?.role === UserRole.ADMIN && (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            )
          }
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