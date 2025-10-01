import FilterSection from '@/components/Filters'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/contants'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen w-full'>
        <div className='flex w-full'>
            <FilterSection/>
            <div className='min-h-screen w-full  grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-4 sm:p-6 md:8 lg:p-10'>
               {
                products.map(({id,name,price,imageUrl})=>(
                    <ProductCard key={id} name={name} price={price} imageUrl={imageUrl}/>
                ))
               }
            </div>
        </div>
    </div>
  )
}
