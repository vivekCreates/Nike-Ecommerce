import React from 'react'
import ProductCard from './ProductCard'

export default function ProductSection() {
  return (
    <div className='flex flex-col gap-5 p-6 md:p-10'>
        <h1 className='text-3xl font-semibold'>Air Max</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 flex-wrap">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>
  )
}
