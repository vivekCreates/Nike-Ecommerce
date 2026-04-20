'use client';

import { create } from 'zustand';
import { ProductType } from '@/lib/types';

type FavoritesState = {
  items: ProductType[];
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  loadFavorites: (favorites: ProductType[]) => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],

  addToFavorites: (product: ProductType) =>
    set(state => {
      const exists = state.items.find(item => item.id === product.id);
      if (exists) {
        return state;
      }
      return {
        items: [...state.items, product],
      };
    }),

  removeFromFavorites: (productId: string) =>
    set(state => ({
      items: state.items.filter(item => item.id !== productId),
    })),

  isFavorite: (productId: string) =>
    get().items.some(item => item.id === productId),

  clearFavorites: () => set({ items: [] }),

  loadFavorites: (favorites: ProductType[]) =>
    set({ items: favorites }),
}));
