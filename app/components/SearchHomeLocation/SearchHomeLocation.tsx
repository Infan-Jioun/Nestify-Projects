"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { bangladeshGeoData } from '@/lib/geo-data'
import { setQuery, setResults } from '@/app/features/SearchLocation/SearchLocationSlice'
import { setGeoCountryLocationLoading } from '@/app/features/loader/loaderSlice'
import { Circles } from "react-loader-spinner"

export default function SearchHomeLocation() {
    const dispatch = useDispatch<AppDispatch>()
    const { query, results } = useSelector((state: RootState) => state.searchLocation)
    const { geoCountryLocationLoading } = useSelector((state: RootState) => state.loader)
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setQuery(value))
        dispatch(setGeoCountryLocationLoading(true))
        setShowDropdown(true)

        if (value.trim() === "") {
            dispatch(setResults([]))
            dispatch(setGeoCountryLocationLoading(false))
            setShowDropdown(false)
            return
        }

        const searchValue = value.toLowerCase()
        const matches: string[] = []

        bangladeshGeoData.forEach((division) => {

            if (division.division.toLowerCase().includes(searchValue)) {
                matches.push(` ${division.division}`)
                division.districts.forEach((district) => {
                    matches.push(` ${district.district}, ${division.division}`)
                    district.upazilas.forEach((upazila) => {
                        matches.push(` ${upazila.upazila}, ${district.district}, ${division.division}`)
                        upazila.unions.forEach((union) => {
                            matches.push(` ${union}, ${upazila.upazila}, ${district.district}, ${division.division}`)
                        })
                    })
                })
            }


            division.districts.forEach((district) => {
                if (district.district.toLowerCase().includes(searchValue)) {
                    matches.push(` ${district.district}, ${division.division}`)
                    district.upazilas.forEach((upazila) => {
                        matches.push(` ${upazila.upazila}, ${district.district}, ${division.division}`)
                        upazila.unions.forEach((union) => {
                            matches.push(` ${union}, ${upazila.upazila}, ${district.district}, ${division.division}`)
                        })
                    })
                }


                district.upazilas.forEach((upazila) => {
                    if (upazila.upazila.toLowerCase().includes(searchValue)) {
                        matches.push(` ${upazila.upazila}, ${district.district}, ${division.division}`)
                        upazila.unions.forEach((union) => {
                            matches.push(` ${union}, ${upazila.upazila}, ${district.district}, ${division.division}`)
                        })
                    }

                    upazila.unions.forEach((union) => {
                        if (union.toLowerCase().includes(searchValue)) {
                            matches.push(` ${union}, ${upazila.upazila}, ${district.district}, ${division.division}`)
                        }
                    })
                })
            })
        })

        setTimeout(() => {
            dispatch(setResults(matches.slice(0, 100)))
            dispatch(setGeoCountryLocationLoading(false))
        }, 700)
    }

    const handleSelect = (item: string) => {
        dispatch(setQuery(item))
        dispatch(setResults([]))
        setShowDropdown(false)
    }


    const highlightMatch = (text: string, query: string) => {
        if (!query) return text
        const regex = new RegExp(`(${query})`, "gi")
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <span key={i} className=" font-semibold text-green-500">{part}</span>
            ) : (
                part
            )
        )
    }

    return (
        <div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <h2 className="text-xs font-semibold text-gray-900 mb-2">
                    Find your Home
                </h2>
                <div className="relative">
                    <Input
                        value={query}
                        onChange={handleSearch}
                        className={`px-8 py-2 w-full border rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 ${query.trim() !== "" ? "bg-green-50" : "bg-white"
                            }`}
                        type="search"
                        placeholder="Search by name or location..."
                    />

                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />

                    {geoCountryLocationLoading && (
                        <div className="absolute right-3 top-2">
                            <Circles
                                height="20"
                                width="20"
                                color="#22c55e"
                                ariaLabel="loading"
                            />
                        </div>
                    )}
                </div>

                {/* Dropdown */}
                {showDropdown && !geoCountryLocationLoading && query.trim() !== "" && (
                    <div className="relative">
                        <ul className="absolute z-10 mt-2 w-full max-h-96 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                            {results.length > 0 ? (
                                results.map((item, index) => (
                                    <li
                                        key={index}
                                        className="px-1 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                                        onClick={() => handleSelect(item)}
                                    >
                                        {highlightMatch(item, query)}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-sm text-gray-500 text-center">
                                    No location found
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
