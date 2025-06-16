import React from 'react';
import { TypeBadge } from './TypeBadge';

export const PokemonTypes = ({ types }) => {
  if (!types || types.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {types.map(type => (
        <TypeBadge key={type} type={type} />
      ))}
    </div>
  );
};