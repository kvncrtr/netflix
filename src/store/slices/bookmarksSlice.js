import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookmarkService } from '../../services';

// Async thunks
export const fetchBookmarks = createAsyncThunk(
   'bookmarks/fetchBookmarks',
   async (_, { rejectWithValue }) => {
      try {
         const response = await bookmarkService.getAll();
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookmarks');
      }
   }
);

export const addBookmark = createAsyncThunk(
   'bookmarks/addBookmark',
   async (contentId, { rejectWithValue }) => {
      try {
         const response = await bookmarkService.add(contentId);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to add bookmark');
      }
   }
);

export const removeBookmark = createAsyncThunk(
   'bookmarks/removeBookmark',
   async (contentId, { rejectWithValue }) => {
      try {
         await bookmarkService.remove(contentId);
         return contentId;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to remove bookmark');
      }
   }
);

// Initial state
const initialState = {
   bookmarks: [],
   loading: false,
   error: null,
};

// Slice
const bookmarksSlice = createSlice({
   name: 'bookmarks',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch Bookmarks
         .addCase(fetchBookmarks.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchBookmarks.fulfilled, (state, action) => {
            state.loading = false;
            state.bookmarks = action.payload;
         })
         .addCase(fetchBookmarks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Add Bookmark
         .addCase(addBookmark.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(addBookmark.fulfilled, (state, action) => {
            state.loading = false;
            state.bookmarks.push(action.payload);
         })
         .addCase(addBookmark.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Remove Bookmark
         .addCase(removeBookmark.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(removeBookmark.fulfilled, (state, action) => {
            state.loading = false;
            state.bookmarks = state.bookmarks.filter(
               (bookmark) => bookmark.id !== action.payload
            );
         })
         .addCase(removeBookmark.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { clearError } = bookmarksSlice.actions;

export default bookmarksSlice.reducer; 