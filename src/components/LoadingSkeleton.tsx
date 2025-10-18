// src/components/LoadingSkeleton.tsx
import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

const PokemonCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 animate-pulse">
    <div className="text-center">
      <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
      <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-20 mx-auto"></div>
    </div>
  </div>
);

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 20 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }, (_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
