// src/components/FilterSidebar.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterProps {
    onFilterChange: (filters: Filters) => void;
}

export interface Filters {
    search: string;
    status: string;
    types: string[];
    price: [number, number];
}

const FilterSidebar: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [types, setTypes] = useState<string[]>([]);
    const [price, setPrice] = useState<[number, number]>([25000, 150000]);

    const handleTypeChange = (type: string) => {
        setTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const applyFilter = () => {
        onFilterChange({ search, status, types, price });
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-6 space-y-6 shadow-sm">
            <div>
                <Label htmlFor="search">Find your home</Label>
                <Input
                    id="search"
                    placeholder="What are you looking for?"
                    className="mt-2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div>
                <Label>Listing Status</Label>
                <RadioGroup value={status} onValueChange={setStatus} className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="for-sale" id="for-sale" />
                        <Label htmlFor="for-sale">For Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="for-rent" id="for-rent" />
                        <Label htmlFor="for-rent">For Rent</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label>Property Type</Label>
                <div className="space-y-2 mt-2">
                    {["House", "Apartment", "Office"].map(type => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                checked={types.includes(type)}
                                id={type.toLowerCase()}
                                onCheckedChange={() => handleTypeChange(type)}
                            />
                            <Label htmlFor={type.toLowerCase()}>{type}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Label>Price Range</Label>
                <Slider
                    value={price}
                    onValueChange={(val: [number, number]) => setPrice(val)}
                    max={500000}
                    step={1000}
                    className="mt-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${price[0].toLocaleString()}</span>
                    <span>${price[1].toLocaleString()}</span>
                </div>
            </div>
            <div>
                
            </div>

            <Button onClick={applyFilter} className="w-full bg-red-600 hover:bg-red-700">Apply Filters</Button>
        </div>
    );
};

export default FilterSidebar;
