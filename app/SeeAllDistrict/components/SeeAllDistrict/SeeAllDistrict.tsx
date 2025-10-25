"use client";

import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";

import Image from "next/image";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import Link from "next/link";
import { fetchDistrict } from "@/app/features/district/districtSlice";
import { DistrictInfo } from "@/lib/districtInfo";

export default function SeeAllDistrict() {
    const dispatch = useDispatch<AppDispatch>();
    const { district: districts, loading, error } = useSelector((state: RootState) => state.district);
    const { properties, loading: propertiesLoading } = useSelector(
        (state: RootState) => state.properties
    );

    useEffect(() => {
        dispatch(fetchDistrict());
        dispatch(fetchProperties());
    }, [dispatch]);

    const isLoading = propertiesLoading;

    // Properties count per district
    const propertiesCountMap = useMemo(() => {
        const map: Record<string, number> = {};
        if (!properties || !Array.isArray(properties)) return map;

        properties.forEach((property) => {
            const location = (property.geoCountryLocation || "").toString().toLowerCase().trim();
            districts.forEach((district: DistrictInfo) => {
                const districtNameLower = (district.districtName || "").toLowerCase();
                if (!districtNameLower) return; // 
                if (location.includes(districtNameLower)) {
                    map[districtNameLower] = (map[districtNameLower] || 0) + 1;
                }
            });
        });

        return map;
    }, [properties, districts]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300 mb-4">
                        Explore Our districts
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover properties in the most sought-after locations
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="animate-pulse">
                            <div className="w-full h-52 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded-full mb-3 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                            <div className="h-12 bg-gray-200 rounded-xl mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Unable to Load districts
                    </h3>
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchDistrict())}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300 mb-4">
                    Explore Our Districts
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover premium properties in the most sought-after locations around the world
                </p>
            </div>

            {/* districts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {districts.map((district, idx) => {
                    const districtKey = (district.districtName || "").toLowerCase();
                    return (
                        <div
                            key={districtKey || idx} // fallback key if name missing
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:scale-105"
                        >
                            {/* Image Container */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={typeof district.districtImage === "string" ? district.districtImage : "/placeholder-district.jpg"}
                                    alt={district.districtName || "District"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opadistrict-60"></div>

                                {/* district Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {district.districtName || "Unknown"}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                <div className="mb-4">
                                    <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                        {district.districtName || "Unknown"}
                                    </h3>
                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                        <Building2 className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            {propertiesCountMap[districtKey] ?? 0}{" "}
                                            {propertiesCountMap[districtKey] === 1
                                                ? "Property"
                                                : "Properties"}{" "}
                                            Available
                                        </span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                                        Explore premium real estate opportunities in {district.districtName || "this district"}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <Link href={`/DetailsDistrict/${district.districtName || ""}`}>
                                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group/btn">
                                        <span>View Properties</span>
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </button>
                                </Link>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </div>
                    );
                })}
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-12">
                <Link href={"/Contact"}>
                    <p className="text-gray-500 dark:text-gray-400">
                        {"Can't find your district?"}
                        <button className="text-green-500 hover:text-green-600 font-semibold underline underline-offset-4 transition-colors ml-2">
                            Contact our specialists
                        </button>
                    </p>
                </Link>
            </div>
        </div>
    );
}
