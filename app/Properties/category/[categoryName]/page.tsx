"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertiesByCategory } from "@/app/features/Properties/propertySlice";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";

export default function CategoryPropertiesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const categoryName = params.categoryName as string;

    const { properties, loading, error } = useSelector(
        (state: RootState) => state.properties
    );

    useEffect(() => {
        if (categoryName) {
            dispatch(fetchPropertiesByCategory(decodeURIComponent(categoryName)));
        }
    }, [categoryName, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 py-8">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Properties in {decodeURIComponent(categoryName)}
                </h1>
                <p className="text-gray-600">
                    Found {properties.length} properties in this category
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        viewMode="grid"
                    />
                ))}
            </div>

            {properties.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No properties found in this category.
                    </p>
                </div>
            )}
        </div>
    );
}