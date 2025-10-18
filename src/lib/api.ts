// src/lib/api.ts
import type {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
  Pokemon,
} from '../types/pokemon';
import { API_CONFIG } from './config';
import {
  getPokemonImageUrl,
  getTypeNameJP,
} from './utils';

class PokemonAPI {
  private baseUrl = API_CONFIG.BASE_URL;

  // ポケモン一覧を取得
  async getPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
    const response = await fetch(
      `${this.baseUrl}${API_CONFIG.ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon list: ${response.statusText}`);
    }

    return response.json();
  }

  // ポケモンの詳細情報を取得
  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const response = await fetch(
      `${this.baseUrl}${API_CONFIG.ENDPOINTS.POKEMON}/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon detail: ${response.statusText}`);
    }

    return response.json();
  }

  // ポケモンの種族情報を取得
  async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    const response = await fetch(
      `${this.baseUrl}${API_CONFIG.ENDPOINTS.POKEMON_SPECIES}/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon species: ${response.statusText}`);
    }

    return response.json();
  }

  // ポケモンの完全な情報を取得（詳細＋種族情報）
  async getPokemon(id: number): Promise<Pokemon> {
    const [detail, species] = await Promise.all([
      this.getPokemonDetail(id),
      this.getPokemonSpecies(id),
    ]);

    return this.transformPokemonData(detail, species);
  }

  // ポケモンデータを変換
  private transformPokemonData(detail: PokemonDetail, species: PokemonSpecies): Pokemon {
    // 日本語名を取得
    const japaneseName = species.names.find(
      (name) => name.language.name === 'ja-Hrkt'
    )?.name || detail.name;

    // 日本語の説明文を取得
    const description = species.flavor_text_entries
      .filter((entry) => entry.language.name === 'ja-Hrkt')
      .find((entry) => entry.version.name === 'sword' || entry.version.name === 'shield')
      ?.flavor_text.replace(/\f/g, '\n') || 
      species.flavor_text_entries
        .find((entry) => entry.language.name === 'ja-Hrkt')
        ?.flavor_text.replace(/\f/g, '\n') || 
      'ポケモンの説明が見つかりません。';

    // 分類（〜ポケモン）を取得
    const category = species.genera.find(
      (genus) => genus.language.name === 'ja-Hrkt'
    )?.genus || '不明ポケモン';

    // タイプを日本語に変換
    const types = detail.types.map(type => getTypeNameJP(type.type.name));

    // ステータスを整理
    const stats = {
      hp: detail.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
      attack: detail.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
      defense: detail.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
      specialAttack: detail.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: detail.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
      speed: detail.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
    };

    // 特性を取得
    const abilities = detail.abilities.map(ability => ability.ability.name);

    return {
      id: detail.id,
      name: detail.name,
      japaneseName,
      imageUrl: detail.sprites.other['official-artwork'].front_default || 
                detail.sprites.front_default || 
                getPokemonImageUrl(detail.id),
      types,
      height: detail.height,
      weight: detail.weight,
      stats,
      abilities,
      description,
      category,
    };
  }
}

// シングルトンインスタンスをエクスポート
export const pokemonAPI = new PokemonAPI();
