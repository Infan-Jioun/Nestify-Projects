"use client";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import React from 'react';

type FilterSectionProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({ label, value, onChange }) => (
  <div className="mb-6">
    <span className="block font-semibold text-gray-800 text-sm mb-2">{label}</span>
    <ToggleGroup
      className="flex flex-wrap gap-2"
      type="single"
      value={value}
      onValueChange={onChange}
    >
      {["any", "1+", "2+", "3+", "4+", "5+"].map(item => (
        <ToggleGroupItem
          key={item}
          value={item}
          aria-label={item}
          className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
            ${value === item
              ? "bg-green-500 text-white border-green-500 shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
        >
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  </div>
);

interface BedroomBathroomFilterProps {
  bedrooms: string;
  bathrooms: string;
  onBedroomsChange: (val: string) => void;
  onBathroomsChange: (val: string) => void;
}

export default function BedroomBathroomFilter({
  bedrooms,
  bathrooms,
  onBedroomsChange,
  onBathroomsChange
}: BedroomBathroomFilterProps) {
  return (
    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 space-y-4">
      <FilterSection label="Bedrooms" value={bedrooms} onChange={onBedroomsChange} />
      <FilterSection label="Bathrooms" value={bathrooms} onChange={onBathroomsChange} />
    </div>
  );
}
