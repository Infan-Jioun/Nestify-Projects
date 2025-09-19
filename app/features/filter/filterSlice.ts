import { PropertyType } from "@/app/Types/properties";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    location: string;
    status: string;
    propertyType: string[];
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    squareFeat: [number, number];
    yearBuild: [number, number];
    otherFeatures: string[];
    sortOption: string;
    sortedProperties: PropertyType[];
}

const initialState: FilterState = {
    location: "",
    status: "All",
    propertyType: [],
    priceRange: [0, 100_000_000],
    bedrooms: "any",
    bathrooms: "any",
    squareFeat: [0, 0],
    yearBuild: [2000, new Date().getFullYear()],
    otherFeatures: [],
    sortOption: "default",
    sortedProperties: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setPropertyType: (state, action: PayloadAction<string[]>) => {
            state.propertyType = action.payload;
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            state.priceRange = action.payload;
        },
        setBedrooms: (state, action: PayloadAction<string>) => {
            state.bedrooms = action.payload;
        },
        setBathrooms: (state, action: PayloadAction<string>) => {
            state.bathrooms = action.payload;
        },
        setSquareFeat: (state, action: PayloadAction<[number, number]>) => {
            state.squareFeat = action.payload;
        },
        setYearBuild: (state, action: PayloadAction<[number, number]>) => {
            state.yearBuild = action.payload;
        },
        setOtherFeatures: (state, action: PayloadAction<string[]>) => {
            state.otherFeatures = action.payload;
        },
        setSortOption: (state, action: PayloadAction<string>) => {
            state.sortOption = action.payload;
        },
        sortProperties: (state, action: PayloadAction<PropertyType[]>) => {
            const { sortOption } = state;
            const sorted = [...action.payload];

            if (sortOption === "priceLowHigh") sorted.sort((a, b) => a.price - b.price);
            else if (sortOption === "priceHighLow") sorted.sort((a, b) => b.price - a.price);
            else if (sortOption === "latest") sorted.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            state.sortedProperties = sorted;
        },
        resetFilters: (state) => {
            state.location = "";
            state.status = "All";
            state.propertyType = [];
            state.priceRange = [0, 100_000_000];
            state.bedrooms = "any";
            state.bathrooms = "any";
            state.squareFeat = [0, 0];
            state.yearBuild = [2000, new Date().getFullYear()];
            state.otherFeatures = [];
            state.sortOption = "default";
            state.sortedProperties = [];
        },
    },
});

export const {
    setLocation,
    setStatus,
    setPropertyType,
    setPriceRange,
    setBedrooms,
    setBathrooms,
    setSquareFeat,
    setYearBuild,
    setOtherFeatures,
    setSortOption,
    sortProperties,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
