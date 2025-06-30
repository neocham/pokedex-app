import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../../features/favorites/context/FavoritesContext';
import { useTeamBuilder } from '../../features/teams/context/TeamBuilderContext';

export const Navigation = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { teams } = useTeamBuilder();

  const navItems = [
    { path: '/', label: 'Pokédex', icon: '📱' },
    { path: '/favorites', label: 'Favorites', icon: '❤️', badge: favorites.length },
    { path: '/teams', label: 'Teams', icon: '👥', badge: teams.length },
    { path: '/battle', label: 'Battle', icon: '⚔️' },
    { path: '/stats', label: 'Stats', icon: '📊' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 border-b ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-red-600">PokéMaster</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex justify-around">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-md text-xs ${
                  isActive(item.path)
                    ? 'text-red-600'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <div className="relative">
                  <span className="text-lg">{item.icon}</span>
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
