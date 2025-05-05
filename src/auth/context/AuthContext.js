import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (user) => {
      if (user) {
        setCurrentUser(user);
        // Kullanıcı profil bilgilerini getir
        const profile = await userService.getUserProfile(user.uid);
        if (profile.success) {
          setUserProfile(profile.data);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserProfile = async () => {
    console.log('refreshUserProfile çağırıldı');
    if (currentUser) {
      console.log('currentUser var, profil alınıyor...');
      const profile = await userService.getUserProfile(currentUser.uid);
      console.log('getUserProfile result:', profile);
      
      if (profile.success) {
        console.log('Profil başarıyla alındı, userProfile güncelleniyor:', profile.data);
        setUserProfile(profile.data);
      }
    } else {
      console.log('currentUser yok!');
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    register: authService.register,
    login: authService.login,
    logout: authService.logout,
    resetPassword: authService.resetPassword,
    updateUserProfile: userService.updateUserProfile,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth hook must be used within AuthProvider');
  }
  return context;
};
