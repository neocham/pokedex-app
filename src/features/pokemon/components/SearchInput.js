import React from 'react';
import { usePokemon } from '../context/PokemonContext';

export const SearchInput = () => {
  const { searchTerm, setSearchTerm } = usePokemon();

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
    />
  );
};