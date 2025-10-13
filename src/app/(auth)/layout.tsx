import React from 'react'
import "../globals.css"
import Image from 'next/image'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
            >
                <div className='w-full h-screen flex text-white items-center justify-center'>
                    <div className='w-[50%] h-full hidden md:flex bg-black p-10  flex-col justify-between'>
                        <Image src={"/logo.svg"} width={50} height={50} alt='logo' />
                        <div>
                            <h1 className='md:text-heading-3 lg:text-heading-2'>Just do it</h1>
                            <p className='text-lg mt-4'>Join millions of athletes and fitness enthusiasts who trust</p>
                            <p className='text-lg'>Nike for their performance needs.</p>
                        </div>
                        <span>© 2024 Nike. All rights reserved.</span>
                    </div>
                    <div className='w-[100%] md:w-[50%] '>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}
