import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoaderState {
    loading: boolean;
    geoCountryLocationLoading: boolean;
    addPropertyLoader?: boolean;
    buttonLoader?: boolean;
}

const initialState: LoaderState = {
    loading: false,
    geoCountryLocationLoading: false,
    addPropertyLoader: false,
    buttonLoader: false,
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setGeoCountryLocationLoading(state, action: PayloadAction<boolean>) {
            state.geoCountryLocationLoading = action.payload;
        },
        
       
        setAddPropertyLoader(state, action: PayloadAction<boolean>) {
            state.addPropertyLoader = action.payload;
        },
        setButtonLoader(state, action: PayloadAction<boolean>) {
            state.buttonLoader = action.payload;
        }

    }
})
export const { setLoading,setGeoCountryLocationLoading, setAddPropertyLoader, setButtonLoader } = loaderSlice.actions;
export default loaderSlice.reducer;