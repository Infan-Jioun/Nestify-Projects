"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { bangladeshGeoData } from "@/lib/geo-data";
import { setQuery, setResults } from "@/app/features/SearchLocation/SearchLocationSlice";
import { setGeoCountryLocationLoading } from "@/app/features/loader/loaderSlice";
import { Circles } from "react-loader-spinner";
import { setLocation } from "@/app/features/filter/filterSlice";


export default function SearchHomeLocation() {
    const dispatch = useDispatch<AppDispatch>();
    const { query, results } = useSelector((state: RootState) => state.searchLocation);
    const { geoCountryLocationLoading } = useSelector((state: RootState) => state.loader);

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            dispatch(setResults([]));
            setShowDropdown(false);
            return;
        }

        dispatch(setGeoCountryLocationLoading(true));

        const handler = setTimeout(() => {
            const searchValue = query.toLowerCase();
            const matches: string[] = [];

            bangladeshGeoData.forEach((division) => {
                if (division.division.toLowerCase().includes(searchValue)) {
                    matches.push(division.division);
                }

                division.districts.forEach((district) => {
                    const districtFull = `${district.district}, ${division.division}`;
                    if (district.district.toLowerCase().includes(searchValue)) {
                        matches.push(districtFull);
                    }

                    district.upazilas.forEach((upazila) => {
                        const upazilaFull = `${upazila.upazila}, ${district.district}, ${division.division}`;
                        if (upazila.upazila.toLowerCase().includes(searchValue)) {
                            matches.push(upazilaFull);
                        }


                        if (upazila.unions) {
                            upazila.unions.forEach((union) => {
                                const unionFull = `${union}, ${upazila.upazila}, ${district.district}, ${division.division}`;
                                if (union.toLowerCase().includes(searchValue)) {
                                    matches.push(unionFull);
                                }
                            });
                        }
                    });
                });
            });

            dispatch(setResults(matches.slice(0, 100)));
            setShowDropdown(true);
            dispatch(setGeoCountryLocationLoading(false));
        }, 300);

        return () => clearTimeout(handler);
    }, [query, dispatch]);

    const handleSelect = (item: string) => {
        dispatch(setLocation(item));
        dispatch(setQuery(item));
        dispatch(setResults([]));
        setShowDropdown(false);
    };

    const handleClear = () => {
        dispatch(setQuery(""));
        dispatch(setResults([]));
        dispatch(setLocation(""));
        setShowDropdown(false);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.split(regex).map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={i} className="font-semibold text-green-500">{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="relative">
            <Input
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                type="search"
                placeholder="Search by name or location..."
                onFocus={() => query.trim() && setShowDropdown(true)}
                className={`px-8 py-2 w-full border rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 ${query.trim() ? "bg-green-50" : "bg-white"}`}
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            {query && !geoCountryLocationLoading && (
                <FaTimes onClick={handleClear} className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-red-500" />
            )}
            {geoCountryLocationLoading && (
                <div className="absolute right-3 top-2">
                    <Circles height="20" width="20" color="#22c55e" ariaLabel="loading" />
                </div>
            )}
            {showDropdown && !geoCountryLocationLoading && results.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full max-h-96 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                    {results.map((item, index) => (
                        <li key={index} className="px-3 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer" onClick={() => handleSelect(item)}>
                            {highlightMatch(item, query)}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}