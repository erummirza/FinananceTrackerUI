// components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check roles if required
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      user?.roles?.includes(role)
    );
    
    if (!hasRequiredRole) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Access Denied</h3>
          <p>You don't have permission to access this page.</p>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;