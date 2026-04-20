'use client';

import React from 'react';
import { useFavoritesStore } from '@/app/store/favorites';
import ProductCard from '@/components/ProductCard';

export default function FavoritesPage() {
  const { items } = useFavoritesStore();

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
        <p className="text-gray-500 mb-8">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your favorites
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-4">No favorites yet</p>
              <p className="text-gray-400 text-sm mb-8">
                Start adding your favorite shoes and they will appear here
              </p>
              <a 
                href="/shoes" 
                className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
