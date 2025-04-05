import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const checkAuth = async () => {
         const token = localStorage.getItem('token');
         if (token) {
            try {
               const response = await authService.getProfile();
               setUser(response.data);
            } catch (error) {
               console.error('Authentication error:', error);
               localStorage.removeItem('token');
            }
         }
         setLoading(false);
      };

      checkAuth();
   }, []);

   const login = async (credentials) => {
      try {
         setLoading(true);
         setError(null);
         const response = await authService.login(credentials);
         localStorage.setItem('token', response.data.token);
         setUser(response.data.user);
         return response.data;
      } catch (error) {
         setError(error.response?.data?.message || 'Login failed');
         throw error;
      } finally {
         setLoading(false);
      }
   };

   const signup = async (userData) => {
      try {
         setLoading(true);
         setError(null);
         const response = await authService.signup(userData);
         localStorage.setItem('token', response.data.token);
         setUser(response.data.user);
         return response.data;
      } catch (error) {
         setError(error.response?.data?.message || 'Signup failed');
         throw error;
      } finally {
         setLoading(false);
      }
   };

   const logout = () => {
      localStorage.removeItem('token');
      setUser(null);
   };

   const value = {
      user,
      loading,
      error,
      login,
      signup,
      logout,
      isAuthenticated: !!user
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 