import { SHOES } from '@/lib/contants'
import Image from 'next/image'
import React from 'react'

type ShoeImageCardProps = {
    idx:number,
    img: string,
    selectedImage?:number,
    onClick?:(index:number)=>void 
}

export default function ShoeImageCard({ idx,img,selectedImage,onClick }:ShoeImageCardProps ) {
    return (
         <figure  className={`w-15 h-15 rounded-md overflow-hidden object-center object-cover ${selectedImage == idx ? 'border-2 border-red-700':''}`}
         onClick={()=>onClick?.(idx)}
         >
            <Image src={img} alt='shoe' width={80} height={80} className='w-full h-full' />
        </figure>
    )
}
