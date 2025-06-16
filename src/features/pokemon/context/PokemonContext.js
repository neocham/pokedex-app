import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { pokemonReducer, initialState } from './pokemonReducer';
import { PokemonService } from '../services/PokemonService';

const PokemonContext = createContext();

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const loadPokemon = useCallback(async () => {
    if (state.loading || state.pokemon.length > 0) return;

    dispatch({ type: 'LOAD_START' });
    
    try {
      const pokemon = await PokemonService.fetchPokemonBatch(1, 150);
      dispatch({ type: 'LOAD_SUCCESS', payload: pokemon });
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error.message });
    }
  }, [state.loading, state.pokemon.length]);

  const setSearchTerm = useCallback((term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const setTypeFilter = useCallback((type) => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: type });
  }, []);

  const value = {
    ...state,
    loadPokemon,
    setSearchTerm,
    setTypeFilter,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};