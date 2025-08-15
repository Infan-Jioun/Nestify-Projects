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
        <div>
            <span className='font-semibold text-black mt-2 '>{label}</span>
            <ToggleGroup className='mt-3 mb-3' type="single" value={value} onValueChange={(val) => onChange(val)}>
                {["any", "1+", "2+", "3+", "4+", "5+"].map((item) => <ToggleGroupItem key={item} value={item}
                    aria-label={item}
                    className={`rounded-none first:rounded-l-full last:rounded-r-full font-semibold text-black border border-gray-300 ${value === item ? "bg-black text-white border-black" : "bg-white text-black"} `}
                >{item}</ToggleGroupItem>)}
            </ToggleGroup>


        </div>
    )
}
export default function BedroomBathroomFilter() {
    const [bedrooms, setBedrooms] = React.useState("any")
    const [bathrooms, setBathrooms] = React.useState("any")
    return (
        <div>
            <FilterSection label='Bedrooms' value={bedrooms} onChange={(val) => setBedrooms(val || "any")} />
            <FilterSection label='Bathrooms' value={bathrooms} onChange={(val) => setBathrooms(val || "any")} />


        </div>
    )
}
