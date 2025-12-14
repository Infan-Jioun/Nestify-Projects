"use client"

import React, { useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

interface SimplePropertyLocationProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const SimplePropertyLocation: React.FC<SimplePropertyLocationProps> = ({
    value,
    onChange,
    error
}) => {
    const [localQuery, setLocalQuery] = useState(value)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setLocalQuery(newValue)
        onChange(newValue)

        if (newValue.trim()) {
            setIsLoading(true)
            setShowDropdown(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        } else {
            setShowDropdown(false)
            setIsLoading(false)
        }
    }

    const handleSelectLocation = (location: string) => {
        setLocalQuery(location)
        onChange(location)
        setShowDropdown(false)
    }

    return (
        <div className="p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <label className="mb-2 block text-gray-700 text-xs sm:text-sm">
                Search Your Property Location
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={localQuery}
                    onChange={handleInputChange}
                    className="px-8 sm:px-10 py-2 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm sm:text-base"
                    placeholder="Search by name or location..."
                />
                <div className="absolute left-3 top-2.5 text-gray-500">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                {isLoading && (
                    <div className="absolute right-3 top-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-green-500" />
                    </div>
                )}
            </div>

            {showDropdown && !isLoading && localQuery.trim() && (
                <div className="relative">
                    <div className="absolute z-10 mt-2 w-full max-h-48 sm:max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white">
                        <div
                            className="px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                            onClick={() => handleSelectLocation(localQuery)}
                        >
                            Use: <span className="font-semibold">{localQuery}</span>
                        </div>
                        <div className="px-3 py-2 text-xs sm:text-sm text-gray-500 border-t">
                            Continue typing for more suggestions...
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
        </div>
    )
}

export default SimplePropertyLocation