"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationFilter } from "../LocationFilter/LocationFilter";
import BedroomBathroomFilter from "../BedroomBathroomFilter/BedroomBathroomFilter";
import SquareComponents from "../SquareComponents/SquareComponents";
import YearBuildFilter from "../YearBuildFilter/YearBuildFilter";
import OtherFeatures from "../OhterFeatures/OhterFeatures";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PriceFilter from "../PriceFilter/PriceFilter";

interface FilterState {
    search: string;
    location: string;
    listingStatus: string;
    propertyTypes: string[];
    priceRange: number[];
    bedrooms: string;
    bathrooms: string;
    minSqFt: string;
    maxSqFt: string;
    minYear: string;
    maxYear: string;
    features: string[];
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    const handlePropertyTypeChange = (type: string, checked: boolean) => {
        if (type === "All") {
            onFilterChange("propertyTypes", checked ? ["All"] : []);
        } else {
            const current = filters.propertyTypes.filter(t => t !== "All");
            const newTypes = checked ? [...current, type] : current.filter(t => t !== type);
            onFilterChange("propertyTypes", newTypes.length > 0 ? newTypes : ["All"]);
        }
    };

    const handleReset = () => {
        onFilterChange("search", "");
        onFilterChange("location", "all");
        onFilterChange("listingStatus", "All");
        onFilterChange("propertyTypes", ["All"]);
        onFilterChange("priceRange", [0, 100]);
        onFilterChange("bedrooms", "any");
        onFilterChange("bathrooms", "any");
        onFilterChange("minSqFt", "");
        onFilterChange("maxSqFt", "");
        onFilterChange("minYear", "");
        onFilterChange("maxYear", "");
        onFilterChange("features", []);
    };

    return (
        <div className="space-y-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            {/* Search */}
            <Input
                type="search"
                placeholder="Search by name or location..."
                value={filters.search}
                onChange={e => onFilterChange("search", e.target.value)}
                className="mb-4 w-full"
            />

            {/* Location */}
            <LocationFilter
                value={filters.location}
                onChange={val => onFilterChange("location", val)}
            />

            {/* Listing Status */}
            <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Listing Status</p>
                <RadioGroup
                    value={filters.listingStatus}
                    onValueChange={val => onFilterChange("listingStatus", val)}
                    className="space-y-2"
                >
                    {["All", "Buy", "Rent"].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                            <RadioGroupItem value={status} id={status} />
                            <Label htmlFor={status}>{status}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Property Type */}
            <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Property Type</p>
                {["All", "Houses", "Apartments", "Office", "Villa"].map(type => (
                    <div key={type} className="flex gap-2 items-center">
                        <Checkbox
                            id={type}
                            checked={filters.propertyTypes.includes(type)}
                            onCheckedChange={checked => handlePropertyTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={type}>{type}</Label>
                    </div>
                ))}
            </div>

            {/* Price Range */}
            <div className="mt-4">
               
                <PriceFilter
                    priceRange={filters.priceRange as [number, number]}
                    onPriceChange={(val) => onFilterChange("priceRange", val)}
                />

            </div>

            {/* Bedroom & Bathroom */}
            <BedroomBathroomFilter
                bedrooms={filters.bedrooms}
                bathrooms={filters.bathrooms}
                onBedroomsChange={val => onFilterChange("bedrooms", val)}
                onBathroomsChange={val => onFilterChange("bathrooms", val)}
            />

            {/* Square Feet */}
            <SquareComponents
                minSqFt={filters.minSqFt}
                maxSqFt={filters.maxSqFt}
                onMinSqFtChange={val => onFilterChange("minSqFt", val)}
                onMaxSqFtChange={val => onFilterChange("maxSqFt", val)}
            />

            {/* Year Built */}
            <YearBuildFilter
                minYear={filters.minYear}
                maxYear={filters.maxYear}
                onMinYearChange={val => onFilterChange("minYear", val)}
                onMaxYearChange={val => onFilterChange("maxYear", val)}
            />

            {/* Other Features */}
            <OtherFeatures
                selectedFeatures={filters.features}
                onFeaturesChange={val => onFilterChange("features", val)}
            />

            {/* Reset Button */}
            <Button onClick={handleReset} className="w-full bg-green-500 hover:bg-green-600 text-white mt-4">
                Reset Filters
            </Button>
        </div>
    );
}
