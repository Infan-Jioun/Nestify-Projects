"use client"
import { Input } from '@/components/ui/input'
import { bangladeshGeoData } from '@/lib/geo-data'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export interface District {
    district: string
    upazilas: string[]
}

export interface Division {
    division: string
    districts: District[]
}



export default function SearchHomeLocation() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<string[]>([])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if (value.trim() === "") {
            setResults([])
            return
        }

        const searchValue = value.toLowerCase()
        const matches: string[] = []

        bangladeshGeoData.forEach((division) => {
            // Division match
            if (division.division.toLowerCase().includes(searchValue)) {
                matches.push(division.division)
            }
            // Districts match
            division.districts.forEach((district) => {
                if (district.district.toLowerCase().includes(searchValue)) {
                    matches.push(`${district.district}, ${division.division}`)
                }
                // Upazilas match
                district.upazilas.forEach((upazila) => {
                    if (upazila.toLowerCase().includes(searchValue)) {
                        matches.push(`${upazila}, ${district.district}, ${division.division}`)
                    }
                })
            })
        })

        setResults(matches.slice(0, 15))
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
                        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        type="search"
                        placeholder="Search by name or location..."
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                </div>

                {results.length > 0 && (
                    <ul className="mt-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-sm bg-white">
                        {results.map((item, index) => (
                            <li
                                key={index}
                                className="px-3 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                                onClick={() => {
                                    setQuery(item)
                                    setResults([])
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
