import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "@/app/Types/user";
import { PropertyType } from "@/app/Types/properties";

interface DeveloperStatistics {
    total: number;
    available: number;
    sold: number;
    rented: number;
}

interface DeveloperState {
    developer: User | null;
    properties: PropertyType[];
    statistics: DeveloperStatistics;
    loading: boolean;
    error: string | null;
}

const initialState: DeveloperState = {
    developer: null,
    properties: [],
    statistics: {
        total: 0,
        available: 0,
        sold: 0,
        rented: 0
    },
    loading: false,
    error: null,
};

// Fetch developer profile with properties
export const fetchDeveloperProfile = createAsyncThunk<
    { developer: User; properties: PropertyType[]; statistics: DeveloperStatistics },
    string,
    { rejectValue: string }
>("developer/fetchProfile", async (developerId, { rejectWithValue }) => {
    try {
        const response = await axios.get<{
            developer: User;
            properties: PropertyType[];
            statistics: DeveloperStatistics;
        }>(`/api/developers/${developerId}`);

        return response.data;
    } catch (err: unknown) {
        const error = err as AxiosError<{ error?: string; message?: string }>;
        return rejectWithValue(
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Failed to load developer profile"
        );
    }
});

const developerSlice = createSlice({
    name: "developer",
    initialState,
    reducers: {
        clearDeveloper: (state) => {
            state.developer = null;
            state.properties = [];
            state.statistics = initialState.statistics;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeveloperProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeveloperProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.developer = action.payload.developer;
                state.properties = action.payload.properties;
                state.statistics = action.payload.statistics;
            })
            .addCase(fetchDeveloperProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load developer profile";
            });
    },
});

export const { clearDeveloper, clearError } = developerSlice.actions;
export default developerSlice.reducer;