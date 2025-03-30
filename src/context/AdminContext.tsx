import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SiteSettings {
  siteName: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

interface AdminContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// In a real application, these would be stored securely in environment variables
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'safiyalar2024';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Safiyalar',
    theme: {
      primaryColor: '#9333ea', // purple-600
      secondaryColor: '#4b5563', // gray-600
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    // TODO: Save to Supabase
  };

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};