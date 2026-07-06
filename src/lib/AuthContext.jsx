import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const adminUser = {
  id: 'admin-1',
  name: 'Admin User',
  full_name: 'Admin User',
  email: 'inforicadev@gmail.com',
  role: 'admin'
};

const volunteerUser = {
  id: 'volunteer-1',
  name: 'Test Volunteer',
  full_name: 'Test Volunteer',
  email: 'volunteer@example.com',
  role: 'volunteer'
};

export function AuthProvider({ children }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(adminUser); // Default to admin for demo

  const switchUser = () => {
    setUser(prev => prev.role === 'admin' ? volunteerUser : adminUser);
  };

  const navigateToLogin = () => {
    console.log('Navigate to login (disabled for demo)');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoadingAuth, 
      isLoadingPublicSettings, 
      authError, 
      user, 
      switchUser,
      navigateToLogin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
