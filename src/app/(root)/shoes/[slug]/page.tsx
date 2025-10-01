'use client';

import { SHOES } from '@/lib/contants'
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

export default function page() {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className='min-h-screen px-40 py-10'>

            <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                    {
                        SHOES.slice(0, 7).map((img, idx) => (
                            <figure className={`w-12 h-12 rounded-md overflow-hidden object-center object-cover ${selectedImage == idx ? 'border-3 border-b-rose-950':''}`}>
                                <Image src={img} alt='shoe' width={80} height={80} className='w-full h-full' />
                            </figure>
                        ))
                    }
                </div>
                <figure className='relative w-[25rem] h-[30rem] rounded-md flex object-center object-cover'>
                    <Image src={SHOES[selectedImage]} alt='shoe' width={80} height={80} className='w-full h-full' />
                    <div className=' absolute right-10 bottom-5 flex items-center gap-2'>
                        <button className='w-8 h-8 rounded-full bg-light-300 flex items-center justify-center' onClick={()=>setSelectedImage( prev=> prev > 0 ? prev-1 : prev)}><ChevronLeft/></button>
                        <button className='w-8 h-8 rounded-full bg-light-300 flex items-center justify-center' onClick={()=>setSelectedImage( prev=> prev < SHOES.slice(0,6).length ? prev+1 : prev)}><ChevronRight /></button>
                    </div>
                </figure>
             
            </div>
        </div>
    )
}
