"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoFilterOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import BedroomBathroomFilter from "../BedroomBathroomFilter/page";
import OtherFeatures from "../OhterFeatures/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LocationFilter } from "../LocationFilter/page";
export function FilterSidebar() {
    return (
        <div className="flex justify-end items-end text-right">
            <Sheet>
                <SheetTrigger className="flex justify-center items-center gap-3">
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.0 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
                        >
                            <IoFilterOutline /> Filter
                        </motion.button>
                    </div>
                </SheetTrigger>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="ml-4">Filter Your Fovarite</SheetTitle>

                        {/* Scrollable area */}
                        <ScrollArea className="h-[100vh]  pr-4" > 
                            <SheetDescription className="px-5 pb-6">
                                {/* Search */}
                                <div>
                                    <p className="text-xs font-bold text-black">Find your Home</p>
                                    <Input className="mt-3 pl-9 pr-3 py-2 w-full border-black rounded-4xl text-black" type="search" />
                                    <div className="relative left-2.5 -top-6">
                                        <p className="text-black"><FaSearch /></p>
                                    </div>
                                </div>

                                {/* Listing Status */}
                                <div className="mt-5">
                                    <p className="text-xs font-bold text-black mb-3">Listing Status</p>
                                    <RadioGroup defaultValue="All">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="All" id="All" />
                                            <Label htmlFor="All">All</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Buy" id="Buy" />
                                            <Label htmlFor="Buy">Buy</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Rent" id="Rent" />
                                            <Label htmlFor="Rent">Rent</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Property Type */}
                                <div className="mt-5">
                                    <p className="text-xs font-bold text-black mb-3">Property Type</p>
                                    {["All", "Houses", "Apartments", "Office", "Vila"].map((type) => (
                                        <div key={type} className="flex gap-3 items-center">
                                            <Checkbox id={type} className="mt-1" />
                                            <Label htmlFor={type}>{type}</Label>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Range */}
                                <div className="mt-5">
                                    <p className="text-xs font-bold text-black">Price Range</p>
                                    <div className="mt-3">
                                        <Slider defaultValue={[33]} max={100} step={1} />
                                    </div>
                                </div>

                                {/* Bedroom & Bathroom Filter */}
                                <div className="mt-5">
                                    <BedroomBathroomFilter />
                                </div>

                                {/* Other Features */}
                              
                                <div className="mt-5">
                                    <OtherFeatures />
                                </div>
                                <br />
                                <div className="mt-5">
                                <LocationFilter/>
                                </div>
                            </SheetDescription>
                        </ScrollArea>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}
