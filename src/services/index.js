import api, { authService, moviesService, tvSeriesService, bookmarkService, userService } from './api';
import mockApi from './mockApi';

// Use mock API in development, real API in production
const isDevelopment = process.env.NODE_ENV === 'development';
const apiService = isDevelopment ? mockApi : api;

// Export all services
export {
   authService,
   moviesService,
   tvSeriesService,
   bookmarkService,
   userService,
   apiService as default
}; 