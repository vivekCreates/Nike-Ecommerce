import React from 'react'

export default function ShoeSizes() {

    const SIZES = [
        '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9.5', '10.5', '11', '11.5', '12'
    ]

    return (
        <div className='flex gap-2 flex-wrap '>
            {
                SIZES.map((size)=>(
                    <button className=' w-20 h-15  rounded-md border-1 border-dark-500'>{size}</button>
                ))
            }
        </div>
    )
}
