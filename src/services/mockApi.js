// Mock data
import data from '../data.json';

// Helper function to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter data
const filterData = (items, query) => {
   if (!query) return items;
   const lowercaseQuery = query.toLowerCase();
   return items.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.category.some(cat => cat.toLowerCase().includes(lowercaseQuery))
   );
};

// Mock API service
const mockApi = {
   // Auth
   login: async (credentials) => {
      await delay(800);
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
         return { data: { token: 'mock-jwt-token', user: { id: 1, name: 'Test User', email: 'user@example.com' } } };
      }
      throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
   },

   signup: async (userData) => {
      await delay(1000);
      return { data: { token: 'mock-jwt-token', user: { id: 1, ...userData } } };
   },

   // Movies
   getMovies: async () => {
      await delay(500);
      return { data: data.movies };
   },

   getMovieById: async (id) => {
      await delay(300);
      const movie = data.movies.find(m => m.id === parseInt(id));
      if (!movie) throw { response: { status: 404, data: { message: 'Movie not found' } } };
      return { data: movie };
   },

   getTrendingMovies: async () => {
      await delay(400);
      return { data: data.movies.filter(m => m.isTrending) };
   },

   searchMovies: async (query) => {
      await delay(600);
      return { data: filterData(data.movies, query) };
   },

   // TV Series
   getTvSeries: async () => {
      await delay(500);
      return { data: data.tvSeries };
   },

   getTvSeriesById: async (id) => {
      await delay(300);
      const series = data.tvSeries.find(s => s.id === parseInt(id));
      if (!series) throw { response: { status: 404, data: { message: 'TV Series not found' } } };
      return { data: series };
   },

   getTrendingTvSeries: async () => {
      await delay(400);
      return { data: data.tvSeries.filter(s => s.isTrending) };
   },

   searchTvSeries: async (query) => {
      await delay(600);
      return { data: filterData(data.tvSeries, query) };
   },

   // Bookmarks
   getBookmarks: async () => {
      await delay(500);
      return { data: data.bookmarks };
   },

   addBookmark: async (contentId, contentType) => {
      await delay(300);
      return { data: { id: Date.now(), contentId, contentType } };
   },

   removeBookmark: async (id) => {
      await delay(300);
      return { data: { success: true } };
   },

   checkBookmark: async (contentId) => {
      await delay(200);
      const isBookmarked = data.bookmarks.some(b => b.contentId === contentId);
      return { data: { isBookmarked } };
   },

   // User
   getUserProfile: async () => {
      await delay(400);
      return { data: { id: 1, name: 'Test User', email: 'user@example.com' } };
   },

   updateUserProfile: async (userData) => {
      await delay(500);
      return { data: { id: 1, ...userData } };
   },

   changePassword: async (passwordData) => {
      await delay(500);
      return { data: { success: true } };
   }
};

export default mockApi; 