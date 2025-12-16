'use client';

import CartItem from '@/components/CartItem'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { profileOptions } from '@/lib/contants'
import React, { useState } from 'react'

export default function page() {
    const [selectedOption,setSelectedOption] = useState("My Orders")
    return (
        <div className='max-w-7xl mx-auto min-h-screen p-10'>
            <div>
                <div className='flex gap-6 items-center pb-20'>

                    <Avatar className='w-15 h-15 sm:w-20 sm:h-20 md:w-30 md:h-30 flex items-center justify-center object-center object-cover overflow-hidden rounded-full cursor-pointer'>
                        <AvatarImage
                            className='w-full h-full'
                            src=""
                            alt="@shadcn"
                        />
                        <AvatarFallback className=" w-full h-full flex items-center justify-center bg-dark-700 text-white"></AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col gap-1 md:gap-2'>
                        <h2 className='sm:text-sm md:text-md  md:text-heading-3 font-semibold'>Vivek kumar</h2>
                        <span className='sm:text-sm md:text-md '>vivek@gmail.com</span>
                    </div>

                </div>
                <ul className='flex gap-4 flex-wrap md:gap-12 mb-10'>
                    {
                        profileOptions.map((option,idx)=>(
                            <span key={idx} className={`${option === selectedOption ? 'border-b-2 border-dark-700':''} pb-1  cursor-pointer text-sm md:text:md lg:text-lg`} onClick={()=>setSelectedOption(option)}>{option}</span>
                        ))
                    }
                </ul>
                <div className='flex flex-col gap-2'>
                   
                </div>
            </div>
        </div>
    )
}
