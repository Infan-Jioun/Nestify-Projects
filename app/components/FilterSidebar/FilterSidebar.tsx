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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import BedroomBathroomFilter from "../BedroomBathroomFilter/BedroomBathroomFilter";
import OtherFeatures from "../OhterFeatures/OhterFeatures";
import { ScrollArea } from "@/components/ui/scroll-area";
import SquareComponents from "../SquareComponents/SquareComponents";
import YearBuildFilter from "../YearBuildFilter/YearBuildFilter";
import { Button } from "@/components/ui/button";
import SearchHomeLocation from "../SearchHomeLocation/SearchHomeLocation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setPropertyType, setStatus } from "@/app/features/filter/filterSlice";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function SidebarContent() {
    const dispatch = useDispatch<AppDispatch>();
    const filter = useSelector((state: RootState) => state.filter)
    const propertyTypes = ["All", "Hosue", "Apartment", "Office Space", "Villa"]
    const togglePropertyType = (type: string) => {
        if (filter.propertyType.includes(type)) {
            dispatch(setPropertyType(filter.propertyType.filter(toggle => toggle !== type)))
        } else {
            dispatch(setPropertyType([...filter.propertyType, type]))
        }
    }
    return (
        <div className="px-3 pb-6 text-sm text-gray-700 space-y-6">
            {/* Search */}
            <SearchHomeLocation />

            {/* 🔹 Status */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Listing Status</p>
                <ToggleGroup
                    type="single"
                    value={filter.status}
                    onValueChange={(val) => dispatch(setStatus(val))}
                    className="flex gap-2 flex-wrap"
                >
                    {["All", "Buy", "Rent"].map(status => (
                        <ToggleGroupItem
                            key={status}
                            value={status}
                            aria-label={status}
                            className={`px-3 py-2 rounded-full border text-sm font-medium transition-all ${filter.status === status
                                ? "bg-green-500 text-white border-green-500 shadow-md"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {status}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* Property Type */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-900 mb-3">Property Type</p>
                <div className="space-y-2">
                    {propertyTypes.map(type => (
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
                    <Slider defaultValue={[33]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>$0</span>
                        <span>$10,000+</span>
                    </div>
                </div>
            </div>

            {/* Bedroom & Bathroom Filter */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <BedroomBathroomFilter />
            </div>

            {/* SquareComponents */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <SquareComponents />
            </div>

            {/* YearBuild */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <YearBuildFilter />
            </div>

            {/* Other Features */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
                <OtherFeatures />
            </div>

            {/* Footer Actions */}
            <SheetFooter className="flex flex-col gap-4 mt-6 p-3 ">
                <Button className="bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg text-white flex items-center gap-2 px-6 py-2 rounded-full transition-all w-64 mx-auto">
                    <FaSearch /> Search
                </Button>

                <div className="flex justify-between text-sm font-medium">
                    <button type="reset" className="text-green-600 hover:text-green-800 underline">
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
            {/* Desktop Sidebar (always visible) */}
            <div className="hidden md:block w-full">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar (button + sheet) */}
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
