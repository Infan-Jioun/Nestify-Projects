"use client"
import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { propertyFacilities, PropertyField } from "@/lib/propertyFacilities"
import { RootState } from "@/lib/store"
import { FaSearch } from "react-icons/fa"
import { useSelector } from "react-redux"

export default function MultiSelectService() {
    const facilities: string = useSelector((state: RootState) => state.propertyFacilities.facilities)

    const fields: PropertyField[] = facilities
        ? propertyFacilities.filter(f => f.value.toLowerCase().includes(facilities.toLowerCase()))
        : propertyFacilities


    return (
        <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <Label className="mb-2 block text-gray-700 text-xs">Find your Service</Label>
            <div className="relative">
                <MultipleSelector
                    className="px-10  w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                    defaultOptions={fields as Option[]}
                    placeholder="Select Facilities"
                    emptyIndicator={<p className="text-center text-sm">No results found</p>}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
            </div>
        </div>
    )
}
