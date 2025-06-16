export class PokemonMapper {
  static mapApiResponseToPokemon(apiData) {
    return {
      id: apiData.id,
      name: apiData.name,
      image: apiData.sprites?.front_default || null,
      types: apiData.types?.map(type => type.type.name) || [],
      height: apiData.height,
      weight: apiData.weight,
      abilities: apiData.abilities?.map(ability => ability.ability.name) || [],
    };
  }
}