"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setBedrooms, setBathrooms } from "@/app/features/filter/filterSlice";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const bedroomOptions = ["any", "1+", "2+", "3+", "4+", "5+"];
const bathroomOptions = ["any", "1+", "2+", "3+", "4+", "5+"];

export default function BedroomBathroomFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const { bedrooms, bathrooms } = useSelector((state: RootState) => state.filter);

  return (
    <div className="space-y-4">
      {/* Bedrooms */}
      <div>
        <span className="block font-semibold text-gray-800 text-sm mb-2">Bedrooms</span>
        <ToggleGroup
          type="single"
          value={bedrooms}
          onValueChange={(val) => dispatch(setBedrooms(val))}
          className="flex flex-wrap gap-2"
        >
          {bedroomOptions.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              aria-label={item}
              className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                                ${bedrooms === item
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Bathrooms */}
      <div>
        <span className="block font-semibold text-gray-800 text-sm mb-2">Bathrooms</span>
        <ToggleGroup
          type="single"
          value={bathrooms}
          onValueChange={(val) => dispatch(setBathrooms(val))}
          className="flex flex-wrap gap-2"
        >
          {bathroomOptions.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              aria-label={item}
              className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                                ${bathrooms === item
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
