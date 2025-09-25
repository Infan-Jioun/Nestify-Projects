"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { bangladeshGeoData } from "@/lib/geo-data";
import { Control, FieldErrors } from "react-hook-form";
import { DistrictInfo } from "@/lib/districtInfo";

type DistrictInfoProps = {
    control: Control<DistrictInfo>;
    errors?: FieldErrors<DistrictInfo>;
};

export default function DistrictSelectSection({ control, errors }: DistrictInfoProps) {
    return (
        <div className="mt-5">
            <Controller
                name="districtName"
                control={control}
                rules={{ required: "City name is required" }}
                render={({ field }) => (
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Division & District" />
                        </SelectTrigger>
                        <SelectContent>
                            {bangladeshGeoData.map((division) => (
                                <SelectGroup key={division.division}>
                                    <SelectLabel>{division.division}</SelectLabel>
                                    {division.districts?.map((district) => (
                                        <SelectItem
                                            key={district.district}
                                            value={`${district.district}`}
                                        >
                                            {district.district}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors?.districtName && (
                <p className="text-red-500 text-sm">{errors.districtName.message}</p>
            )}
        </div>
    );
}
