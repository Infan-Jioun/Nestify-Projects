import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyType } from "@/app/Types/properties";

interface BookmarkState {
  bookmarkedProperties: PropertyType[];
}

const initialState: BookmarkState = {
  bookmarkedProperties: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<PropertyType>) => {
      const existingProperty = state.bookmarkedProperties.find(
        (property) => property._id === action.payload._id
      );
      if (!existingProperty) {
        state.bookmarkedProperties.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarkedProperties = state.bookmarkedProperties.filter(
        (property) => property._id !== action.payload
      );
    },
    toggleBookmark: (state, action: PayloadAction<PropertyType>) => {
      const existingIndex = state.bookmarkedProperties.findIndex(
        (property) => property._id === action.payload._id
      );
      
      if (existingIndex >= 0) {
        state.bookmarkedProperties.splice(existingIndex, 1);
      } else {
     
        state.bookmarkedProperties.push(action.payload);
      }
    },
    clearAllBookmarks: (state) => {
      state.bookmarkedProperties = [];
    },
  },
});

export const { addBookmark, removeBookmark, toggleBookmark, clearAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;