// src/pages/PokemonList.tsx
import React from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import { extractIdFromUrl, getPokemonImageUrl, padNumber } from '../lib/utils';
import { Link } from 'react-router-dom';

const PokemonList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePokemonList();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">エラーが発生しました</div>
      </div>
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Reactポケモン図鑑
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {allPokemon.map((pokemon) => {
          const id = extractIdFromUrl(pokemon.url);
          return (
            <Link
              key={pokemon.name}
              to={`/pokemon/${id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-4 border border-gray-200"
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  No.{padNumber(id)}
                </div>
                <img
                  src={getPokemonImageUrl(id)}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto mb-2"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold capitalize text-gray-800">
                  {pokemon.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isFetchingNextPage ? '読み込み中...' : 'もっと見る'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
