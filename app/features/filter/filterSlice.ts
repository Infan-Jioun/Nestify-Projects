import { PropertyType } from "@/app/Types/properties";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ListingStatus = "All" | "Sale" | "Rent" | "";
type Currency = "All" | "BDT" | "USD" | "SAR" | "EUR" | "";
interface FilterState {
    location: string;
    listingStatus: ListingStatus;
    currency: Currency;
    propertyType: string[];
    priceRange: [number, number];
    bedrooms: string;
    bathrooms: string;
    squareFeat: [number, number];
    yearBuild: [number, number];
    otherFeatures: string[];
    sortOption: string;
    sortedProperties: PropertyType[];
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}

const initialState: FilterState = {
    location: "",
    listingStatus: "All",
    currency: "All",
    propertyType: [],
    priceRange: [0, 100_000_000],
    bedrooms: "any",
    bathrooms: "any",
    squareFeat: [0, 0],
    yearBuild: [2000, new Date().getFullYear()],
    otherFeatures: [],
    sortOption: "default",
    sortedProperties: [],
    currentPage: 1,
    itemsPerPage: 9,
    totalPages: 1,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
        setListingStatus: (state, action: PayloadAction<ListingStatus>) => {
            state.listingStatus = action.payload;
        },
        setCurrency: (state, action: PayloadAction<Currency>) => {
            state.currency = action.payload;
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
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.totalPages = Math.ceil(state.sortedProperties.length / state.itemsPerPage);
            if (state.currentPage > state.totalPages) {
                state.currentPage = state.totalPages || 1;
            }
        },
        clearFilters: (state) => {
            state.location = "";
            state.listingStatus = "All";
            state.propertyType = [];
            state.currency = "All";
            state.priceRange = [0, 10000000];
            state.bedrooms = "any";
            state.bathrooms = "any";
            state.squareFeat = [0, 0];
            state.yearBuild = [0, 0];
            state.otherFeatures = [];
            state.currentPage = 1;
        },
    },
});

export const {
    setLocation,
    setListingStatus,
    setCurrency,
    setPropertyType,
    setPriceRange,
    setBedrooms,
    setBathrooms,
    setSquareFeat,
    setYearBuild,
    setOtherFeatures,
    setCurrentPage,
    setItemsPerPage,
    setSortOption,
    sortProperties,
    clearFilters,

} = filterSlice.actions;

export default filterSlice.reducer;
