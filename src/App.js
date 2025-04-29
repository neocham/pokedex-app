import { useState, useEffect } from "react";
import "./index.css"; // Add explicit import here

export default function PokedexApp() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTypes, setAllTypes] = useState([]);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Get list of first 150 Pokémon
        const listResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        
        if (!listResponse.ok) {
          throw new Error("Failed to fetch Pokémon list");
        }
        
        const listData = await listResponse.json();
        
        // Create array to store detailed Pokémon data
        const detailedPokemon = [];
        
        // Fetch details for each Pokémon one by one to avoid rate limiting
        for (const item of listData.results) {
          try {
            const detailResponse = await fetch(item.url);
            
            if (!detailResponse.ok) {
              console.error(`Failed to fetch details for ${item.name}`);
              continue; // Skip this Pokémon but continue with others
            }
            
            const pokemonData = await detailResponse.json();
            
            detailedPokemon.push({
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map(type => type.type.name),
            });
          } catch (detailError) {
            console.error(`Error fetching details for ${item.name}:`, detailError);
            // Continue with the next Pokémon
          }
        }
        
        // Sort by Pokémon ID
        detailedPokemon.sort((a, b) => a.id - b.id);
        
        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        
        // Extract all unique types
        const typesSet = new Set();
        detailedPokemon.forEach(p => p.types.forEach(type => typesSet.add(type)));
        setAllTypes(Array.from(typesSet).sort());
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setError(err.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokémon when search term or type filter changes
  useEffect(() => {
    if (pokemon.length > 0) {
      const results = pokemon.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = typeFilter === "" || p.types.includes(typeFilter);
        return nameMatch && typeMatch;
      });
      
      setFilteredPokemon(results);
    }
  }, [searchTerm, typeFilter, pokemon]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  // Capitalize first letter of a string
  const capitalize = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Get background color based on Pokémon type
  const getTypeColor = (type) => {
    const colors = {
      grass: 'bg-green-500',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      poison: 'bg-purple-500',
      flying: 'bg-indigo-300',
      bug: 'bg-lime-500',
      normal: 'bg-gray-400',
      ground: 'bg-amber-600',
      fairy: 'bg-pink-300',
      fighting: 'bg-orange-700',
      psychic: 'bg-pink-500',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      ice: 'bg-blue-300',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
    };
    
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#dc2626', padding: '1rem 0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>Pokédex</h1>
          
          {/* Search and filters */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', outline: 'none' }}
            />
            
            <select 
              value={typeFilter} 
              onChange={handleTypeFilterChange}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', outline: 'none' }}
            >
              <option value="">All Types</option>
              {allTypes.map(type => (
                <option key={type} value={type}>
                  {capitalize(type)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4b5563' }}>Loading Pokémon...</div>
          </div>
        ) : error ? (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '0.25rem' }}>
            <p>Error: {error}</p>
            <p style={{ marginTop: '0.25rem' }}>Please try refreshing the page.</p>
          </div>
        ) : filteredPokemon.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <p style={{ fontSize: '1.5rem', color: '#4b5563' }}>No Pokémon found matching your search.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {filteredPokemon.map(pokemon => (
              <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
                capitalize={capitalize}
                getTypeColor={getTypeColor}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// PokemonCard component
function PokemonCard({ pokemon, capitalize }) {
  // Get color based on type
  const getTypeBackgroundColor = (type) => {
    const colors = {
      grass: '#10b981',
      fire: '#ef4444',
      water: '#3b82f6',
      electric: '#facc15',
      poison: '#8b5cf6',
      flying: '#818cf8',
      bug: '#84cc16',
      normal: '#9ca3af',
      ground: '#d97706',
      fairy: '#f9a8d4',
      fighting: '#c2410c',
      psychic: '#ec4899',
      rock: '#b45309',
      ghost: '#7e22ce',
      ice: '#60a5fa',
      dragon: '#4f46e5',
      dark: '#374151',
      steel: '#6b7280',
    };
    
    return colors[type] || '#9ca3af';
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'box-shadow 0.3s' }}>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {pokemon.image ? (
          <img 
            src={pokemon.image} 
            alt={capitalize(pokemon.name)}
            style={{ width: '8rem', height: '8rem', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ width: '8rem', height: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb', borderRadius: '9999px' }}>
            <span style={{ color: '#6b7280' }}>No image</span>
          </div>
        )}
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
          {capitalize(pokemon.name)}
        </h2>
        
        <div style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
          #{pokemon.id ? pokemon.id.toString().padStart(3, '0') : '000'}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          {pokemon.types && pokemon.types.map(type => (
            <span 
              key={type} 
              style={{ 
                backgroundColor: getTypeBackgroundColor(type), 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '9999px', 
                fontSize: '0.75rem',
                fontWeight: '600'
              }}
            >
              {capitalize(type)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}