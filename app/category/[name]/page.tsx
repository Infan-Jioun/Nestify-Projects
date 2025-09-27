"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertiesByCategory } from "@/app/features/Properties/propertySlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";

interface CategoryPageProps {
  params: Promise<{ name: string }>;
}

export default function CategoryNamePage({ params }: CategoryPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector((state: RootState) => state.properties);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        const decodedName = decodeURIComponent(resolvedParams.name);
        setCategoryName(decodedName);
        dispatch(fetchPropertiesByCategory(decodedName));
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };

    loadData();
  }, [dispatch, params]);


  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border rounded-xl overflow-hidden shadow animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-xl overflow-hidden shadow animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-red-600 text-xl font-semibold mb-2">Error</h2>
            <p className="text-red-500">{error}</p>
            <Link href="/" className="inline-block mt-4">
              <Button variant="outline">Go Back Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Properties in {categoryName}
            </h1>
            <p className="text-gray-600">
              {properties.length} propert{properties.length !== 1 ? 'ies' : 'y'} found
            </p>
          </div>
          <Link href="/Properties" className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              View All Categories
            </Button>
          </Link>
        </div>

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-6">
                There are no properties available in the {categoryName} category at the moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/categories">
                  <Button>Browse All Categories</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Go Home</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}