'use client';

import CartItem from "@/components/CartItem";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Noise cancelling, 30hr battery",
      price: 199,
      quantity: 1,
      size: "One Size",
      color: "Black",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Heart rate monitor, GPS tracking",
      price: 299,
      quantity: 2,
      size: "Medium",
      color: "Silver",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Leather Backpack",
      description: "15-inch laptop compartment",
      price: 149,
      quantity: 1,
      size: "Large",
      color: "Brown",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
    }
  ]);

  const handleUpdateQuantity = (id:number, newQuantity:number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id:number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="flex-1 lg:w-[70%]">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h1 className="text-2xl sm:text-3xl font-bold">Cart({cartItems.length})</h1>
                </div>
                <div>
                  {cartItems.map(item => (
                    <CartItem 
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-[30%] w-full">
              <div className="bg-white rounded-lg p-6 sticky top-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="text-sm">Estimated Delivery & Handling</span>
                    <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">${total.toFixed(2)}</span>
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