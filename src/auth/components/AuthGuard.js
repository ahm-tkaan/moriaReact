import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthGuard = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
