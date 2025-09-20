"use client"

import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setQuery, setResults } from '@/app/features/SearchLocation/SearchLocationSlice';
import { setGeoCountryLocationLoading } from '@/app/features/loader/loaderSlice';
import { bangladeshGeoData } from '@/lib/geo-data';
import { setLocation } from '@/app/features/filter/filterSlice';

export default function CitySelectSection() {
    const dispatch = useDispatch<AppDispatch>();
    const { query, results } = useSelector((state: RootState) => state.searchLocation);

    useEffect(() => {
        if (!query.trim()) {
            dispatch(setResults([]));
            return;
        }
        dispatch(setGeoCountryLocationLoading(true));
        const handler = setTimeout(() => {
            const setValue = query.toLowerCase();
            const matches: string[] = [];
            bangladeshGeoData.forEach((division) => {
                if (division.division.toLowerCase().includes(setValue)) matches.push(`${division.division}`);
                if (division.districts) {
                    division.districts.forEach((district) => {
                        if (district.district.toLowerCase().includes(setValue)) matches.push(`${district.district}, ${division.division}`);
                    });
                }
            });
            dispatch(setResults(matches.slice(0, 100)));
            dispatch(setGeoCountryLocationLoading(false));
        }, 500);
        return () => clearTimeout(handler);
    }, [query, dispatch]);

    const handleSelect = (item: string) => {
        dispatch(setResults([]));
        dispatch(setQuery(item));
        dispatch(setLocation(""))
    }

    return (
        <div className='drop-shadow-xl mt-10 '>
            <Select value={query} onValueChange={handleSelect}>
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
                                    value={`${district.district}, ${division.division}`}
                                >
                                    {district.district}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
