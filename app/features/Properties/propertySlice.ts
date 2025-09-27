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

//  Fetch all properties
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

//  Fetch properties by category
export const fetchPropertiesByCategory = createAsyncThunk<
  PropertyType[],
  string,
  { rejectValue: string }
>("properties/fetchByCategory", async (categoryName, { rejectWithValue }) => {
  try {
    const encodedCategoryName = encodeURIComponent(categoryName);
    const response = await axios.get<PropertyType[]>(`/api/properties/category/${encodedCategoryName}`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch properties by category");
  }
});

//  Fetch single property by ID
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

//  Add a property
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

//  Delete a property
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
    },
    clearProperties: (state) => {
      state.properties = [];
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
        state.error = action.payload || "Failed to fetch properties";
      })

      // Fetch properties by category
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
        state.error = action.payload || "Failed to fetch properties by category";
      })

      // Fetch property by ID
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
        state.error = action.payload || "Failed to fetch property";
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
  clearProperties
} = propertySlice.actions;

export default propertySlice.reducer;