import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    query: string;
    results: string[];
}

const initialState: SearchState = {
    query: "",
    results: [],
};

const searchLocationSlice = createSlice({
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

export const { setQuery, setResults, clearSearch } = searchLocationSlice.actions;
export default searchLocationSlice.reducer;
