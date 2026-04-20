import Link from 'next/link';
import React from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '@/lib/actions/products';

export default async function TrendingProducts() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full p-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
          Trending Now
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {products && products.length > 0 ? products.slice(4, 8).map(({id, name, price, image}) => (  // Get different products than ProductSection
            <ProductCard key={id} id={id} name={name} price={price} image={image} />
          )) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No trending products available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}