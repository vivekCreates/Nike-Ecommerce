import React from 'react';
import { Twitter, Facebook, Instagram, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/lib/actions/products';

export default async function Footer() {
  const products = await getAllProducts();

  // Group products by category for footer sections
  const featuredProducts = products.filter(p => ['Nike Air Force 1', 'Nike Air Max 90', 'Nike Air Max 97', 'Nike Air Max 270'].includes(p.name)).slice(0, 4);
  const shoesProducts = products.filter(p => p.category === 'Shoes').slice(0, 4);
  const menProducts = products.filter(p => p.gender === 'Men').slice(0, 4);
  const womenProducts = products.filter(p => p.gender === 'Women').slice(0, 4);

  const footerSections = [
    {
      title: 'Featured',
      links: featuredProducts.length > 0 ? featuredProducts.map(p => ({ name: p.name, id: p.id })) : [
        { name: 'Air Force 1', id: 'default1' },
        { name: 'Air Max 90', id: 'default2' },
        { name: 'Air Max 97', id: 'default3' },
        { name: 'Air Max 270', id: 'default4' }
      ]
    },
    {
      title: 'Shoes',
      links: shoesProducts.length > 0 ? shoesProducts.map(p => ({ name: p.name, id: p.id })) : [
        { name: 'All Shoes', id: 'default5' },
        { name: 'Custom Shoes', id: 'default6' },
        { name: 'Jordan Shoes', id: 'default7' },
        { name: 'Running Shoes', id: 'default8' }
      ]
    },
    {
      title: 'Men',
      links: menProducts.length > 0 ? menProducts.map(p => ({ name: p.name, id: p.id })) : [
        { name: 'Air Max 1', id: 'default9' },
        { name: 'Air Max 2', id: 'default10' },
        { name: 'Air Max 3', id: 'default11' },
        { name: 'Air Max 4', id: 'default12' }
      ]
    },
    {
      title: 'Women',
      links: womenProducts.length > 0 ? womenProducts.map(p => ({ name: p.name, id: p.id })) : [
        { name: 'React Presto 1', id: 'default13' },
        { name: 'React Presto 2', id: 'default14' },
        { name: 'React Presto 3', id: 'default15' },
        { name: 'React Presto 4', id: 'default16' }
      ]
    }
  ];

  const bottomLinks = [
    'Guides',
    'Terms of Sale',
    'Terms of Use',
    'Nike Privacy Policy'
  ];

  return (
    <footer className="bg-black text-white">
      <div className="w-full px-10 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div className="md:flex items-start lg:col-span-1 hidden">
            <div className="w-16 h-full  sm:w-20 sm:h-20 flex items-center">
              <Image src={"/logo.svg"} width={100} height={100} alt='logo' />
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-base sm:text-lg  mb-4 sm:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4 ">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.id.startsWith('default') ? '#' : `/shoes/${link.id}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        <div className="flex justify-end lg:hidden mb-8">
          <div className="flex space-x-3">
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>Croatia</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <Link href="https://www.nike.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                nike.com
              </Link>
              <span className="hidden sm:inline">•</span>
              <span className="w-full sm:w-auto">© 2025 Nike, Inc. All Rights Reserved</span>
            </div>

            {/* Right Side - Links and Social Icons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
              {/* Bottom Links */}
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
                {bottomLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Social Icons - Desktop only */}
              <div className="hidden lg:flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}