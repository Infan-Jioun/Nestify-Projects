import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
    results: string[];
}

const initialState: SearchState = {
    query: "",
    results: [],
};

const SearchLocationSlice = createSlice({
    name: "searchLocation",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setResults: (state, action: PayloadAction<string[]>) => {
            state.results = action.payload;
        },
        clearSearch: (state) => {
            state.query = "";
            state.results = [];
        },
    },
});

export const { setQuery, setResults, clearSearch } = SearchLocationSlice.actions;
export default SearchLocationSlice.reducer;
