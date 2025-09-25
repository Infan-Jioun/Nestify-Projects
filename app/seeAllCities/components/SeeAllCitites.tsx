"use client";

import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchCities } from "@/app/features/city/citySlice";
import Image from "next/image";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import { CityInfo } from "@/lib/CityInfo";
import Link from "next/link";

export default function SeeAllCities() {
    const dispatch = useDispatch<AppDispatch>();
    const { city: cities, loading, error } = useSelector((state: RootState) => state.city);
    const { properties, loading: propertiesLoading } = useSelector(
        (state: RootState) => state.properties
    );

    useEffect(() => {
        dispatch(fetchCities());
        dispatch(fetchProperties());
    }, [dispatch]);
    const isLoading = propertiesLoading;
    const propertiesCountMap = useMemo(() => {
        const map: Record<string, number> = {};
        if (!properties || !Array.isArray(properties)) return map;
        properties.forEach((property) => {
            const location = (property.geoCountryLocation || "").toString().toLowerCase().trim();
            cities.forEach((city: CityInfo) => {
                const cityNameLower = city.cityName.toLowerCase();
                if (location.includes(cityNameLower)) {
                    map[cityNameLower] = (map[cityNameLower] || 0) + 1;
                }
            });
        })
        return map;
    }, [properties, cities]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300 mb-4">
                        Explore Our Cities
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
                        Unable to Load Cities
                    </h3>
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => dispatch(fetchCities())}
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
                    Explore Our Cities
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover premium properties in the most sought-after locations around the world
                </p>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cities.map((city) => (
                    <div
                        key={city.cityName}
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:scale-105"
                    >
                        {/* Image Container */}
                        <div className="relative h-52 overflow-hidden">
                            <Image
                                src={typeof city.cityImage === "string" ? city.cityImage : "/placeholder-city.jpg"}
                                alt={city.cityName}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                            {/* City Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {city.cityName}
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                            <div className="mb-4">
                                <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                    {city.cityName}
                                </h3>
                                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                        {propertiesCountMap[city.cityName.toLowerCase()] ?? 0}{" "}
                                        {propertiesCountMap[city.cityName.toLowerCase()] === 1
                                            ? "Property"
                                            : "Properties"}{" "}
                                        Available
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                                    Explore premium real estate opportunities in {city.cityName}
                                </p>
                            </div>

                            {/* Action Button */}
                            <Link href={`/DetailsCity/${city.cityName}`}>
                                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group/btn">
                                    <span>View Properties</span>
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                </button>
                            </Link>
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Footer CTA */}           <div className="text-center mt-12">
                <p className="text-gray-500 dark:text-gray-400">
                    {"Can't find your city?"}
                    <button className="text-green-500 hover:text-green-600 font-semibold underline underline-offset-4 transition-colors">
                        Contact our specialists
                    </button>
                </p>
            </div>
        </div>
    );
}