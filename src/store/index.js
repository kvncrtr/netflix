import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import moviesReducer from './slices/moviesSlice';
import tvSeriesReducer from './slices/tvSeriesSlice';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
   reducer: {
      auth: authReducer,
      movies: moviesReducer,
      tvSeries: tvSeriesReducer,
      bookmarks: bookmarksReducer,
   },
}); 