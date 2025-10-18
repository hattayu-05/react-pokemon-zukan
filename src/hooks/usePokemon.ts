// src/hooks/usePokemon.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonAPI } from '../lib/api';
import { APP_CONFIG } from '../lib/config';
import type { PokemonListResponse } from '../types/pokemon';

// ポケモン一覧を取得するフック（無限スクロール対応）
export const usePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam = 0 }) =>
      pokemonAPI.getPokemonList(pageParam, APP_CONFIG.ITEMS_PER_PAGE),
    getNextPageParam: (lastPage: PokemonListResponse, pages) => {
      const nextOffset = pages.length * APP_CONFIG.ITEMS_PER_PAGE;
      return lastPage.next ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
};

// ポケモンの詳細情報を取得するフック
export const usePokemon = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => pokemonAPI.getPokemon(id),
    enabled: !!id && id > 0,
  });
};

// ポケモンの基本情報のみを取得するフック
export const usePokemonDetail = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', 'basic', id],
    queryFn: () => pokemonAPI.getPokemonDetail(id),
    enabled: !!id && id > 0,
  });
};

// ポケモンの種族情報を取得するフック
export const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', 'species', id],
    queryFn: () => pokemonAPI.getPokemonSpecies(id),
    enabled: !!id && id > 0,
  });
};
