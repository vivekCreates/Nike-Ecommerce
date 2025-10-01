'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';



export default function FilterSection() {
  const params = useSearchParams();
  const router = useRouter()
 
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    gender: true,
    kids: false,
    price: true,
    height: false,
    sports: true
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    gender: [],
    kids: [],
    price: [],
    height: [],
    sports: []
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // const handleFilterChange = (category: string, value: string) => {
  //   setSelectedFilters((prev) => {
  //     const prevValues = prev[category] || []
  //     const exists = prevValues.includes(value)

  //     return {
  //       ...prev,
  //       [category]: exists
  //         ? prevValues.filter(v => v != value)
  //         : [...prevValues, value]
  //     }
  //   })
  // }


  
const handleFilterChange = (category: string, value: string) => {
  setSelectedFilters((prev) => {
      const prevValues = prev[category] || []
      const exists = prevValues.includes(value)

      return {
        ...prev,
        [category]: exists
          ? prevValues.filter(v => v != value)
          : [...prevValues, value]
      }
    })
  const params = new URLSearchParams(window.location.search);
  const values = params.getAll(category);

  if (values.includes(value)) {
    // remove value
    const newValues = values.filter(v => v !== value);
    params.delete(category);
    newValues.forEach(v => params.append(category, v));
  } else {
    // add value
    params.append(category, value);
  }

  router.push(`?${params.toString()}`);
};

  return (
    <div className="w-[20%] p-10 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">New (500)</h2>
        <div className="space-y-2">
          <button className="block text-sm hover:text-gray-600 transition-colors">Low Top</button>
          <button className="block text-sm hover:text-gray-600 transition-colors">High Top</button>
          <button className="block text-sm hover:text-gray-600 transition-colors">Skateboarding</button>
          <button className="block text-sm hover:text-gray-600 transition-colors">Nike By You</button>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => toggleSection('gender')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold">Gender</span>
          {expandedSections.gender ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.gender && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                onChange={() => handleFilterChange('gender', 'men')}
                type="checkbox"
                checked={selectedFilters.gender.includes('men')}
                className="w-4 h-4 rounded border-gray-300" />
              <span className="ml-2 text-sm">Men</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                onChange={() => handleFilterChange('gender', 'women')}
                checked={selectedFilters.gender.includes('women')}
              />
              <span className="ml-2 text-sm">Women</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                onChange={() => handleFilterChange('gender', 'unisex')}
                checked={selectedFilters.gender.includes('unisex')}
              />
              <span className="ml-2 text-sm">Unisex</span>
            </label>
          </div>
        )}
      </div>

      {/* Kids Filter */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => toggleSection('kids')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold">Kids</span>
          {expandedSections.kids ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.kids && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input 
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
              onChange={() => handleFilterChange('kids', 'boys')}
                checked={selectedFilters.kids.includes('boys')}
               />
              <span className="ml-2 text-sm">Boys</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
              type="checkbox"
               className="w-4 h-4 rounded border-gray-300"
               onChange={() => handleFilterChange('kids', 'girls')}
                checked={selectedFilters.kids.includes('girls')}
                />
              <span className="ml-2 text-sm">Girls</span>
            </label>
          </div>
        )}
      </div>

      {/* Shop By Price Filter */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold">Shop By Price</span>
          {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
               type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
              onChange={() => handleFilterChange('price', '$25 - $50')}
                checked={selectedFilters.price.includes('$25 - $50')}
               />
              <span className="ml-2 text-sm">$25 - $50</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
              type="checkbox"
               className="w-4 h-4 rounded border-gray-300" 
                onChange={() => handleFilterChange('price', '$50 - $100')}
                checked={selectedFilters.price.includes('$50 - $100')}
               />
               
              <span className="ml-2 text-sm">$50 - $100</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" 
              className="w-4 h-4 rounded border-gray-300"
              onChange={() => handleFilterChange('price', '$100 - $150')}
                checked={selectedFilters.price.includes('$100 - $150')}
               />
              <span className="ml-2 text-sm">$100 - $150</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300" 
              onChange={() => handleFilterChange('price', '$150')}
                checked={selectedFilters.price.includes('$150')}
              
              />
              <span className="ml-2 text-sm">Over $150</span>
            </label>
          </div>
        )}
      </div>

      {/* Shoe Height Filter */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => toggleSection('height')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold">Shoe Height</span>
          {expandedSections.height ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.height && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input 
              type="checkbox"
               className="w-4 h-4 rounded border-gray-300"
               onChange={() => handleFilterChange('height', 'low-top')}
                checked={selectedFilters.height.includes('low-top')}
                />
              <span className="ml-2 text-sm">Low Top</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300"onChange={() => handleFilterChange('height', 'mid-top')}
                checked={selectedFilters.height.includes('mid-top')} />
              <span className="ml-2 text-sm">Mid Top</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox"
               className="w-4 h-4 rounded border-gray-300" 
               onChange={() => handleFilterChange('height', 'high-top')}
                checked={selectedFilters.height.includes('high-top')}
                />
              <span className="ml-2 text-sm">High Top</span>
            </label>
          </div>
        )}
      </div>

      {/* Sports Filter */}
      <div className="border-t border-gray-200 py-4">
        <button
          onClick={() => toggleSection('sports')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-semibold">Sports</span>
          {expandedSections.sports ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.sports && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300"
              onChange={() => handleFilterChange('sports', 'lifestyle')}
                checked={selectedFilters.sports.includes('lifestyle')} />
              <span className="ml-2 text-sm">Lifestyle</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" 
              onChange={() => handleFilterChange('sports', 'Skateboarding')}
                checked={selectedFilters.sports.includes('Skateboarding')}/>
              <span className="ml-2 text-sm">Skateboarding</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" 
              onChange={() => handleFilterChange('sports', 'dance')}
                checked={selectedFilters.sports.includes('dance')}/>
              <span className="ml-2 text-sm">Dance</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}