import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoaderState {
    loading: boolean;
    geoCountryLocationLoading: boolean;
    addPropertyLoader?: boolean;
    propertyFaciltiesLoader?: boolean;
    buttonLoader?: boolean;
    skletonLoader?: boolean;
}

const initialState: LoaderState = {
    loading: false,
    geoCountryLocationLoading: false,
    addPropertyLoader: false,
    propertyFaciltiesLoader: false,
    buttonLoader: false,
    skletonLoader: false
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
        setPropertyFacilitiesLoader(state, action: PayloadAction<boolean>) {
            state.propertyFaciltiesLoader = action.payload
        },
        setButtonLoader(state, action: PayloadAction<boolean>) {
            state.buttonLoader = action.payload;
        },
        setSkletonLoader(state, action: PayloadAction<boolean>) {
            state.skletonLoader = action.payload;
        }

    }
})
export const { setLoading, setGeoCountryLocationLoading, setAddPropertyLoader, setPropertyFacilitiesLoader, setButtonLoader, setSkletonLoader } = loaderSlice.actions;
export default loaderSlice.reducer;