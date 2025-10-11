// src/api/pokemon.ts
// ポケモンの基本データを取得するAPI関数

import { API_BASE_URL } from '../config';
import type { Pokemon } from './pokemon.type';

// 型を再エクスポート
export type { Pokemon } from './pokemon.type';

export interface PokemonListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// 単体のポケモンデータを取得
export const fetchPokemon = async (idOrName: string | number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) {
    throw new Error(`ポケモンデータの取得に失敗しました: ${response.status}`);
  }
  return response.json();
};

// ポケモン一覧を取得（ページネーション対応）
export const fetchPokemonList = async (offset: number = 0, limit: number = 20): Promise<PokemonListResult> => {
  const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`ポケモン一覧の取得に失敗しました: ${response.status}`);
  }
  return response.json();
};
