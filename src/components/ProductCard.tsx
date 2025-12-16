'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProductCard({id,name,price,image}:{id?:string,name:string,image:string,price:number}) {
  const router = useRouter();
  console.log("id: ",id)

  return (
    <div 
    className="h-auto relative  bg-white overflow-hidden font-sans"
    onClick={()=>router.push(`/shoes/${id}`)}
    >
      <div className="absolute top-5 left-5 z-20">
        <span className="text-red text-xs bg-white  px-4 py-2 rounded-full font-semibold">Best Seller</span>
      </div>
      
      <div className="group overflow-hidden aspect-square bg-gray-50 flex items-center justify-center">
        <Image 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={200}
          height={150}
        />
      </div>
      
      <div className="px-3 py-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium text-gray-900 leading-tight flex-1">
            {name}
          </h3>
          <span className="text-sm font-medium text-gray-900 ml-2">
           ${price}
          </span>
        </div>
        
        <p className="text-xs text-gray-500 mb-2">
          Men's Shoes
        </p>
        
        <p className="text-xs text-gray-500">
          6 Colour
        </p>
      </div>
    </div>
  )
}