'use client';

import ProductCard from '@/components/ProductCard';
import ProductSection from '@/components/ProductSection';
import ReviewSection from '@/components/ReviewSection';
import ShoeImageCard from '@/components/ShoeImageCard';
import ShoeSizes from '@/components/ShoeSizes';
import { Button } from '@/components/ui/button';
import { products, SHOES } from '@/lib/contants'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Heart } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

export default function Page() {


  const [selectedImage, setSelectedImage] = useState(0);
  const [showProductDesc,setShowProductDesc] = useState(true)

  const setShoeImage = (idx: number) => setSelectedImage(idx);

  return (
    <>
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-6 md:py-10">
      <div className="flex flex-col lg:flex-row gap-6">
       
        <div className="flex lg:flex-col gap-2 flex-wrap justify-center lg:justify-start">
          {SHOES.slice(0, 7).map((img, idx) => (
            <ShoeImageCard
              key={idx}
              idx={idx}
              onClick={setShoeImage}
              selectedImage={selectedImage}
              img={img}
            />
          ))}
        </div>
       

        <figure className="relative w-full sm:w-fullmd:w-[24rem] lg:w-[28rem] h-[20rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem] rounded-md overflow-hidden flex justify-center items-center">
          <Image
            src={SHOES[selectedImage]}
            alt="shoe"
            width={600}
            height={600}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute right-5 bottom-4 flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full bg-light-300 flex items-center justify-center"
              onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : prev))}
            >
              <ChevronLeft />
            </button>
            <button
              className="w-8 h-8 rounded-full bg-light-300 flex items-center justify-center"
              onClick={() =>
                setSelectedImage((prev) =>
                  prev < SHOES.length - 1 ? prev + 1 : prev
                )
              }
            >
              <ChevronRight />
            </button>
          </div>
        </figure>

        <div className="w-full lg:max-w-lg flex flex-col gap-4 p-5 rounded-md">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">Max Air</h1>
            <p className="text-sm md:text-base">Women</p>
            <h1 className="text-xl md:text-2xl font-semibold">$140</h1>
            <p className="text-green-600 text-sm">Extra 20% off</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {SHOES.slice(0, 7).map((img, idx) => (
              <ShoeImageCard key={idx} img={img} idx={idx} />
            ))}
          </div>

          {/* Sizes */}
          <div>
            <ShoeSizes />
          </div>
          <div className='flex flex-col gap-4 py-4'>
            <Button className='py-7 rounded-full'>Add to Bag</Button>
            <Button className='py-7 rounded-full border-1 border-black' variant={"outline"}>
                <Heart/>
                Favourite
            </Button>
          </div>

          <div className='flex flex-col gap-4 py-10'>
            <div className='flex items-center justify-between'>
                <h1 className='text-heading-3'>Products Details</h1>
                <span onClick={()=>setShowProductDesc(prev=>!prev)}>
                {
                    showProductDesc ? <ChevronUp/> : <ChevronDown/>
                }
                </span>
            </div>
            {
                showProductDesc &&
                <p>The Air Max 90 stays true to its running roots with the iconic Waffle sole. Plus, stitched overlays and textured accents create the '90s look you love. Complete with romantic hues, its visible Air cushioning adds comfort to your journey..</p>
            }
            <ReviewSection/>
          </div>
        </div>
      </div>
    </div>
      <div className='flex-flex-col gap-6'>
      <h1 className='text-heading-3 ml-4 sm:ml-6 md:ml-8 lg:ml-10 font-semibold'>You Might Also Like</h1>
     <div className='min-h-screen w-full  grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 p-4 sm:p-6 md:8 lg:p-10'>
                    {
                     products.slice(0,3).map(({id,name,price,imageUrl})=>(
                         <ProductCard id={id} key={id} name={name} price={price} imageUrl={imageUrl}/>
                     ))
                    }
                 </div>
      </div>
      </>
  );
}
