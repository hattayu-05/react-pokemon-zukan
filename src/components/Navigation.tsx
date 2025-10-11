// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const pathname = window.location.pathname;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex space-x-6">
          {/* 一覧画面の場合は一覧ボタンを非表示 */}
          {
            pathname !== '/' && (
              <li>
                <Link 
                  to="/" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  一覧に戻る
                </Link>
              </li>
            )
          }
          {/* 追加のナビゲーションリンクをここに記載 */}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
