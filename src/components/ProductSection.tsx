import React from 'react'
import ProductCard from './ProductCard'

export default function ProductSection() {
  return (
    <div className='flex flex-col gap-5 p-10'>
        <h1 className='text-heading-3'>Air Max</h1>
        <div className="grid grid-cols-4 gap-6">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>
  )
}
