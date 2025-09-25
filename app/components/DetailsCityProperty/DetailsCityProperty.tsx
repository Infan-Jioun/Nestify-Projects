"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "@/app/components/PropertyCard/PropertyCard";
import { PropertyType } from "@/app/Types/properties";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import { useSearchParams } from "next/navigation";

export default function DetailsCityProperty({ city }: { city: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { properties, loading, error } = useSelector(
        (state: RootState) => state.properties
    );

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    const props: PropertyType[] = Array.isArray(properties) ? properties : [];


    const filteredProperties = props.filter((p) =>
        p.geoCountryLocation?.toLowerCase().includes(city?.toLowerCase() || "")
    );

    const PropertyCardSkeleton = () => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );

    if (error) {
        return (
            <p className="text-center text-red-500 py-6">
                Failed to load properties: {error}
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-xl font-bold mb-6 text-center">
                Properties in {city}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => <PropertyCardSkeleton key={i} />)
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            isLoading={loading}
                            isError={!!error}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">
                        No properties found for {city}.
                    </p>
                )}
            </div>
        </div>
    );
}
