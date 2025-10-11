// src/components/PokemonTypeLabel.tsx
// ポケモンのタイプのラベル
import React from 'react';
import { pokemonTypesMap } from '../utils/pokemonTypesMap';

type PokemonTypeLabelProps = {
  type: string;
};

const PokemonTypeLabel: React.FC<PokemonTypeLabelProps> = ({ type }) => {
  // 日本語タイプ名から対応する色を取得
  const typeInfo = pokemonTypesMap.find((t) => t.jaType === type);
  // もし日本語タイプ名で見つからない場合は、英語タイプ名で検索
  const fallbackTypeInfo = pokemonTypesMap.find((t) => t.type === type);
  const finalTypeInfo = typeInfo || fallbackTypeInfo;
  
  return (
    <span 
      style={{
        backgroundColor: finalTypeInfo?.color || '#68A090',
      }}
      key={type}
      className={`text-white px-3 py-1 rounded-full w-fit`}
    >
      {type}
    </span>
  );
};

export default PokemonTypeLabel;
