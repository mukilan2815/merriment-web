
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, User } from '@/services/authService';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const currentUser = await AuthService.getCurrentUser();
          setUser(currentUser);
          setIsAdmin(currentUser.role === 'admin');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // If there's an error, clear the token
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
