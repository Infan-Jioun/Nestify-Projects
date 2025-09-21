
"use client";
import React, { useEffect, useMemo } from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import PropertiesTitle from "./PropertiesTitle/PropertiesTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "../features/Properties/propertySlice";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  setSortOption,
  sortProperties,
  setCurrentPage,
  setItemsPerPage,
} from "../features/filter/filterSlice";
import Pagination from "../components/PropertyCard/Pagination/Pagination";


export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux states
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.properties
  );
  const {
    location,
    listingStatus,
    propertyType,
    currency,
    priceRange,
    bedrooms,
    bathrooms,
    squareFeat,
    yearBuild,
    otherFeatures,
    sortOption,
    sortedProperties,
    currentPage,
    itemsPerPage,
    totalPages,
  } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (properties.length > 0) {
      dispatch(sortProperties(properties));
    }
  }, [dispatch, properties, sortOption]);

  // Filtering
  const filterProperties = useMemo(() => {
    return sortedProperties.filter((property) => {
      if (
        location &&
        !property.geoCountryLocation
          .toLowerCase()
          .includes(location.toLowerCase())
      )
        return false;

      if (listingStatus !== "All" && property.listingStatus !== listingStatus) return false;
      if (currency !== "BDT" && property.currency !== currency) return false;

      if (
        propertyType.length > 0 &&
        !propertyType.includes(property.category.name)
      )
        return false;

      if (property.price < priceRange[0] || property.price > priceRange[1])
        return false;

      if (
        bedrooms !== "any" &&
        (property.bedrooms || 0) < parseInt(bedrooms)
      )
        return false;

      if (
        bathrooms !== "any" &&
        (property.bathrooms || 0) < parseInt(bathrooms)
      )
        return false;

      if (squareFeat[0] > 0 && (property.floorArea || 0) < squareFeat[0])
        return false;

      if (squareFeat[1] > 0 && (property.floorArea || 0) > squareFeat[1])
        return false;

      if (otherFeatures.length > 0) {
        const hasFeatures = otherFeatures.every((feature) =>
          property.propertyFacilities?.includes(feature)
        );
        if (!hasFeatures) return false;
      }

      return true;
    });
  }, [
    sortedProperties,
    location,
    listingStatus,
    currency,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    squareFeat,
    otherFeatures,
  ]);


  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filterProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filterProperties, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const handleItemsPerPageChange = (value: number) => {
    dispatch(setItemsPerPage(value));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(filterProperties.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      dispatch(setCurrentPage(newTotalPages));
    }
  }, [filterProperties.length, itemsPerPage, currentPage, dispatch]);

  return (
    <div className=" px-4 md:px-10 lg:px-20 xl:px-28">
      <NextHead title="Properties - Nestify" />

      {/* Container */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-2">
          <div className="md:hidden mb-4">
            <FilterSidebar />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filterProperties.length}</span>{" "}
              results
              {filterProperties.length > 0 && (
                <>
                  {" "}
                  (Page {currentPage} of {Math.ceil(filterProperties.length / itemsPerPage)})
                </>
              )}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort by:
              </label>

              <Select
                value={sortOption}
                onValueChange={(val) => dispatch(setSortOption(val))}
              >
                <SelectTrigger className="w-[200px] border-gray-300 focus:ring-green-500">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                  <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading &&
              [...Array(itemsPerPage)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg shadow-sm bg-white"
                >
                  <Skeleton height={180} className="mb-4 rounded-lg" />
                  <Skeleton width={`60%`} height={20} />
                  <Skeleton width={`40%`} height={15} />
                  <Skeleton count={2} />
                </div>
              ))}

            {!loading && error && (
              <p className="col-span-full text-center text-red-500 py-10">
                {error}
              </p>
            )}

            {!loading && !error && filterProperties.length === 0 && (
              <p className="col-span-full text-center text-gray-500 py-10">
                No properties found.
              </p>
            )}

            {!loading &&
              !error &&
              paginatedProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isLoading={loading}
                  isError={!!error}
                />
              ))}
          </div>

          {/* Pagination */}
          {!loading && filterProperties.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filterProperties.length / itemsPerPage)}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
}