import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export default function page() {
    return (
        <div className='max-w-7xl mx-auto min-h-screen p-10'>
            <div>
                <div className='flex gap-6 items-center'>

                    <Avatar className='w-30 h-30 flex items-center justify-center object-center object-cover overflow-hidden rounded-full cursor-pointer'>
                        <AvatarImage
                            className='w-full h-full'
                            src=""
                            alt="@shadcn"
                        />
                        <AvatarFallback className=" w-full h-full flex items-center justify-center bg-dark-700 text-white"></AvatarFallback>
                    </Avatar>

                    <div className='flex flex-col gap-2'>
                        <h2 className='text-heading-3'>Vivek kumar</h2>
                        <span>vivek@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
