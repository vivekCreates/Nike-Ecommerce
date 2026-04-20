import FilterSection from '@/components/Filters'
import ProductCard from '@/components/ProductCard'
import { getAllProducts } from '@/lib/actions/products'
import React from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams: {
    sports?: string;
    gender?: string;
    price?: string;
  };
}) {
  const { sports, gender, price } = await searchParams;

  const products = await getAllProducts({ gender, sports, price })
  
  // Randomly select 20% of products to be bestsellers (minimum 1 if there are products)
  const bestSellerIndices = new Set<number>();
  if (products.length > 0) {
    const bestSellerCount = Math.max(1, Math.ceil(products.length * 0.2));
    while (bestSellerIndices.size < bestSellerCount) {
      bestSellerIndices.add(Math.floor(Math.random() * products.length));
    }
  }

  // For testing: Force first 2 products to be bestsellers if they exist
  if (products.length >= 2) {
    bestSellerIndices.add(0);
    bestSellerIndices.add(1);
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='flex w-full'>
        <FilterSection />
        <div className='min-h-screen w-full  grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-6 p-4 sm:p-6 md:8 lg:p-10 justify-start'>
          {
            products.length > 0 ?
              (products?.map(({ id, name, image, price }, index) => (
                <ProductCard 
                  key={id} 
                  id={id} 
                  name={name!} 
                  price={price} 
                  image={image}
                  isBestSeller={bestSellerIndices.has(index)}
                />
              ))) :
              (
                <h1 className="text-2xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  No Product Found
                </h1>
              )
          }
        </div>
      </div>
    </div>
  )
}
