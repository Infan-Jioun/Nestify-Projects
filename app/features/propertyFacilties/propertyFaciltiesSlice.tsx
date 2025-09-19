import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PropertyState {
    facilities: string[];
}

export const initialState: PropertyState = {
    facilities: [],
};

const propertyFacilitiesSlice = createSlice({
    name: "propertyFacilities",
    initialState,
    reducers: {
        setFacilities: (state, action: PayloadAction<string[]>) => {
            state.facilities = action.payload;
        },
    },
});

export const { setFacilities } = propertyFacilitiesSlice.actions;
export default propertyFacilitiesSlice.reducer;
