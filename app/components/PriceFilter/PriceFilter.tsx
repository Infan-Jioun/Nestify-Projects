"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface PriceFilterProps {
    priceRange: [number, number];
    onPriceChange: (value: [number, number]) => void;
    maxPrice?: number;
}

export default function PriceFilter({
    priceRange,
    onPriceChange,
    maxPrice = 999999,
}: PriceFilterProps) {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Number(e.target.value) || 0;
        if (newMin <= priceRange[1]) onPriceChange([newMin, priceRange[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value) || 0;
        if (newMax >= priceRange[0]) onPriceChange([priceRange[0], newMax]);
    };

    return (
        <div className="space-y-2">
            <p className="text-sm font-semibold">Price Range</p>

            {/* Slider */}
            <Slider
                value={priceRange}
                onValueChange={(val) => onPriceChange(val as [number, number])}
                min={0}
                max={maxPrice}
                step={1}
            />

            {/* Input Boxes */}
            <div className="flex gap-2 mt-1">
                <Input
                    type="number"
                    placeholder="Min"
                    className="w-1/2"
                    value={priceRange[0]}
                    onChange={handleMinChange}
                />
                <Input
                    type="number"
                    placeholder="Max"
                    className="w-1/2"
                    value={priceRange[1]}
                    onChange={handleMaxChange}
                />
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
        </div>
    );
}
