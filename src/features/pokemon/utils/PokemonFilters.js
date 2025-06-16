export class PokemonFilters {
  static filterPokemon(pokemon, searchTerm, typeFilter) {
    return pokemon.filter(p => {
      const nameMatch = !searchTerm || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = !typeFilter || 
        p.types.includes(typeFilter);
      return nameMatch && typeMatch;
    });
  }

  static extractUniqueTypes(pokemon) {
    const typesSet = new Set();
    pokemon.forEach(p => 
      p.types.forEach(type => typesSet.add(type))
    );
    return Array.from(typesSet).sort();
  }
}
