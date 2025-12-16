import React from 'react';
import { Twitter, Facebook, Instagram, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const footerSections = [
    {
      title: 'Featured',
      links: ['Air Force 1', 'Huarache', 'Air Max 90', 'Air Max 95']
    },
    {
      title: 'Shoes',
      links: ['All Shoes', 'Custom Shoes', 'Jordan Shoes', 'Running Shoes']
    },
    {
      title: 'Men',
      links: ['Air Max 1', 'Air Max 2', 'Air Max 3', 'Air Max 4']
    },
    {
      title: 'Women',
      links: ['React Presto 1', 'React Presto 2', 'React Presto 3', 'React Presto 4']
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
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base block"
                    >
                      {link}
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