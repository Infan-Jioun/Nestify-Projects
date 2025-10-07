// lib/slices/propertySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PropertyType } from "@/app/Types/properties";

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
    return rejectWithValue(error.response?.data?.message || "Failed to load properties");
  }
});

// Fetch properties by category
export const fetchPropertiesByCategory = createAsyncThunk<
  PropertyType[],
  string,
  { rejectValue: string }
>("properties/fetchByCategory", async (categoryName, { rejectWithValue }) => {
  try {
    const encodedCategoryName = encodeURIComponent(categoryName);
    const response = await axios.get<PropertyType[]>(
      `/api/properties/category/${encodedCategoryName}`
    );
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to load properties by category");
  }
});

// Fetch a single property by ID
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
    return rejectWithValue(error.response?.data?.message || "Failed to load property details");
  }
});

// Update property status
export const updatePropertyStatus = createAsyncThunk<
  PropertyType,
  { propertyId: string; status: "Available" | "Rented" | "Sold" | "Pending" },
  { rejectValue: string }
>("properties/updateStatus", async ({ propertyId, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ property: PropertyType }>(`/api/properties/${propertyId}`, {
      status
    });
    return response.data.property;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to update property status");
  }
});

// Add a new property
export const addProperty = createAsyncThunk<
  PropertyType,
  Omit<PropertyType, '_id'>,
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
    await axios.delete(`/api/properties/${_id}`);
    return _id;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to delete property");
  }
});

// Fetch properties by developer
export const fetchPropertiesByDeveloper = createAsyncThunk<
  PropertyType[],
  string,
  { rejectValue: string }
>("properties/fetchByDeveloper", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ properties: PropertyType[] }>(
      `/api/properties/developer/${userId}`
    );
    return response.data.properties;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to load developer properties");
  }
});

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const property = state.properties.find(p => p._id === action.payload);
      if (property) property.isFavorite = !property.isFavorite;

      if (state.currentProperty && state.currentProperty._id === action.payload) {
        state.currentProperty.isFavorite = !state.currentProperty.isFavorite;
      }
    },
    clearProperties: (state) => {
      state.properties = [];
    },
    updatePropertyStatusLocal: (
      state,
      action: PayloadAction<{ propertyId: string; status: "Available" | "Rented" | "Sold" | "Pending" }>
    ) => {
      const { propertyId, status } = action.payload;

      const index = state.properties.findIndex(p => p._id === propertyId);
      if (index !== -1) state.properties[index].status = status;

      if (state.currentProperty && state.currentProperty._id === propertyId) {
        state.currentProperty.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all properties
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
        state.error = action.payload || "Failed to load properties";
      })

      // Fetch by category
      .addCase(fetchPropertiesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchPropertiesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load properties by category";
      })

      // Fetch single property
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
        state.error = action.payload || "Failed to load property details";
      })

      // Update property status
      .addCase(updatePropertyStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePropertyStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProperty = action.payload;
        const index = state.properties.findIndex(p => p._id === updatedProperty._id);
        if (index !== -1) state.properties[index] = updatedProperty;

        if (state.currentProperty && state.currentProperty._id === updatedProperty._id) {
          state.currentProperty = updatedProperty;
        }
      })
      .addCase(updatePropertyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update property status";
      })

      // Add property
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
        state.error = action.payload || "Failed to add property";
      })

      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(p => p._id !== action.payload);

        if (state.currentProperty && state.currentProperty._id === action.payload) {
          state.currentProperty = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete property";
      })

      // Fetch by developer
      .addCase(fetchPropertiesByDeveloper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesByDeveloper.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchPropertiesByDeveloper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load developer properties";
      });
  },
});

export const {
  clearCurrentProperty,
  clearError,
  toggleFavorite,
  clearProperties,
  updatePropertyStatusLocal
} = propertySlice.actions;

export default propertySlice.reducer;