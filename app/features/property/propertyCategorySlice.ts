import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PropertyState {
    category: string
}

const initialState: PropertyState = {
    category: ""
}

export const propertyCategorySilce = createSlice({
    name: "propertycategory",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload
        },
    },
})

export const { setCategory } = propertyCategorySilce.actions
export default propertyCategorySilce.reducer
