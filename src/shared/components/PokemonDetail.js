import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../context/PokemonContext';
import { useFavorites } from '../../favorites/context/FavoritesContext';
import { useNotifications } from '../../../shared/context/NotificationContext';
import { PokemonStats } from './PokemonStats';
import { PokemonMoves } from './PokemonMoves';
import { PokemonEvolution } from './PokemonEvolution';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

export const PokemonDetail = () => {
  const { id } = useParams();
  const { pokemon } = usePokemon();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addNotification } = useNotifications();

  const pokemonData = pokemon.find(p => p.id === parseInt(id));

  if (!pokemonData) {
    return (
      <div className="text-center">
        <LoadingSpinner message="Loading Pokemon details..." />
        <Link to="/" className="mt-4 text-red-600 hover:text-red-700">
          ← Back to Pokédex
        </Link>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(pokemonData.id)) {
      removeFromFavorites(pokemonData.id);
      addNotification({
        type: 'info',
        message: `${pokemonData.name} removed from favorites`
      });
    } else {
      addToFavorites(pokemonData);
      addNotification({
        type: 'success',
        message: `${pokemonData.name} added to favorites!`
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-red-600 hover:text-red-700 flex items-center">
          ← Back to Pokédex
        </Link>
        <button
          onClick={handleFavoriteToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isFavorite(pokemonData.id)
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{isFavorite(pokemonData.id) ? '❤️' : '🤍'}</span>
          <span>{isFavorite(pokemonData.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>
      </div>

      {/* Pokemon Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <img
              src={pokemonData.image}
              alt={pokemonData.name}
              className="w-64 h-64 mx-auto object-contain mb-4"
            />
            <h1 className="text-4xl font-bold capitalize mb-2">{pokemonData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">#{pokemonData.id.toString().padStart(3, '0')}</p>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Height:</span>
                  <p>{(pokemonData.height / 10).toFixed(1)}m</p>
                </div>
                <div>
                  <span className="font-medium">Weight:</span>
                  <p>{(pokemonData.weight / 10).toFixed(1)}kg</p>
                </div>
                <div>
                  <span className="font-medium">Types:</span>
                  <div className="flex space-x-2 mt-1">
                    {pokemonData.types.map(type => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Abilities:</span>
                  <ul className="mt-1">
                    {pokemonData.abilities.map(ability => (
                      <li key={ability} className="capitalize">{ability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats, Moves, Evolution */}
      <div className="grid lg:grid-cols-2 gap-8">
        <PokemonStats pokemon={pokemonData} />
        <PokemonMoves pokemon={pokemonData} />
      </div>
      
      <div className="mt-8">
        <PokemonEvolution pokemon={pokemonData} />
      </div>
    </div>
  );
};