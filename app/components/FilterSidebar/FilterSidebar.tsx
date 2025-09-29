"use client";

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { IoFilterOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import BedroomBathroomFilter from "../BedroomBathroomFilter/BedroomBathroomFilter";
import OtherFeatures from "../OhterFeatures/OhterFeatures";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchHomeLocation from "../SearchHomeLocation/SearchHomeLocation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

import {
    setPriceRange,
    setPropertyType,
    setSquareFeat,
    setYearBuild,
    clearFilters,
    setListingStatus,
    setCurrency,
    setBedrooms,
    setBathrooms,
    setOtherFeatures,
    setLocation,
} from "@/app/features/filter/filterSlice";
import Skeleton from "react-loading-skeleton";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { setSkeletonLoading } from "@/app/features/skeleton/skeletonSlice";

function SidebarContent() {
    const dispatch = useDispatch<AppDispatch>();
    const filter = useSelector((state: RootState) => state.filter);
    const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
    const [localLoading, setLocalLoading] = useState(false);

    const propertyTypes = [
        "House", "Apartment", "Office Space", "Duplex",
        "Agricultural Land", "Industrial Land", "Garage",
        "Co-working Space", "Hotel", "Commercial Land",
        "Warehouse", "Residential"
    ];

    const togglePropertyType = (type: string) => {
        if (filter.propertyType.includes(type)) {
            dispatch(setPropertyType(filter.propertyType.filter((t) => t !== type)));
        } else {
            dispatch(setPropertyType([...filter.propertyType, type]));
        }

        setLocalLoading(true);
        setTimeout(() => setLocalLoading(false), 500);
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        setLocalLoading(true);
        setTimeout(() => setLocalLoading(false), 500);
    };

    useEffect(() => {
        if (skletonLoader) {
            const timer = setTimeout(() => {
                dispatch(setSkeletonLoading(false));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [skletonLoader, dispatch]);

    if (skletonLoader || localLoading) {
        return (
            <div className="space-y-6 p-4">
                {[...Array(8)].map((_, idx) => (
                    <div key={idx} className="space-y-3">
                        <Skeleton height={20} width="40%" />
                        <Skeleton height={40} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="pb-6 text-sm text-gray-700 space-y-6">
            {/* Search */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Location</p>
                <SearchHomeLocation />
            </div>

            {/* Status */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Listing Status</p>
                <div className="flex gap-2 flex-wrap">
                    {["All", "Sale", "Rent"].map((listingStatus) => (
                        <Button
                            key={listingStatus}
                            variant={filter.listingStatus === listingStatus ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => dispatch(setListingStatus(listingStatus as "All" | "Sale" | "Rent"))}
                        >
                            {listingStatus}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Currency */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Currency</p>
                <div className="flex gap-2 flex-wrap">
                    {["All", "BDT", "USD", "SAR", "EUR"].map((currency) => (
                        <Button
                            key={currency}
                            variant={filter.currency === currency ? "default" : "outline"}
                            size="sm"
                            className="text-xs"
                            onClick={() => dispatch(setCurrency(currency as "All" | "BDT" | "USD" | "SAR" | "EUR"))}
                        >
                            {currency}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Property Type */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Property Type</p>
                <ScrollArea className="h-60 pr-4">
                    <div className="space-y-3">
                        {propertyTypes.map((type) => (
                            <div key={type} className="flex gap-3 items-center">
                                <Checkbox
                                    checked={filter.propertyType.includes(type)}
                                    onCheckedChange={() => togglePropertyType(type)}
                                    id={type}
                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                />
                                <Label htmlFor={type} className="text-sm font-normal cursor-pointer">{type}</Label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Price Range */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-1">Price Range</p>
                <p className="text-xs text-gray-500 mb-3">Drag to set min and max prices</p>
                <div className="mt-3">
                    <Slider
                        value={filter.priceRange}
                        min={0}
                        max={100000000}
                        step={50000}
                        onValueChange={(val) => dispatch(setPriceRange(val as [number, number]))}
                        className="my-6"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>${filter.priceRange[0].toLocaleString()}</span>
                        <span>${filter.priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Bedroom & Bathroom */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <BedroomBathroomFilter />
            </div>

            {/* Square Feet */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Square Feet</p>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Label htmlFor="sqft-min" className="text-xs text-gray-500">Min</Label>
                        <Input
                            id="sqft-min"
                            type="number"
                            placeholder="0"
                            value={filter.squareFeat[0] || ""}
                            onChange={(e) =>
                                dispatch(setSquareFeat([Number(e.target.value), filter.squareFeat[1]]))
                            }
                            className="mt-1"
                        />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="sqft-max" className="text-xs text-gray-500">Max</Label>
                        <Input
                            id="sqft-max"
                            type="number"
                            placeholder="Any"
                            value={filter.squareFeat[1] || ""}
                            onChange={(e) =>
                                dispatch(setSquareFeat([filter.squareFeat[0], Number(e.target.value)]))
                            }
                            className="mt-1"
                        />
                    </div>
                </div>
            </div>

            {/* Year Built */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Year Built</p>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Label htmlFor="year-min" className="text-xs text-gray-500">Min</Label>
                        <Input
                            id="year-min"
                            type="number"
                            placeholder="1900"
                            value={filter.yearBuild[0] || ""}
                            onChange={(e) =>
                                dispatch(setYearBuild([Number(e.target.value) || 1900, filter.yearBuild[1]]))
                            }
                            className="mt-1"    
                        />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="year-max" className="text-xs text-gray-500">Max</Label>
                        <Input
                            id="year-max"
                            type="number"
                            placeholder="2023"
                            value={filter.yearBuild[1] || ""}
                            onChange={(e) =>
                                dispatch(setYearBuild([filter.yearBuild[0], Number(e.target.value) || new Date().getFullYear()]))
                            }
                            className="mt-1"
                        />
                    </div>
                </div>
            </div>

            {/* Other Features */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <OtherFeatures />
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-4 mt-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClearFilters}
                        className="text-gray-700 border-gray-300"
                    >
                        <X size={16} className="mr-2" />
                        Reset All
                    </Button>
                    <Button type="button" className="bg-green-600 hover:bg-green-700">
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function FilterSidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-full">
                <div className="sticky top-24">
                    <ScrollArea className="h-[calc(100vh-1px)] pr-4">
                        <SidebarContent />
                    </ScrollArea>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-green-500 text-white font-medium border border-green-700 shadow-md hover:shadow-lg hover:bg-green-500 transition-all"
                        >
                            <IoFilterOutline className="text-lg" />
                            Filters
                        </motion.button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-full sm:max-w-md p-0">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="text-lg font-semibold text-gray-900">
                                Filter Properties
                            </SheetTitle>
                        </SheetHeader>

                        <ScrollArea className="h-full px-4">
                            <SidebarContent />
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}