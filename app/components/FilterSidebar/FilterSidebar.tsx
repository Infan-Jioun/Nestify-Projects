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
import { FaSearch } from "react-icons/fa";
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
    resetFilters,
    setListingStatus,
} from "@/app/features/filter/filterSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SidebarContent() {
    const dispatch = useDispatch<AppDispatch>();
    const filter = useSelector((state: RootState) => state.filter);
    const { skletonLoader } = useSelector((state: RootState) => state.loader);

    const propertyTypes = ["House", "Apartment", "Office Space", "Villa"];
    const togglePropertyType = (type: string) => {
        if (filter.propertyType.includes(type)) {
            dispatch(setPropertyType(filter.propertyType.filter((t) => t !== type)));
        } else {
            dispatch(setPropertyType([...filter.propertyType, type]));
        }
    };

    if (skletonLoader) {
        return (
            <div className="space-y-4">
                {[...Array(8)].map((_, idx) => (
                    <Skeleton key={idx} height={40} />
                ))}
            </div>
        );
    }

    return (
        <div className="px-3 pb-6 text-sm text-gray-700 space-y-6">
            {/* Search */}
            <SearchHomeLocation />

            {/* Status */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Listing Status</p>
                <div className="flex gap-2 flex-wrap">
                    {["All","Sale" ,"Rent"].map((listingStatus) => (
                        <Button
                            key={listingStatus}
                            variant={filter.listingStatus === listingStatus ? "default" : "outline"}
                            size="sm"
                            onClick={() => dispatch(setListingStatus(listingStatus as "All" | "Sale" | "Rent"))}
                        >
                            {listingStatus}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Property Type */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Property Type</p>
                <div className="space-y-2">
                    {propertyTypes.map((type) => (
                        <div key={type} className="flex gap-2 items-center">
                            <Checkbox
                                checked={filter.propertyType.includes(type)}
                                onCheckedChange={() => togglePropertyType(type)}
                                id={type}
                            />
                            <Label htmlFor={type}>{type}</Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Price Range</p>
                <div className="mt-3">
                    <Slider
                        value={filter.priceRange}
                        min={0}
                        max={100000000}
                        step={50000}
                        onValueChange={(val) => dispatch(setPriceRange(val as [number, number]))}
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>{filter.priceRange[0].toLocaleString()}</span>
                        <span>{filter.priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Bedroom & Bathroom */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <BedroomBathroomFilter />
            </div>

            {/* Square Feet */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-2">Square Feet</p>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="min"
                        value={filter.squareFeat[0]}
                        onChange={(e) =>
                            dispatch(setSquareFeat([parseInt(e.target.value), filter.squareFeat[1]]))
                        }
                        className="w-1/2"
                    />
                    <Input
                        type="number"
                        placeholder="max"
                        value={filter.squareFeat[1]}
                        onChange={(e) =>
                            dispatch(setSquareFeat([filter.squareFeat[0], parseInt(e.target.value)]))
                        }
                        className="w-1/2"
                    />
                </div>
            </div>

            {/* Year Built */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-2">Year Built</p>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="min"
                        value={filter.yearBuild[0]}
                        onChange={(e) =>
                            dispatch(
                                setYearBuild([parseInt(e.target.value) || 2000, filter.yearBuild[1]])
                            )
                        }
                        className="w-1/2"
                    />
                    <Input
                        type="number"
                        placeholder="max"
                        value={filter.yearBuild[1]}
                        onChange={(e) =>
                            dispatch(
                                setYearBuild([filter.yearBuild[0], parseInt(e.target.value) || new Date().getFullYear()])
                            )
                        }
                        className="w-1/2"
                    />
                </div>
            </div>

            {/* Other Features */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <OtherFeatures />
            </div>

            {/* Footer Actions */}
            <SheetFooter className="flex flex-col gap-4 mt-6 p-3">
                <Button
                    className="bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all w-64 mx-auto"
                >
                    <FaSearch /> Search
                </Button>

                <div className="flex justify-between text-sm font-medium">
                    <button
                        type="button"
                        onClick={() => dispatch(resetFilters())}
                        className="text-green-600 hover:text-green-800 underline"
                    >
                        Reset all filters
                    </button>
                    <button type="submit" className="text-green-600 hover:text-green-800 underline">
                        Save filters
                    </button>
                </div>
            </SheetFooter>
        </div>
    );
}

export function FilterSidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-full">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden flex justify-end items-end text-right">
                <Sheet>
                    <SheetTrigger asChild>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 h-10 px-5 rounded-full bg-green-500 text-white font-medium border border-green-600 shadow-md hover:shadow-lg hover:bg-green-600 transition-all"
                        >
                            <IoFilterOutline className="text-lg" />
                            Filter
                        </motion.button>
                    </SheetTrigger>

                    <form>
                        <SheetContent side="left" className="w-[360px] sm:w-[420px]">
                            <SheetHeader>
                                <SheetTitle className="ml-2 text-lg font-semibold text-green-500">
                                    Filter Your Favorite
                                </SheetTitle>

                                <ScrollArea className="h-[90vh] mt-4 pr-2">
                                    <SidebarContent />
                                </ScrollArea>
                            </SheetHeader>
                        </SheetContent>
                    </form>
                </Sheet>
            </div>
        </>
    );
}
