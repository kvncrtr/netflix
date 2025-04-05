import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
   baseURL: '/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
   (response) => response,
   (error) => {
      // Handle 401 Unauthorized errors (token expired)
      if (error.response && error.response.status === 401) {
         localStorage.removeItem('token');
         window.location.href = '/login';
      }
      return Promise.reject(error);
   }
);

// Auth services
export const authService = {
   login: (credentials) => api.post('/login', credentials),
   signup: (userData) => api.post('/signup', userData),
   logout: () => {
      localStorage.removeItem('token');
      window.location.href = '/login';
   },
};

// Movies services
export const moviesService = {
   getAll: () => api.get('/movies'),
   getById: (id) => api.get(`/movies/${id}`),
   getTrending: () => api.get('/movies/trending'),
   search: (query) => api.get(`/movies/search?q=${query}`),
};

// TV Series services
export const tvSeriesService = {
   getAll: () => api.get('/tv-series'),
   getById: (id) => api.get(`/tv-series/${id}`),
   getTrending: () => api.get('/tv-series/trending'),
   search: (query) => api.get(`/tv-series/search?q=${query}`),
};

// Bookmark services
export const bookmarkService = {
   getAll: () => api.get('/bookmarks'),
   add: (contentId, contentType) => api.post('/bookmarks', { contentId, contentType }),
   remove: (id) => api.delete(`/bookmarks/${id}`),
   isBookmarked: (contentId) => api.get(`/bookmarks/check/${contentId}`),
};

// User services
export const userService = {
   getProfile: () => api.get('/user/profile'),
   updateProfile: (userData) => api.put('/user/profile', userData),
   changePassword: (passwordData) => api.put('/user/password', passwordData),
};

export default api; 