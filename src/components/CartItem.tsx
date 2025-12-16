import { type CartItem } from '@/app/store/cart';
import { ProductType } from '@/lib/types';
import Image from 'next/image';
import React from 'react';

export default function CartItem({product}:{product:CartItem}) {
    return (
        <div className="bg-white w-full py-4 px-4 sm:py-5 sm:px-5 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-full h-48 xs:h-56 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-42 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                        src={product.image}
                        alt="Nike Air Force 1"
                        className="w-full h-full object-contain"
                        width={150}
                        height={120}
                    />
                </div>

                <div className='py-auto'>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                            <p className="text-orange-500 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                                Estimated arrival 24 Sep 2026
                            </p>

                            <div className="flex justify-between items-start gap-3 mb-1 sm:mb-2">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                                    {product.name}
                                </h3>
                                <span className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
                                    ${product.price}
                                </span>
                            </div>

                            <p className="text-gray-500 text-sm mb-3 sm:mb-4">{product.gender}</p>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-4">
                            <div className="flex gap-4 sm:gap-5 text-sm">
                                <div>
                                    <span className="text-gray-600">Size </span>
                                    <span className="font-medium text-gray-900">10</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Quantity </span>
                                    <span className="font-medium text-gray-900">{product.quantity}</span>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 text-red-600 text-sm font-medium hover:text-red-700 transition-colors self-start xs:self-auto">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                <span className="hidden xs:inline">Cancel Order</span>
                                <span className="xs:hidden">Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}