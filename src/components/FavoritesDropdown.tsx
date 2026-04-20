'use client';

import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useFavoritesStore } from '@/app/store/favorites';
import Image from 'next/image';
import Link from 'next/link';

export default function FavoritesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromFavorites } = useFavoritesStore();

  const handleRemove = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(productId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Favorites"
      >
        <Heart size={24} className={items.length > 0 ? 'fill-red-500 text-red-500' : 'text-gray-800'} />
        {items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl z-40 max-h-96 overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-semibold">
                Favorites ({items.length})
              </h3>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p>No favorites yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {items.map(item => (
                  <Link
                    key={item.id}
                    href={`/shoes/${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleRemove(e, item.id)}
                      className="p-2 hover:bg-gray-200 rounded transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove from favorites"
                    >
                      <X size={16} className="text-gray-600" />
                    </button>
                  </Link>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="p-3 border-t bg-gray-50 sticky bottom-0">
                <Link
                  href="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium"
                >
                  View All Favorites
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
