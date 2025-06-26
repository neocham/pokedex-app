import React from 'react';
import { PokemonImage } from './PokemonImage';
import { PokemonInfo } from './PokemonInfo';
import { PokemonTypes } from './PokemonTypes';
import { PerformanceMonitor } from '../../../shared/services/PerformanceMonitor';

export const PokemonCard = React.memo(({ pokemon, isVisible = true }) => {
  const cardRef = React.useRef(null);
  
  React.useEffect(() => {
    if (!cardRef.current) return;
    
    // Content visibility optimization for off-screen elements
    if ('content-visibility' in cardRef.current.style) {
      cardRef.current.style.contentVisibility = isVisible ? 'visible' : 'auto';
      cardRef.current.style.containIntrinsicSize = '200px 280px';
    }
  }, [isVisible]);

  const handleCardClick = () => {
    PerformanceMonitor.mark('pokemon-card-click');
    // Future: Navigate to pokemon detail page
  };

  return (
    <article
      ref={cardRef}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200 cursor-pointer focus-within:ring-2 focus-within:ring-red-500"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${pokemon.name}`}
    >
      <div className="p-4 flex flex-col items-center">
        <PokemonImage pokemon={pokemon} />
        <PokemonInfo pokemon={pokemon} />
        <PokemonTypes types={pokemon.types} />
      </div>
    </article>
  );
});
