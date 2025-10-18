import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { getTypeColor, getStatNameJP, padNumber } from '../lib/utils';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemonId = id ? parseInt(id, 10) : 0;
  
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">読み込み中...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl text-red-500 mb-4">ポケモンが見つかりません</div>
          <Link 
            to="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            図鑑に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ヘッダー */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← 図鑑に戻る
        </Link>
      </div>

      {/* メイン情報 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 左側：画像と基本情報 */}
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              No.{padNumber(pokemon.id)}
            </div>
            <img
              src={pokemon.imageUrl}
              alt={pokemon.japaneseName}
              className="w-48 h-48 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {pokemon.japaneseName}
            </h1>
            <p className="text-lg text-gray-600 capitalize mb-4">
              {pokemon.name}
            </p>
            <p className="text-md text-gray-600 mb-4">
              {pokemon.category}
            </p>
            
            {/* タイプ */}
            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-white font-medium text-sm"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* 右側：詳細情報 */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">基本情報</h2>
            
            {/* 身長・体重 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">身長</div>
                <div className="text-lg font-semibold">
                  {(pokemon.height / 10).toFixed(1)} m
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">体重</div>
                <div className="text-lg font-semibold">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </div>
              </div>
            </div>

            {/* ステータス */}
            <h3 className="text-lg font-bold mb-3 text-gray-800">ステータス</h3>
            <div className="space-y-2">
              {Object.entries(pokemon.stats).map(([statName, value]) => (
                <div key={statName} className="flex items-center">
                  <div className="w-20 text-sm text-gray-600">
                    {getStatNameJP(statName)}
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-8 text-sm font-medium text-right">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 説明文 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">説明</h2>
        <p className="text-gray-700 leading-relaxed">
          {pokemon.description}
        </p>
      </div>
    </div>
  );
};

export default PokemonDetail;
