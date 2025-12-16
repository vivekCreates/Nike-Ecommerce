'use client';

import { useCartStore } from "@/app/store/cart";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {

  const {items,totalPrice} = useCartStore();


  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              <Link href={"/shoes"}>Continue Shopping</Link>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex-1 lg:w-[70%]">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h1 className="text-2xl sm:text-3xl font-bold">Cart({items.length})</h1>
                </div>
                <div>
                  {items.map(item => (
                    <CartItem 
                    key={item.id}
                    product = {item}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-[30%] w-full">
              <div className="bg-white rounded-lg p-6 sticky top-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* <div className="flex items-center justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div> */}
                  
                  {/* <div className="flex items-center justify-between text-gray-700">
                    <span className="text-sm">Estimated Delivery & Handling</span>
                    <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div> */}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">${totalPrice()}</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-3 sm:py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <Link href={"/shoes"} className="text-sm text-gray-600 hover:text-gray-800 underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}