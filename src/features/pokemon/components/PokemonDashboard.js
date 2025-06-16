import React, { useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { PokemonFilters } from './PokemonFilters';
import { PokemonGrid } from './PokemonGrid';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

export const PokemonDashboard = () => {
  const { loadPokemon, loading, error, filteredPokemon } = usePokemon();

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  if (loading) {
    return <LoadingSpinner message="Loading Pokémon..." />;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error: {error}</p>
          <p className="mt-1">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <PokemonFilters />
      <PokemonGrid pokemon={filteredPokemon} />
    </main>
  );
};