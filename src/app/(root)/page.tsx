import Hero from '@/components/Hero'
import NikeHeroSection from '@/components/NikeHeroSection'
import ProductCard from '@/components/ProductCard'
import ProductSection from '@/components/ProductSection'
import TrendingProducts from '@/components/TrendingProducts'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero/>
      <ProductSection/>
      <TrendingProducts/>
      <NikeHeroSection/>
    </div>
  )
}
