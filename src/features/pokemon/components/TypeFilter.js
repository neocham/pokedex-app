import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { StringUtils } from '../../../shared/utils/StringUtils';

export const TypeFilter = () => {
  const { typeFilter, setTypeFilter, allTypes } = usePokemon();

  return (
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
    >
      <option value="">All Types</option>
      {allTypes.map(type => (
        <option key={type} value={type}>
          {StringUtils.capitalize(type)}
        </option>
      ))}
    </select>
  );
};
