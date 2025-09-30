import React from 'react';

export default function TrendingProducts() {
  const products = [
    {
      id: 1,
      title: "REACT PRESTO",
      subtitle: "With React foam for the most comfortable Presto ever.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      isFeatured: true
    },
    {
      id: 2,
      title: "Summer Must-Haves: Air Max Dia",
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
      isFeatured: false
    },
    {
      id: 3,
      title: "Air Jorden 11 Retro Low LE",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80",
      isFeatured: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full p-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
          Trending Now
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {products.slice(1).map((product) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-56 sm:h-64 lg:h-80">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {product.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
          <div className="lg:col-span-2 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <img
                src={products[0].image}
                alt={products[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-end">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {products[0].title}
                </h2>
                <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-md">
                  {products[0].subtitle}
                </p>
                <button className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors w-fit">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}