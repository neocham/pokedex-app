export class TypeColors {
  static colors = {
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

  static getBackgroundColor(type) {
    return this.colors[type] || this.colors.normal;
  }
}
