import { PropertyType } from "@/app/Types/properties";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PropertyState {
    properties: PropertyType[];
    loading: boolean;
    error: string | null;
}

const initialState: PropertyState = {
    properties: [],
    loading: false,
    error: null,
};

export const fetchProperties = createAsyncThunk<
    PropertyType[],
    void,
    { rejectValue: string }
>("properties/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get<PropertyType[]>("/api/properties");
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch properties");
        }
        return rejectWithValue("Failed to fetch properties");
    }
});

export const addProperty = createAsyncThunk<
    PropertyType,
    PropertyType,
    { rejectValue: string }
>("properties/add", async (newProperty, { rejectWithValue }) => {
    try {
        const response = await axios.post<PropertyType>("/api/properties", newProperty);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message || "Failed to add property");
        }
        return rejectWithValue("Failed to add property");
    }
});

const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        updatePropertyLocally: (state, action: PayloadAction<PropertyType>) => {
            const index = state.properties.findIndex(p => p._id === action.payload._id);
            if (index !== -1) state.properties[index] = action.payload;
        },
        removePropertyLocally: (state, action: PayloadAction<string>) => {
            state.properties = state.properties.filter(p => p._id !== action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProperties.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch properties";
            })
            .addCase(addProperty.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProperty.fulfilled, (state, action) => {
                state.loading = false;
                state.properties.push(action.payload);
            })
            .addCase(addProperty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to add property";
            });
    },
});

export const { updatePropertyLocally, removePropertyLocally } = propertySlice.actions;
export default propertySlice.reducer;
