// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import pokeball from '../assets/pokeball.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <img 
                src={pokeball} 
                alt="モンスターボールのアイコン" 
                className="w-8 h-8"
              />
            </div>
            <span className="text-white">ポケモン図鑑</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
