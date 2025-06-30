/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, removeToken } from './jwt';
import { axiosInstance } from './api';

interface User {
  id: string;
  _id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = async (token: string) => {
    try {
      const res = await axiosInstance.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const rawUserData = (res as any).data?.data as User & { photoURL?: string };
      const userData: User = {
        ...rawUserData,
        photoURL: rawUserData.photoURL || rawUserData.photoURL || undefined,
      };
      setUser(userData);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser(token).finally(() => setLoading(false));
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('jwt_token', token);
    await fetchUser(token);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 