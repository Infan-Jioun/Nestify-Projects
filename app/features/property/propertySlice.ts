import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PropertyState {
    category: string
}

const initialState: PropertyState = {
    category: ""
}

export const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
    },
})

export const { setCategory } = propertySlice.actions
export default propertySlice.reducer
