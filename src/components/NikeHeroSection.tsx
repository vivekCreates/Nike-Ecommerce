import Link from 'next/link';
import React from 'react';

export default function NikeHeroSection() {
  return (
    <section className="relativeoverflow-hidden h-auto flex items-center">
      <div className="w-full  p-10 border-1 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start order-2 lg:order-1 space-y-6 sm:space-y-8">
            <p className="text-pink-500 font-bold text-xs sm:text-sm tracking-widest uppercase">
              Bold & Sporty
            </p>
            <h1 className=" text-2xl  font-semibold sm:text-3xl lg:text-heading-1 leading-none tracking-tight block">
              NIKE REACT PRESTO BY YOU
            </h1>
            <p className="text-gray-500 text-center md:text-start text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
              Take advantage of brand new, proprietary cushioning technology with a fresh pair of Nike react shoes.
            </p>
            <Link href={"/shoes"}  className="bg-black text-white px-9 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
              Shop Now
            </Link>
          </div>

          <div className="order-1 lg:order-2 relative h-72 sm:h-96 lg:h-[500px]">
            
            <div className="relative z-10 flex items-center justify-center h-full pr-0 lg:pr-8">
              <img
                src="/feature.png"
                alt="Nike React Presto Blue Shoes"
                className="w-full max-w-md sm:max-w-lg lg:max-w-3xl xl:max-w-4xl drop-shadow-2xl transform hover:scale-105 transition-transform duration-700 object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}