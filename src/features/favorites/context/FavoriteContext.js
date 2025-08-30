import React, { createContext, useContext, useReducer, useCallback } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.some(p => p.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(p => p.id !== action.payload),
      };
    
    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
      };
    
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  const addToFavorites = useCallback((pokemon) => {
    dispatch({ type: 'ADD_FAVORITE', payload: pokemon });
  }, []);

  const removeFromFavorites = useCallback((pokemonId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: pokemonId });
  }, []);

  const clearFavorites = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  }, []);

  const isFavorite = useCallback((pokemonId) => {
    return state.favorites.some(p => p.id === pokemonId);
  }, [state.favorites]);

  const value = {
    favorites: state.favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// src/features/teams/context/TeamBuilderContext.js
import React, { createContext, useContext, useReducer, useCallback } from 'react';

const TeamBuilderContext = createContext();

export const useTeamBuilder = () => {
  const context = useContext(TeamBuilderContext);
  if (!context) {
    throw new Error('useTeamBuilder must be used within a TeamBuilderProvider');
  }
  return context;
};

const teamBuilderReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_TEAM':
      const newTeam = {
        id: Date.now(),
        name: action.payload.name,
        pokemon: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        teams: [...state.teams, newTeam],
        currentTeam: newTeam,
      };
    
    case 'SELECT_TEAM':
      return {
        ...state,
        currentTeam: state.teams.find(team => team.id === action.payload),
      };
    
    case 'ADD_TO_TEAM':
      if (!state.currentTeam || state.currentTeam.pokemon.length >= 6) {
        return state;
      }
      
      const updatedTeams = state.teams.map(team =>
        team.id === state.currentTeam.id
          ? { ...team, pokemon: [...team.pokemon, action.payload] }
          : team
      );
      
      return {
        ...state,
        teams: updatedTeams,
        currentTeam: {
          ...state.currentTeam,
          pokemon: [...state.currentTeam.pokemon, action.payload],
        },
      };
    
    case 'REMOVE_FROM_TEAM':
      if (!state.currentTeam) return state;
      
      const filteredTeams = state.teams.map(team =>
        team.id === state.currentTeam.id
          ? { ...team, pokemon: team.pokemon.filter(p => p.id !== action.payload) }
          : team
      );
      
      return {
        ...state,
        teams: filteredTeams,
        currentTeam: {
          ...state.currentTeam,
          pokemon: state.currentTeam.pokemon.filter(p => p.id !== action.payload),
        },
      };
    
    default:
      return state;
  }
};

export const TeamBuilderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(teamBuilderReducer, { 
    teams: [], 
    currentTeam: null 
  });

  const createTeam = useCallback((name) => {
    dispatch({ type: 'CREATE_TEAM', payload: { name } });
  }, []);

  const selectTeam = useCallback((teamId) => {
    dispatch({ type: 'SELECT_TEAM', payload: teamId });
  }, []);

  const addToTeam = useCallback((pokemon) => {
    dispatch({ type: 'ADD_TO_TEAM', payload: pokemon });
  }, []);

  const removeFromTeam = useCallback((pokemonId) => {
    dispatch({ type: 'REMOVE_FROM_TEAM', payload: pokemonId });
  }, []);

  const value = {
    teams: state.teams,
    currentTeam: state.currentTeam,
    createTeam,
    selectTeam,
    addToTeam,
    removeFromTeam,
  };

  return (
    <TeamBuilderContext.Provider value={value}>
      {children}
    </TeamBuilderContext.Provider>
  );
};
