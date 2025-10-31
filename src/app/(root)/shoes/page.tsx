import FilterSection from '@/components/Filters'
import ProductCard from '@/components/ProductCard'
import { getAllProducts } from '@/lib/actions/products'
import React from 'react'

export default async function page () {
   const products = await getAllProducts();
   console.log(products)
  return (
    <div className='min-h-screen w-full'>
        <div className='flex w-full'>
            <FilterSection/>
            <div className='min-h-screen w-full  grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-4 sm:p-6 md:8 lg:p-10'>
               {
                products?.map(({id,name,image,price})=>(
                    <ProductCard key={id} id={id} name={name} price={price} image={image}/>
                ))
               }
            </div>
        </div>
    </div>
  )
}
