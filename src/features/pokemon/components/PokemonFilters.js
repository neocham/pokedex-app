import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { SearchInput } from './SearchInput';
import { TypeFilter } from './TypeFilter';

export const PokemonFilters = () => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="sm:w-48">
          <TypeFilter />
        </div>
      </div>
    </div>
  );
};
