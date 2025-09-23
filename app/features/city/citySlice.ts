import { CityInfo } from "@/lib/CityInfo";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface CityState {
    city: CityInfo[];
    loading: boolean;
    error: string | null;
}

const initialState: CityState = {
    city: [],
    loading: false,
    error: null,
};

// Async thunk to fetch cities
export const fetchCities = createAsyncThunk<CityInfo[], void, { rejectValue: string }>(
    "city/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<CityInfo[]>("/api/addCity");
            return response.data; // <-- you were missing this
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch cities");
        }
    }
);

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        updateCityLocally: (state, action: PayloadAction<CityInfo>) => {
            const index = state.city.findIndex(c => c.cityName === action.payload.cityName);
            if (index !== -1) {
                state.city[index] = action.payload;
            } else {
                state.city.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action: PayloadAction<CityInfo[]>) => {
                state.loading = false;
                state.city = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch cities";
            });
    },
});

export const { updateCityLocally } = citySlice.actions;
export default citySlice.reducer;
