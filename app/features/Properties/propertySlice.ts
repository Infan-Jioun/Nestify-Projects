// app/features/Properties/propertySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PropertyType, PropertiesResponse, SessionUser } from "@/app/Types/properties";

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

// Fetch properties by developer
export const fetchPropertiesByEmail = createAsyncThunk<
  { properties: PropertyType[]; count: number },
  string,
  { rejectValue: string }
>('properties/fetchByEmail', async (email, { rejectWithValue }) => {
  try {
    const res = await axios.get<PropertiesResponse>(
      `/api/properties/real_estate_developer/by-email?email=${encodeURIComponent(email)}`
    );
    return {
      properties: res.data.properties,
      count: res.data.count
    };
  } catch (err: unknown) {
    const error = err as AxiosError<{ error?: string; message?: string }>;
    console.error('fetchPropertiesByEmail error:', error.response?.data);
    return rejectWithValue(
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Failed to fetch properties by email'
    );
  }
});

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
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to load properties"
    );
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
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to load properties by category"
    );
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
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to load property details"
    );
  }
});

// Update property status
export const updatePropertyStatus = createAsyncThunk<
  PropertyType,
  { propertyId: string; status: "Available" | "Rented" | "Sold" | "Pending" },
  { rejectValue: string }
>("properties/updateStatus", async ({ propertyId, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ property: PropertyType }>(
      `/api/properties/${propertyId}`,
      { status }
    );
    return response.data.property;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to update property status"
    );
  }
});

// Update property - ADD THIS MISSING ACTION
export const updateProperty = createAsyncThunk<
  PropertyType,
  { propertyId: string; propertyData: Partial<PropertyType> },
  { rejectValue: string }
>("properties/update", async ({ propertyId, propertyData }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ property: PropertyType }>(
      `/api/properties/${propertyId}`,
      propertyData
    );
    return response.data.property;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to update property"
    );
  }
});

// Add a new property
export const addProperty = createAsyncThunk<
  PropertyType,
  Omit<PropertyType, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>("properties/add", async (newProperty, { rejectWithValue }) => {
  try {
    const response = await axios.post<PropertyType>("/api/properties", newProperty);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to add property"
    );
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
    return rejectWithValue(
      error.response?.data?.message ||
      "Failed to delete property"
    );
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
      if (property) {
        property.isFavorite = !property.isFavorite;
      }

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
      if (index !== -1) {
        state.properties[index].status = status;
      }

      if (state.currentProperty && state.currentProperty._id === propertyId) {
        state.currentProperty.status = status;
      }
    },
    setPropertyAvailable: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;

      const index = state.properties.findIndex(p => p._id === propertyId);
      if (index !== -1) {
        state.properties[index].status = "Available";
      }

      if (state.currentProperty && state.currentProperty._id === propertyId) {
        state.currentProperty.status = "Available";
      }
    },
    setPropertySold: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;

      const index = state.properties.findIndex(p => p._id === propertyId);
      if (index !== -1) {
        state.properties[index].status = "Sold";
      }

      if (state.currentProperty && state.currentProperty._id === propertyId) {
        state.currentProperty.status = "Sold";
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch by developer
      .addCase(fetchPropertiesByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
      })
      .addCase(fetchPropertiesByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load developer properties";
      })

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
        if (index !== -1) {
          state.properties[index] = updatedProperty;
        }

        if (state.currentProperty && state.currentProperty._id === updatedProperty._id) {
          state.currentProperty = updatedProperty;
        }
      })
      .addCase(updatePropertyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update property status";
      })

      // Update property - ADD THIS MISSING CASE
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProperty = action.payload;
        const index = state.properties.findIndex(p => p._id === updatedProperty._id);
        if (index !== -1) {
          state.properties[index] = updatedProperty;
        }

        if (state.currentProperty && state.currentProperty._id === updatedProperty._id) {
          state.currentProperty = updatedProperty;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update property";
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
      });
  },
});

export const {
  clearCurrentProperty,
  clearError,
  toggleFavorite,
  clearProperties,
  updatePropertyStatusLocal,
  setPropertyAvailable,
  setPropertySold
} = propertySlice.actions;

export default propertySlice.reducer;