"use client";
import usePropertiesData from "@/hooks/usePropertiesData";
import { FilterSidebar } from "../FilterSidebar/FilterSidebar";
import { PropertyType } from "@/app/Types/properties";
import Carousal from "../Carousal/Carousal";
import { TbBuildingBurjAlArab } from "react-icons/tb";

export default function PropertyCard() {
  const { data: properties, isLoading, isError, error } = usePropertiesData();

  if (isLoading) {
    return <p className="text-center py-6 text-4xl text-green-500 min-h-screen flex justify-center items-center animate-pulse"><TbBuildingBurjAlArab /></p>;
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
    <div className=" gap-6">
      {/* Sidebar */}
      <div className="">
        <FilterSidebar />
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {props.map((property) => (
          <div
            key={property._id}
            className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition"
          >
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
