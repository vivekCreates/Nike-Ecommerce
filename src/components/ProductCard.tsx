import Image from 'next/image'
import React from 'react'

export default function ProductCard() {
  return (
    <div className="h-auto relative bg-white overflow-hidden font-sans">
      <div className="absolute top-5 left-5">
        <span className="text-red text-xs bg-white px-4 py-2 rounded-full font-semibold">Best Seller</span>
      </div>
      
      <div className=" aspect-square bg-gray-50 flex items-center justify-center">
        <Image 
          src="/shoes/shoe-1.jpg" 
          alt="Nike Air Force 1 Mid '07" 
          className="w-full h-full object-cover"
          width={200}
          height={150}
        />
      </div>
      
      <div className="px-3 py-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium text-gray-900 leading-tight flex-1">
            Nike Air Force 1 Mid '07
          </h3>
          <span className="text-sm font-medium text-gray-900 ml-2">
            $98.30
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