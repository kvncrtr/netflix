import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services';

// Async thunks
export const login = createAsyncThunk(
   'auth/login',
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await authService.login(credentials);
         localStorage.setItem('token', response.data.token);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
   }
);

export const signup = createAsyncThunk(
   'auth/signup',
   async (userData, { rejectWithValue }) => {
      try {
         const response = await authService.signup(userData);
         localStorage.setItem('token', response.data.token);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Signup failed');
      }
   }
);

export const getProfile = createAsyncThunk(
   'auth/getProfile',
   async (_, { rejectWithValue }) => {
      try {
         const response = await authService.getProfile();
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data?.message || 'Failed to get profile');
      }
   }
);

// Initial state
const initialState = {
   user: null,
   token: localStorage.getItem('token') || null,
   isAuthenticated: !!localStorage.getItem('token'),
   loading: false,
   error: null,
};

// Slice
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         localStorage.removeItem('token');
         state.user = null;
         state.token = null;
         state.isAuthenticated = false;
         state.error = null;
      },
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         // Login
         .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Signup
         .addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
         })
         .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         // Get Profile
         .addCase(getProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
         })
         .addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
         });
   },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer; 