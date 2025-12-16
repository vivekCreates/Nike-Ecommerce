import React from 'react'
import ProductCard from './ProductCard'
import { getAllProducts } from '@/lib/actions/products';


export default async function ProductSection() {

const products = await getAllProducts();
  return (
    <div className='flex flex-col gap-5 p-6 md:p-10'>
        <h1 className='text-3xl font-semibold'>Air Max</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 flex-wrap">
            {
              products.map(({id,name,price,image})=>(
                <ProductCard key={id} id={id} name={name!} price={price} image={image!}/>
              ))
            }
        </div>
    </div>
  )
}
