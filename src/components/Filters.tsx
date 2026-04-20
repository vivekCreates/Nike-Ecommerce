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
    const params = new URLSearchParams(searchParams.toString());
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

  const activeFiltersCount = () => {
    let count = 0;
    searchParams.forEach((value) => {
      if (value) count++;
    });
    return count;
  };

  return (
    <>
      <div className="lg:hidden p-4 ">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-2 py-2 sm:px-4 border rounded-lg text-sm font-medium"
        >
          <Filter size={18} /> Filters {activeFiltersCount() > 0 && `(${activeFiltersCount()})`}
        </button>
      </div>

      <aside
  className={`
    transition-transform duration-300 ease-in-out bg-white
    fixed top-0 left-0 z-50 h-full w-3/4 max-w-sm p-6
    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:static lg:translate-x-0 lg:w-1/5 lg:min-h-screen lg:p-6
  `}
>
        <div className="flex justify-between bg-white items-center mb-6 lg:hidden">
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
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="font-semibold">Shop By Price</span>
            {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedSections.price && (
            <div className="space-y-2">
              {[
                { key: 'under-50', label: '$0 - $50' },
                { key: '50-100', label: '$50 - $100' },
                { key: '100-150', label: '$100 - $150' },
                { key: 'over-150', label: 'Over $150' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('price').includes(key)}
                    onChange={() => handleFilterChange('price', key)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm">{label}</span>
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
            <span className="font-semibold">Category</span>
            {expandedSections.sports ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedSections.sports && (
            <div className="space-y-2">
              {[
                { key: 'shoes', label: 'Shoes' },
                { key: 'running-shoes', label: 'Running Shoes' },
                { key: 'lifestyle', label: 'Lifestyle' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={getSelectedValues('sports').includes(key)}
                    onChange={() => handleFilterChange('sports', key)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 py-6">
          <button
            onClick={() => {
              const params = new URLSearchParams();
              router.push('?');
              setMobileOpen(false);
            }}
            className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </aside>

     
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
