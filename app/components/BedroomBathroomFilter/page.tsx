"use client"
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'

type FilterProps = {
  label: string,
  value: string,
  onChange: (val: string) => void
}

const FilterSection: React.FC<FilterProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-6">
      {/* Label */}
      <span className="block font-semibold text-gray-800 text-sm mb-2">
        {label}
      </span>

      {/* Toggle Group */}
      <ToggleGroup
        className="flex flex-wrap gap-2"
        type="single"
        value={value}
        onValueChange={(val) => onChange(val)}
      >
        {["any", "1+", "2+", "3+", "4+", "5+"].map((item) => (
          <ToggleGroupItem
            key={item}
            value={item}
            aria-label={item}
            className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
              ${
                value === item
                  ? "bg-green-500 text-white border-green-500 shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

export default function BedroomBathroomFilter() {
  const [bedrooms, setBedrooms] = React.useState("any")
  const [bathrooms, setBathrooms] = React.useState("any")

  return (
    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 space-y-4">
      <FilterSection
        label="Bedrooms"
        value={bedrooms}
        onChange={(val) => setBedrooms(val || "any")}
      />
      <FilterSection
        label="Bathrooms"
        value={bathrooms}
        onChange={(val) => setBathrooms(val || "any")}
      />
    </div>
  )
}
