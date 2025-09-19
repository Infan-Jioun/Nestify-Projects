"use client";

import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { propertyFacilities } from "@/lib/propertyFacilities";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Inputs } from "../Inputs";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

type Props = {
    setValue: UseFormSetValue<Inputs>;
    errors: FieldErrors<Inputs>;
};

export default function MultiSelectService({ setValue }: Props) {
    const facilities = useSelector((state: RootState) => state.propertyFacilities.facilities);

    const fields: Option[] = (facilities && facilities.length > 0
        ? propertyFacilities.filter(f =>
            facilities.some(fac => f.value.toLowerCase().includes(fac.toLowerCase()))
        )
        : propertyFacilities
    ).map(f => ({ label: f.label || f.value, value: f.value }));

    return (
        <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <Label className="mb-2 block text-gray-700 text-xs">Find your Service</Label>
            <div className="relative">
                <MultipleSelector
                    className="px-10 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                    defaultOptions={fields}
                    placeholder="Select Facilities"
                    onChange={(selected: Option[]) =>
                        setValue(
                            "propertyFacilities",
                            selected.map(s => s.value)
                        )
                    }
                    emptyIndicator={<p className="text-center text-sm">No results found</p>}
                />
            </div>
        </div>
    );
}
