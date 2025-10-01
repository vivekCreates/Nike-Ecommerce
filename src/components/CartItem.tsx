import Image from 'next/image';
import React from 'react';

export default function CartItem() {
  return (

      <div className="bg-white w-full  py-5  max-w-2xl">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-28 h-36 sm:w-32 sm:h-32 md:h-36 md:w-40 bg-gray-50  flex items-center justify-center overflow-hidden">
            <Image 
              src="/shoes/shoe-4.webp" 
              alt="Nike Air Force 1"
              className="w-full h-full"
              width={120}
              height={120}
            />
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className='my-auto'>
          
            <p className="text-orange-500 text-xs sm:text-sm font-medium mb-1">
              Estimated arrival 24 Sep 2026
            </p>

            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                Nike Air Force 1 Mid '07
              </h3>
              <span className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
                $98.30
              </span>
            </div>

          
            <p className="text-gray-500 text-sm mb-3">Men's Shoes</p>

            <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className='flex gap-5'>
              <div>
                <span className="text-gray-600">Size </span>
                <span className="font-medium text-gray-900">10</span>
              </div>
              <div>
                <span className="text-gray-600">Quantity </span>
                <span className="font-medium text-gray-900">2</span>
                
              </div>
                </div>
               <button className="flex items-center gap-2 text-red-600 text-sm font-medium hover:text-red-700 transition-colors self-start">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              Cancel Order
            </button>
            </div>
            </div>
           
          </div>
        </div>
      </div>
  );
}