import { PokemonFilters } from '../utils/PokemonFilters';

export const initialState = {
  pokemon: [],
  filteredPokemon: [],
  searchTerm: '',
  typeFilter: '',
  loading: false,
  error: null,
  allTypes: [],
};

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'LOAD_SUCCESS':
      const allTypes = PokemonFilters.extractUniqueTypes(action.payload);
      return {
        ...state,
        pokemon: action.payload,
        filteredPokemon: action.payload,
        allTypes,
        loading: false,
        error: null,
      };

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_SEARCH_TERM':
      const newSearchTerm = action.payload;
      const filteredBySearch = PokemonFilters.filterPokemon(
        state.pokemon,
        newSearchTerm,
        state.typeFilter
      );
      return {
        ...state,
        searchTerm: newSearchTerm,
        filteredPokemon: filteredBySearch,
      };

    case 'SET_TYPE_FILTER':
      const newTypeFilter = action.payload;
      const filteredByType = PokemonFilters.filterPokemon(
        state.pokemon,
        state.searchTerm,
        newTypeFilter
      );
      return {
        ...state,
        typeFilter: newTypeFilter,
        filteredPokemon: filteredByType,
      };

    default:
      return state;
  }
};