import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoaderState {
    loading: boolean; // global loading
    division: boolean;
    district: boolean;
    upazila: boolean;
    addPropertyLoader?: boolean;
}

const initialState: LoaderState = {
    loading: false,
    division: false,
    district: false,
    upazila: false,
    addPropertyLoader: false,
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setDivisionLoading(state, action: PayloadAction<boolean>) {
            state.division = action.payload;
        },
        setDistrictLoading(state, action: PayloadAction<boolean>) {
            state.district = action.payload;
        },
        setUpazilaLoading(state, action: PayloadAction<boolean>) {
            state.upazila = action.payload;
        },
        setAddPropertyLoader(state, action: PayloadAction<boolean>) {
            state.addPropertyLoader = action.payload;
        }

    }
})
export const { setLoading , setDistrictLoading, setDivisionLoading,setUpazilaLoading , setAddPropertyLoader } = loaderSlice.actions;
export default loaderSlice.reducer;