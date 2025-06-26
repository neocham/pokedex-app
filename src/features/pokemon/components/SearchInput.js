import React from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { PerformanceMonitor } from '../../../shared/services/PerformanceMonitor';

export const SearchInput = () => {
  const { searchTerm, setSearchTerm } = usePokemon();
  const [inputValue, setInputValue] = React.useState(searchTerm);
  
  // Debounce search to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  React.useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      PerformanceMonitor.mark('search-debounced');
      setSearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchTerm, setSearchTerm]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <label htmlFor="pokemon-search" className="sr-only">
        Search Pokémon by name
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          id="pokemon-search"
          type="search"
          placeholder="Search Pokémon..."
          value={inputValue}
          onChange={handleInputChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
          aria-describedby="search-help"
          autoComplete="off"
          spellCheck="false"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <p id="search-help" className="sr-only">
        Search results will appear as you type. Use arrow keys to navigate through results.
      </p>
    </div>
  );
};
// This component provides a search input for filtering Pokémon by name.
// It uses a debounced input to minimize performance impact during typing.