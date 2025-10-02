"use client"
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProperties } from '../features/Properties/propertySlice'
import { PropertyType } from '@/app/Types/properties'
import { AppDispatch, RootState } from '@/lib/store'
import PropertyCard from '../components/PropertyCard/PropertyCard'
import { cn } from "@/lib/utils";
import NextHead from '../components/NextHead/NextHead'
export default function OfficeSpacePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { properties, loading, error } = useSelector((state: RootState) => state.properties)
  const [officeSpaceProperties, setOfficeSpaceProperties] = useState<PropertyType[]>([])
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  useEffect(() => {
    const officeSpaces = properties.filter(property =>
      property.category?.name?.toLowerCase() === 'office space'
    )
    setOfficeSpaceProperties(officeSpaces)
  }, [properties])
  const PropertyCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-8 bg-gray-300 rounded w-8"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <NextHead title="office Space - Nestify" />
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


        </div>
      </div>

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Properties</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => dispatch(fetchProperties())}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && officeSpaceProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No office Space Properties Found</h2>
                <p className="text-gray-600 mb-6">
                  {"We couldn't find any office Space properties matching your criteria."}
                </p>
                <button
                  onClick={() => dispatch(fetchProperties())}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Refresh Properties
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {!loading && !error && officeSpaceProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officeSpaceProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}


        </div>
      </main>

    </div>
  )
}