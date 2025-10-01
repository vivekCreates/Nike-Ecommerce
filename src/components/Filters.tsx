'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    gender: true,
    kids: false,
    price: true,
    height: false,
    sports: true,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const getSelectedValues = (category: string) => {
    return searchParams.getAll(category);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (category: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const values = params.getAll(category);

    if (values.includes(value)) {
      // remove value
      const newValues = values.filter((v) => v !== value);
      params.delete(category);
      newValues.forEach((v) => params.append(category, v));
    } else {
      // add value
      params.append(category, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="lg:hidden p-4 bg-light-200">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-2 py-2 sm:px-4 border rounded-lg text-sm font-medium"
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      <aside
        className={`
          fixed top-0 left-0 h-full w-3/4 max-w-sm bg-light-200 shadow-lg p-6 z-50 
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:w-1/5 lg:min-h-screen lg:p-6
        `}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setMobileOpen(false)} className="text-gray-500">
            ✕
          </button>
        </div>

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
              {['men', 'women', 'unisex'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('gender').includes(option)}
                    onChange={() => handleFilterChange('gender', option)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

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
              {['boys', 'girls'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('kids').includes(option)}
                    onChange={() => handleFilterChange('kids', option)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

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
              {['$25 - $50', '$50 - $100', '$100 - $150', 'Over $150'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('price').includes(option)}
                    onChange={() => handleFilterChange('price', option)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

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
              {['low-top', 'mid-top', 'high-top'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('height').includes(option)}
                    onChange={() => handleFilterChange('height', option)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

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
              {['lifestyle', 'skateboarding', 'dance'].map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('sports').includes(option)}
                    onChange={() => handleFilterChange('sports', option)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>

     
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
