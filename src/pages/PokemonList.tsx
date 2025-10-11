// src/pages/PokemonList.tsx
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonListWithJapaneseNames } from "../api/pokemonWithJapaneseName";
import type { PokemonWithJapaneseName } from "../api/pokemonWithJapaneseName";
import PokemonCard from "../components/PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PokemonList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: ({ pageParam = 0 }) =>
      fetchPokemonListWithJapaneseNames(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length * 20;
      }
      return undefined;
    },
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <PokemonListSkeleton />;
  if (status === "error") return <div>エラーが発生しました</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data?.pages.map((page) =>
            page.results.map((pokemon: PokemonWithJapaneseName) => {
              // PokemonWithJapaneseNameからPokemonDetailに変換
              const pokemonDetail = {
                name: pokemon.name,
                url: pokemon.url,
                japaneseName: pokemon.japaneseName,
                number: pokemon.number,
              };
              return <PokemonCard key={pokemon.name} pokemon={pokemonDetail} />;
            })
          )}
        </div>
        
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
          {isFetchingNextPage ? (
            <div className="flex items-center space-x-2">
              <Loader />
              <span className="text-gray-600">読み込み中...</span>
            </div>
          ) : hasNextPage ? (
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
              続きを読み込む
            </button>
          ) : (
            <span className="text-gray-500">すべてのポケモンを表示しました</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ローダーコンポーネント
const Loader: React.FC = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-500"></div>
);

const PokemonListSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(24)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <Skeleton height={20} width={60} className="rounded-full" />
              </div>
              <div className="flex justify-center mb-4">
                <Skeleton height={96} width={96} />
              </div>
              <Skeleton height={24} width="100%" className="mb-2" />
              <Skeleton height={16} width="80%" className="mx-auto" />
            </div>
          ))}
        </div>
        
        <div className="h-20 flex items-center justify-center mt-8">
          <Skeleton width={120} height={24} />
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
