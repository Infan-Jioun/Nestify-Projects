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
import { CityInfo } from "@/lib/CityInfo";
import { Control, FieldErrors } from "react-hook-form";

type CityInfopProps = {
    control: Control<CityInfo>;
    errors?: FieldErrors<CityInfo>;
};

export default function CitySelectSection({ control, errors }: CityInfopProps) {
    return (
        <div className="mt-5">
            <Controller
                name="cityName"
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
            {errors?.cityName && (
                <p className="text-red-500 text-sm">{errors.cityName.message}</p>
            )}
        </div>
    );
}
