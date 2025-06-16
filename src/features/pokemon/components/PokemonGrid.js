import React from 'react';
import { PokemonCard } from './PokemonCard';

export const PokemonGrid = ({ pokemon }) => {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">
          No Pokémon found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};