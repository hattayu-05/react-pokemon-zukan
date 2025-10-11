// src/components/PokemonCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export type PokemonDetail = {
  name: string;
  url: string;
  japaneseName: string;
  number: string;
}

type PokemonCardProps = {
  pokemon: PokemonDetail;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} className="block">
      <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            #{pokemon.number.padStart(3, '0')}
          </span>
        </div>
        <div className="flex justify-center mb-4">
          <img 
            src={imageUrl} 
            alt={pokemon.japaneseName} 
            className="w-24 h-24 object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 text-center truncate">
          {pokemon.japaneseName}
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1 capitalize">
          {pokemon.name}
        </p>
      </div>
    </Link>
  );
};

export default PokemonCard;
