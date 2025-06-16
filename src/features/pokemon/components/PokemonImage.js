import React from 'react';
import { StringUtils } from '../../../shared/utils/StringUtils';

export const PokemonImage = ({ pokemon }) => {
  if (!pokemon.image) {
    return (
      <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-full mb-2">
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  }

  return (
    <img
      src={pokemon.image}
      alt={StringUtils.capitalize(pokemon.name)}
      className="w-32 h-32 object-contain mb-2"
      loading="lazy"
    />
  );
};