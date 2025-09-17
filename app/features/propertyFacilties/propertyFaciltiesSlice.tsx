import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PropertySate {
    facilities: string
}
export const initialState: PropertySate = {
    facilities: ""
}
const propertyFacilitiesSlice = createSlice({
    name: "propertyFaclities",
    initialState,
    reducers: {
        setFacilities: (state, action: PayloadAction<string>) => {
            state.facilities = action.payload
        }
    }
})
export const { setFacilities } = propertyFacilitiesSlice.actions
export default propertyFacilitiesSlice.reducer