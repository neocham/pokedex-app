import React from 'react';
import { Navigation } from './Navigation';
import { NotificationCenter } from './NotificationCenter';
import { useTheme } from '../context/ThemeContext';

export const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
      <NotificationCenter />
    </div>
  );
};