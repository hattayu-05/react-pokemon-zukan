// src/lib/config.ts
export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  ENDPOINTS: {
    POKEMON: '/pokemon',
    POKEMON_SPECIES: '/pokemon-species',
  },
} as const;

export const APP_CONFIG = {
  ITEMS_PER_PAGE: 20,
  MAX_POKEMON_ID: 1010,
} as const;
