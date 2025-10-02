import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PropertyType } from "@/app/Types/properties";
import type { RootState } from "@/lib/store";

export type Suggestion =
  | {
      type: "category";
      title: string;
    }
  | {
      type: "property";
      id: string;
      title: string;
      subtitle?: string;
      image?: string;
      category?: string;
    };

interface SearchState {
  query: string;
  suggestions: Suggestion[];
  recent: string[];
  loading: boolean;
  error: string | null;
}

const loadRecentFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("searchRecent");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveRecentToStorage = (recent: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("searchRecent", JSON.stringify(recent));
};

const initialState: SearchState = {
  query: "",
  suggestions: [],
  recent: loadRecentFromStorage(),
  loading: false,
  error: null,
};

export const fetchSuggestions = createAsyncThunk<
  Suggestion[],
  string,
  { rejectValue: string }
>("search/fetchSuggestions", async (q, { rejectWithValue }) => {
  try {
    const qTrim = q.trim();
    if (!qTrim || qTrim.length < 2) return [];

    const res = await axios.get<PropertyType[]>("/api/properties");
    const all = res.data || [];

    const qLower = qTrim.toLowerCase();

    // Property matches
    const propertyMatches = all
      .filter((p) =>
        [
          p.title ?? "",
          p.address ?? "",
          p.category?.name ?? "",
          (p.propertyFacilities || []).join(" "),
          (p.geoCountryLocation || ""),
        ]
          .join(" ")
          .toLowerCase()
          .includes(qLower)
      )
      .slice(0, 6)
      .map(
        (p) =>
          ({
            type: "property",
            id: p._id,
            title: p.title,
            subtitle: `${p.address ?? ""}${
              p.category?.name ? " • " + p.category.name : ""
            }`,
            image: p.images?.[0],
            category: p.category?.name,
          } as Suggestion)
      );

    // Category matches
    const catSet = new Set<string>();
    all.forEach((p) => {
      const name = p.category?.name;
      if (name && name.toLowerCase().includes(qLower)) catSet.add(name);
    });
    const categoryMatches = Array.from(catSet)
      .slice(0, 4)
      .map((c) => ({ type: "category", title: c } as Suggestion));

    const combined: Suggestion[] = [...categoryMatches, ...propertyMatches];
    return combined;
  } catch (err: unknown) {
    const msg = axios.isAxiosError(err)
      ? err.message
      : "Failed to fetch suggestions";
    return rejectWithValue(msg);
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
    addRecent(state, action: PayloadAction<string>) {
      const val = action.payload.trim();
      if (!val) return;
      state.recent = [val, ...state.recent.filter((r) => r !== val)].slice(0, 10);
      saveRecentToStorage(state.recent);
    },
    removeRecent(state, action: PayloadAction<string>) {
      state.recent = state.recent.filter((r) => r !== action.payload);
      saveRecentToStorage(state.recent);
    },
    clearRecent(state) {
      state.recent = [];
      saveRecentToStorage([]);
    },
    loadRecent(state) {
      state.recent = loadRecentFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch suggestions";
      });
  },
});

export const { setQuery, clearSuggestions, addRecent, removeRecent, clearRecent, loadRecent } =
  searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
