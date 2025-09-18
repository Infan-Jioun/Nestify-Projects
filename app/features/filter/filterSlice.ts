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


}
const initialState: FilterState = {
    location: "",
    status: "All",
    propertyType: [],
    priceRange: [0, 10000000],
    bedrooms: "any",
    bathrooms: "any",
    squareFeat: [0, 0],
    yearBuild: [2000, new Date().getFullYear()],
    otherFeatures: [],
}
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
        }

    }
})
const { setLocation, setStatus, setPropertyType, setPriceRange, setBedrooms, setBathrooms, setSquareFeat, setYearBuild, setOtherFeatures } = filterSlice.actions
export default filterSlice.reducer