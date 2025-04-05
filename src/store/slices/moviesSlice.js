import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moviesService } from '../../services';

// Async thunks
export const fetchMovies = createAsyncThunk(
   'movies/fetchMovies',
   async (_, { rejectWithValue }) => {
      try {
         const response = await moviesService.getAll();
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to fetch movies');
      }
   }
);

export const fetchMovieById = createAsyncThunk(
   'movies/fetchMovieById',
   async (id, { rejectWithValue }) => {
      try {
         const response = await moviesService.getById(id);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to fetch movie');
      }
   }
);

// Initial state
const initialState = {
   movies: [],
   selectedMovie: null,
   loading: false,
   error: null,
};

// Slice
const moviesSlice = createSlice({
   name: 'movies',
   initialState,
   reducers: {
      clearSelectedMovie: (state) => {
         state.selectedMovie = null;
      },
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch Movies
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Fetch Movie by ID
         .addCase(fetchMovieById.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchMovieById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedMovie = action.payload;
         })
         .addCase(fetchMovieById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

export const { clearSelectedMovie, clearError } = moviesSlice.actions;

export default moviesSlice.reducer; 