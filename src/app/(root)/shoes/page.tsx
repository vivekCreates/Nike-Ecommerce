import FilterSection from '@/components/Filters'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen w-full'>
        <div className='flex w-full'>
            <FilterSection/>
            <div className='min-h-screen bg-red w-[80%]'>
                <div className='flex items-center justify-end'>
                    <select name="" value={"sort"} id="">
                        <option value="low-to-high">low-to-high</option>
                        <option value="high-to-low">high-to-low</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  )
}
