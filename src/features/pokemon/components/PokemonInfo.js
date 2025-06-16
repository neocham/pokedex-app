import React from 'react';
import { StringUtils } from '../../../shared/utils/StringUtils';

export const PokemonInfo = ({ pokemon }) => {
  return (
    <div className="text-center mb-2">
      <h2 className="text-lg font-bold text-gray-800">
        {StringUtils.capitalize(pokemon.name)}
      </h2>
      <div className="text-gray-600 text-sm">
        #{StringUtils.formatId(pokemon.id)}
      </div>
    </div>
  );
};
