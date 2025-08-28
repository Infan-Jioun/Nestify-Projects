"use client"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { setCategory } from "@/app/features/property/propertySlice"

const categoryMap = {
  Residential: ["Apartment / Flat", "House / Villa", "Duplex / Penthouse"],
  Commercial: ["Office Space", "Shop / Retail Space", "Warehouse / Storage", "Restaurant / Café Space"],
  Land: ["Residential Land", "Commercial Land", "Agricultural Land", "Industrial Land"],
  Other: ["Hotel / Resort", "Co-working Space", "Garage / Parking Space"],
}

export default function Category() {
  const dispatch = useDispatch()
  const category = useSelector((state: RootState) => state.property.category)

  return (
    <div>
      <Label className="mb-2 block text-gray-700 text-xs">Category</Label>
      <Select
        value={category}
        onValueChange={(val) => dispatch(setCategory(val))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Property Type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(categoryMap).map(([group, items]) => (
            <SelectGroup key={group} className="px-2 pt-3">
              <Label className="text-gray-600 text-xs mb-1">{group}</Label>
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
