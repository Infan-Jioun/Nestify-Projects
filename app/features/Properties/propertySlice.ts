// app/features/Properties/propertySlice.ts
import { PropertyType } from "@/app/Types/properties";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface PropertyState {
  properties: PropertyType[];
  currentProperty: PropertyType | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  currentProperty: null,
  loading: false,
  error: null,
};

// Fetch all properties
export const fetchProperties = createAsyncThunk<
  PropertyType[],
  void,
  { rejectValue: string }
>("properties/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<PropertyType[]>("/api/properties");
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch properties");
  }
});

// Fetch single property by ID
export const fetchPropertyById = createAsyncThunk<
  PropertyType,
  string,
  { rejectValue: string }
>("properties/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<PropertyType>(`/api/properties/${id}`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch property");
  }
});

// Add a property
export const addProperty = createAsyncThunk<
  PropertyType,
  PropertyType,
  { rejectValue: string }
>("properties/add", async (newProperty, { rejectWithValue }) => {
  try {
    const response = await axios.post<PropertyType>("/api/properties", newProperty);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to add property");
  }
});

// Delete a property
export const deleteProperty = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("properties/delete", async (_id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/properties?id=${_id}`);
    if (response.status === 200) return _id;
    return rejectWithValue("Failed to delete property");
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to delete property");
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
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const property = state.properties.find(p => p._id === action.payload);
      if (property) {
        property.isFavorite = !property.isFavorite; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProperties
      .addCase(fetchProperties.pending, (state) => {
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

      // fetchPropertyById
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch property";
      })

      // addProperty
      .addCase(addProperty.pending, (state) => {
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
      })

      // deleteProperty
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete property";
      });
  },
});

export const {
  updatePropertyLocally,
  removePropertyLocally,
  clearCurrentProperty,
  clearError,
  toggleFavorite
} = propertySlice.actions;

export default propertySlice.reducer;
