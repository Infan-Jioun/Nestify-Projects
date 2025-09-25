

import { DistrictInfo } from "@/lib/districtInfo";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface districtState {
    district: DistrictInfo[];
    loading: boolean;
    error: string | null;
}

const initialState: districtState = {
    district: [],
    loading: false,
    error: null,
};

// Async thunk to fetch district data
export const fetchDistrict = createAsyncThunk<DistrictInfo[], void, { rejectValue: string }>(
    "district/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<DistrictInfo[]>("/api/addDistrict");
            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch district");
        }   
    }
);

const districtSlice = createSlice({
    name: "district",
    initialState,
    reducers: {
        updatedistrictLocally: (state, action: PayloadAction<DistrictInfo>) => {
            const index = state.district.findIndex(c => c.districtName === action.payload.districtName);
            if (index !== -1) {
                state.district[index] = action.payload;
            } else {
                state.district.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDistrict.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDistrict.fulfilled, (state, action: PayloadAction<DistrictInfo[]>) => {
                state.loading = false;
                state.district = action.payload;
            })
            .addCase(fetchDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch district";
            });
    },
});

export const { updatedistrictLocally } = districtSlice.actions;
export default districtSlice.reducer;
