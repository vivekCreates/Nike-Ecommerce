'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/app/store/favorites';
import { ProductType } from '@/lib/types';
import { Button } from './ui/button';

export default function FavoriteButton({ product }: { product: ProductType }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <Button
      className={`py-7 rounded-full border-1 ${
        favorite
          ? 'bg-red-500 text-white hover:bg-red-600 border-red-500'
          : 'border-black text-black hover:bg-gray-100'
      }`}
      variant={favorite ? 'default' : 'outline'}
      onClick={handleFavoriteClick}
    >
      <Heart fill={favorite ? 'currentColor' : 'none'} />
      {favorite ? 'Favorited' : 'Favourite'}
    </Button>
  );
}
