// src/lib/utils.ts
import type { PokemonTypeColor } from '../types/pokemon';

// タイプ別の色設定
export const TYPE_COLORS: PokemonTypeColor = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

// タイプ名の日本語変換
export const TYPE_NAMES_JP: { [key: string]: string } = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  electric: 'でんき',
  grass: 'くさ',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: 'じめん',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴースト',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
};

// ステータス名の日本語変換
export const STAT_NAMES_JP: { [key: string]: string } = {
  hp: 'HP',
  attack: 'こうげき',
  defense: 'ぼうぎょ',
  'special-attack': 'とくこう',
  'special-defense': 'とくぼう',
  speed: 'すばやさ',
};

// URLからIDを抽出
export const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1], 10) : 0;
};

// ポケモンの画像URLを生成
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// 数値をゼロパディング
export const padNumber = (num: number, length: number = 3): string => {
  return num.toString().padStart(length, '0');
};

// タイプに応じた背景色を取得
export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type] || TYPE_COLORS.normal;
};

// 日本語のタイプ名を取得
export const getTypeNameJP = (type: string): string => {
  return TYPE_NAMES_JP[type] || type;
};

// 日本語のステータス名を取得
export const getStatNameJP = (stat: string): string => {
  const mapping: { [key: string]: string } = {
    hp: 'HP',
    attack: 'こうげき',
    defense: 'ぼうぎょ',
    specialAttack: 'とくこう',
    specialDefense: 'とくぼう',
    speed: 'すばやさ',
  };
  return mapping[stat] || stat;
};

// クラス名を結合するユーティリティ
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
