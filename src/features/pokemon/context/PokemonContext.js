import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { pokemonReducer, initialState } from './pokemonReducer';
import { PokemonService } from '../services/PokemonService';
import { useStaleWhileRevalidate } from '../../../shared/hooks/useStaleWhileRevalidate';
import { PerformanceMonitor } from '../../../shared/services/PerformanceMonitor';

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

  // SWR for Pokemon data with caching and revalidation
  const {
    data: pokemonData,
    error: swrError,
    isLoading: swrLoading,
    isRevalidating,
    mutate,
  } = useStaleWhileRevalidate('pokemon-list', PokemonService.fetchPokemonBatch, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
  });

  // Update local state when SWR data changes
  React.useEffect(() => {
    if (pokemonData) {
      PerformanceMonitor.mark('pokemon-data-loaded');
      dispatch({ type: 'LOAD_SUCCESS', payload: pokemonData });
    }
  }, [pokemonData]);

  React.useEffect(() => {
    if (swrError) {
      dispatch({ type: 'LOAD_ERROR', payload: swrError.message });
    }
  }, [swrError]);

  React.useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: swrLoading });
  }, [swrLoading]);

  const setSearchTerm = useCallback((term) => {
    PerformanceMonitor.mark('search-start');
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    PerformanceMonitor.measure('search-execution', 'search-start');
  }, []);

  const setTypeFilter = useCallback((type) => {
    PerformanceMonitor.mark('filter-start');
    dispatch({ type: 'SET_TYPE_FILTER', payload: type });
    PerformanceMonitor.measure('filter-execution', 'filter-start');
  }, []);

  const value = {
    ...state,
    isRevalidating,
    setSearchTerm,
    setTypeFilter,
    refreshData: () => mutate(),
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};
