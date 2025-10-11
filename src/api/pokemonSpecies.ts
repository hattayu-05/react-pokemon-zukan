// src/api/pokemonSpecies.ts
// ポケモンの種族データ（日本語名など）を取得するAPI関数

import { API_BASE_URL } from '../config';
import type { Name, NamedAPIResource } from './common.type';

export interface PokemonSpecies {
  id: number;
  names: Name[];
  genera: Array<{
    language: NamedAPIResource;
    genus: string;
  }>;
  flavor_text_entries: Array<{
    language: NamedAPIResource;
    flavor_text: string;
  }>;
}

// 種族名の型定義
type SpeciesName = {
  name: string;
  language: {
    name: string;
    url: string;
  };
};

type SpeciesData = {
  names: SpeciesName[];
};

// ポケモンの種族データを取得
export const fetchPokemonSpecies = async (idOrName: string | number): Promise<PokemonSpecies> => {
  const response = await fetch(`${API_BASE_URL}/pokemon-species/${idOrName}`);
  if (!response.ok) {
    throw new Error(`ポケモン種族データの取得に失敗しました: ${response.status}`);
  }
  return response.json();
};

// 日本語名を取得する関数（species URLから取得）
export const fetchPokemonJapaneseName = async (speciesUrl: string): Promise<string> => {
  try {
    const response = await fetch(speciesUrl);
    if (!response.ok) {
      throw new Error('ポケモン種族情報の取得に失敗しました');
    }
    const data: SpeciesData = await response.json();
    const japaneseNameEntry = data.names.find(nameEntry => nameEntry.language.name === 'ja-Hrkt');
    return japaneseNameEntry ? japaneseNameEntry.name : data.names[0].name;
  } catch (error) {
    console.error('ポケモン種族情報の取得に失敗しました', error);
    return '名前不明';
  }
};

// 日本語名を抽出するヘルパー関数
export const getJapaneseName = (species: PokemonSpecies): string => {
  const japaneseName = species.names.find(name => name.language.name === 'ja' || name.language.name === 'ja-Hrkt');
  return japaneseName?.name || '';
};

// 日本語の分類を抽出するヘルパー関数
export const getJapaneseGenus = (species: PokemonSpecies): string => {
  const japaneseGenus = species.genera.find(genus => genus.language.name === 'ja' || genus.language.name === 'ja-Hrkt');
  return japaneseGenus?.genus || '';
};

// 日本語の説明文を抽出するヘルパー関数
export const getJapaneseFlavorText = (species: PokemonSpecies): string => {
  const japaneseText = species.flavor_text_entries.find(entry => entry.language.name === 'ja' || entry.language.name === 'ja-Hrkt');
  return japaneseText?.flavor_text?.replace(/\n/g, ' ') || '';
};
