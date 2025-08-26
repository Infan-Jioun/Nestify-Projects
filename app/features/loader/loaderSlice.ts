import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface LoaderState {
    loading: boolean; // global loading
    division: boolean;
    district: boolean;
    upazila: boolean;
}

const initialState: LoaderState = {
    loading: false,
    division: false,
    district: false,
    upazila: false,
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

    }
})
export const { setLoading , setDistrictLoading, setDivisionLoading,setUpazilaLoading } = loaderSlice.actions;
export default loaderSlice.reducer;