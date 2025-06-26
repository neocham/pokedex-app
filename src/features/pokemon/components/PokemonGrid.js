import React from 'react';
import { PokemonCard } from './PokemonCard';
import { SkeletonCard } from '../../../shared/components/SkeletonCard';
import { useVirtualization } from '../../../shared/hooks/useVirtualization';

export const PokemonGrid = ({ pokemon, isLoading }) => {
  const gridRef = React.useRef(null);
  
  // Virtual scrolling for performance with large lists
  const {
    visibleItems,
    totalHeight,
    startIndex,
    endIndex,
  } = useVirtualization({
    items: pokemon,
    itemHeight: 320,
    containerHeight: 800,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" aria-live="polite" aria-label="Loading Pokemon">
        {Array.from({ length: 20 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-16" role="status">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Pokémon Found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find the Pokémon you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={gridRef} role="region" aria-label="Pokemon grid" aria-live="polite">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {visibleItems.map((pokemon, index) => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon}
            isVisible={index >= startIndex && index <= endIndex}
          />
        ))}
      </div>
      
      {/* Screen reader announcement for dynamic content */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {pokemon.length} Pokémon
      </div>
    </div>
  );
};
