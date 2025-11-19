// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          // For now, set mock user data
          // In a real app, you would decode the JWT token or make an API call
          setUser({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            roles: ['user']
          });
        } catch (error) {
          console.error('Error parsing token:', error);
          localStorage.removeItem('jwt_token');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock login - replace with actual API call
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('jwt_token', mockToken);
        
        const userData = {
          id: '1',
          name: 'Test User',
          email: email,
          roles: ['user']
        };
        
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Email and password are required' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    // Optional: redirect to login page
    window.location.href = '/login';
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('jwt_token');
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context itself (optional, for advanced usage)
export default AuthContext;