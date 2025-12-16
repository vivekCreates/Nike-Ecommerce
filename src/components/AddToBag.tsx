'use client';

import React from 'react'
import { Button } from './ui/button'
import { useCartStore } from '@/app/store/cart'
import { ProductType } from '@/lib/types'
import { useRouter } from 'next/navigation';

function AddToBag({product}:{product:ProductType}) {
    const {addToCart,items } = useCartStore();
    const router = useRouter();
  return (
   <Button className="py-7 rounded-full cursor-pointer" onClick={()=>{
    addToCart(product)
    router.push("/cart")
}
}>Add to Bag</Button>
  )
}

export default AddToBag