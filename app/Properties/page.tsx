"use client";
import React, { useEffect, useMemo, useState } from "react";
import NextHead from "../components/NextHead/NextHead";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "../features/Properties/propertySlice";
import { FilterSidebar } from "../components/FilterSidebar/FilterSidebar";
import Skeleton from "react-loading-skeleton";

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
  clearFilters,
} from "../features/filter/filterSlice";
import Pagination from "../components/PropertyCard/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, List, MapPin, Home, FilterX, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchDistrict } from "../features/district/districtSlice";
import CountUp from "../Home/Components/BannerServices/CountUp";

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { district: districts } = useSelector((state: RootState) => state.district);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isScrolled, setIsScrolled] = useState(false);

  // Redux states
  const { properties, loading, error } = useSelector((state: RootState) => state.properties
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
    dispatch(fetchDistrict());
  }, [dispatch]);

  useEffect(() => {
    if (properties.length > 0) {
      dispatch(sortProperties(properties));
    }
  }, [dispatch, properties, sortOption]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      if (currency !== "All" && property.currency !== currency) return false;

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


      const propertyYear = property.yearBuild || (property.createdAt ? new Date(property.createdAt).getFullYear() : new Date().getFullYear());

      if (yearBuild[0] > 0 && propertyYear < yearBuild[0]) return false;
      if (yearBuild[1] > 0 && propertyYear > yearBuild[1]) return false;

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
    yearBuild,
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

  const handleClearAllFilters = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(filterProperties.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      dispatch(setCurrentPage(newTotalPages));
    }
  }, [filterProperties.length, itemsPerPage, currentPage, dispatch]);

  // Check if any filters are applied
  const areFiltersApplied = useMemo(() => {
    return (
      location !== "" ||
      listingStatus !== "All" ||
      currency !== "All" ||
      propertyType.length > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 10000000 ||
      bedrooms !== "any" ||
      bathrooms !== "any" ||
      squareFeat[0] > 0 ||
      squareFeat[1] > 0 ||
      yearBuild[0] > 2000 ||
      yearBuild[1] < new Date().getFullYear() ||
      otherFeatures.length > 0
    );
  }, [
    location,
    listingStatus,
    currency,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    squareFeat,
    yearBuild,
    otherFeatures,
  ]);

  return (
    <div className="min-h-screen">
      <NextHead title="Properties - Nestify" />

      <div className={cn(
        "relative py-32 px-0 lg:px-[137px]  bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden",
        isScrolled ? "py-4" : "py-10"
      )}>
        <div className="absolute  w-40 h-40 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="px-4 md:px-8 lg:px-12 xl:px-12">
          <h1 className={cn(
            "font-bold transition-all duration-300",
            isScrolled ? "text-2xl" : "text-4xl"
          )}>Find Your Dream Property</h1>
          <p className={cn(
            " mt-2 max-w-2xl transition-all duration-300",
            isScrolled ? "text-sm opacity-0 h-0" : "opacity-100"
          )}>
            Discover premium real estate options tailored to your preferences from our curated collection
          </p>

          {/* Stats bar */}
          <div className={cn(
            "flex flex-wrap gap-6 mt-8 pt-4 border-t border-green-700 transition-all duration-300",
            isScrolled ? "opacity-0 h-0 mt-0 pt-0 overflow-hidden" : "opacity-100"
          )}>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg">
                <Home size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CountUp
                    from={0}
                    to={properties.length}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-xl lg:text-2xl font-bold"
                  />
                  <p className="text-2xl font-semibold">+</p>
                </div>
                <p className=" text-sm">Properties</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg">
                <MapPin size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CountUp
                    from={0}
                    to={districts.length}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-xl lg:text-2xl font-bold"
                  />
                  <p className="text-2xl font-semibold">+</p>
                </div>
                <p className=" text-sm">Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-12 py-8 -mt-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm border">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-white text-gray-800 border-gray-300 hover:bg-gray-50 shadow-sm w-full justify-between"
          >
            <div className="flex items-center">
              <SlidersHorizontal size={16} className="mr-2" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
              {areFiltersApplied && (
                <span className="h-2 w-2 rounded-full bg-green-600 ml-2"></span>
              )}
            </div>
            {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className={cn(
            "transition-all duration-300 overflow-hidden",
            isFilterOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100",
            "md:w-1/4 lg:w-[400px]"
          )}>
            <div className="sticky top-24 bg-white rounded-xl shadow-lg border p-6 mb-6 md:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white bg-green-600 px-2 py-1 rounded-full">
                    {filterProperties.length}
                  </span>
                  {areFiltersApplied && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllFilters}
                      className="h-8 text-gray-500 hover:text-gray-700"
                    >
                      <FilterX size={14} className="mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filterProperties.length}</span> properties found
                  {filterProperties.length > 0 && (
                    <span className="text-gray-500">
                      {" "}(Page {currentPage} of {Math.ceil(filterProperties.length / itemsPerPage)})
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle (Desktop) */}
                <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 rounded-md"
                  >
                    <Grid3X3 size={14} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 rounded-md"
                  >
                    <List size={14} />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                    Sort by:
                  </label>
                  <Select
                    value={sortOption}
                    onValueChange={(val) => dispatch(setSortOption(val))}
                  >
                    <SelectTrigger className="w-[180px] border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-lg">
                      <SelectValue placeholder="Select sort option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Recommended</SelectItem>
                      <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                      <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
                      <SelectItem value="latest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            <div className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-6"
            )}>
              {loading &&
                [...Array(itemsPerPage)].map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 border rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md",
                      viewMode === "list" && "flex gap-4"
                    )}
                  >
                    {viewMode === "list" && (
                      <Skeleton width={240} height={200} className="rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      {viewMode === "grid" && (
                        <Skeleton height={200} className="mb-4 rounded-lg" />
                      )}
                      <Skeleton width={`60%`} height={20} className="mb-2" />
                      <Skeleton width={`40%`} height={15} className="mb-3" />
                      <Skeleton count={2} height={12} className="mb-1" />
                      {viewMode === "list" && (
                        <div className="mt-4 flex gap-2">
                          <Skeleton width={80} height={24} />
                          <Skeleton width={80} height={24} />
                          <Skeleton width={80} height={24} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {!loading && error && (
                <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border">
                  <div className="text-red-500 text-lg font-semibold mb-2">
                    Oops! Something went wrong
                  </div>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <Button
                    onClick={() => dispatch(fetchProperties())}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {!loading && !error && filterProperties.length === 0 && (
                <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border">
                  <div className="text-gray-300 text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Try adjusting your search filters or browse our full catalog
                  </p>
                  {areFiltersApplied && (
                    <Button
                      onClick={handleClearAllFilters}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <FilterX size={16} className="mr-2" />
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}

              {!loading &&
                !error &&
                paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isLoading={loading}
                    isError={!!error}
                    viewMode={viewMode}
                  />
                ))}
            </div>

            {/* Pagination */}
            {!loading && filterProperties.length > 0 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filterProperties.length / itemsPerPage)}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}