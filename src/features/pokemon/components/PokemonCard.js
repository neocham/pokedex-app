import React from 'react';
import { PokemonImage } from './PokemonImage';
import { PokemonInfo } from './PokemonInfo';
import { PokemonTypes } from './PokemonTypes';

export const PokemonCard = React.memo(({ pokemon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200">
      <div className="p-4 flex flex-col items-center">
        <PokemonImage pokemon={pokemon} />
        <PokemonInfo pokemon={pokemon} />
        <PokemonTypes types={pokemon.types} />
      </div>
    </div>
  );
});
// Memoizing the component to prevent unnecessary re-renders