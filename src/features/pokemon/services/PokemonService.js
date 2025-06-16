import { ApiClient } from '../../../shared/services/ApiClient';
import { PokemonMapper } from '../mappers/PokemonMapper';

export class PokemonService {
  static async fetchPokemonBatch(start = 1, limit = 150) {
    try {
      // Fetch the list first
      const listResponse = await ApiClient.get(`pokemon?offset=${start - 1}&limit=${limit}`);
      
      if (!listResponse.results) {
        throw new Error('Invalid response format');
      }

      // Batch fetch details with rate limiting
      const batchSize = 10;
      const pokemon = [];
      
      for (let i = 0; i < listResponse.results.length; i += batchSize) {
        const batch = listResponse.results.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (item) => {
          try {
            const details = await ApiClient.get(`pokemon/${item.name}`);
            return PokemonMapper.mapApiResponseToPokemon(details);
          } catch (error) {
            console.warn(`Failed to fetch ${item.name}:`, error);
            return null;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        pokemon.push(...batchResults.filter(Boolean));
        
        // Rate limiting delay between batches
        if (i + batchSize < listResponse.results.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return pokemon.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error fetching Pokemon batch:', error);
      throw new Error('Failed to fetch Pokemon data. Please try again.');
    }
  }
}
