/* eslint-disable @typescript-eslint/no-explicit-any */
'use class';
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import './DynamicSaleBanner.css';

export default function DynamicSaleBanner({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  // Using clean static cards with verified local product image paths to prevent any 404/placeholder errors and display single prices cleanly.
  const staticProducts = [
    {
      id: 'static-1',
      name: 'Flowerly Pink',
      category: 'WOMEN',
      price: '1399',
      image: '/product/shoe-7.jpeg',
      badge: 'NEW',
      description: 'Inspired by the fleeting beauty of a tropical spring, our designers crafted this...'
    },
    {
      id: 'static-2',
      name: 'Midnight Shimmer Woven Flat',
      category: 'FLATS CASUAL WOMEN',
      price: '923',
      image: '/product/sneaker-4.jpeg',
      badge: 'SALE',
      description: 'Elevate your everyday stride with the Midnight Shimmer Flat Sandals....'
    },
    {
      id: 'static-3',
      name: 'Dual-Buckle Sandals',
      category: 'CASUAL',
      price: '3200',
      image: '/logo_main.png',
      badge: 'SALE',
      description: 'Step into effortless relaxation with these versatile double-buckle...'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white text-black overflow-hidden my-4 shadow-sm">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Heading in Purple */}
        <div className="text-center mb-12">
          <span className="text-purple-700 text-xs tracking-[0.25em] uppercase font-semibold block mb-2">
            Exclusive Collection
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-black tracking-wide">
            Flash Sale & New Arrivals
          </h2>
          <div className="w-16 h-0.5 bg-purple-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Products Grid (8 columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {staticProducts.map((item, index) => {
              const formatPrice = (val: any) => Number(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col bg-white p-4 rounded-none border border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 relative cursor-pointer text-black h-fit"
                  onClick={() => setCurrentPage('shop')}
                >
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    <span className="bg-black text-white text-[10px] tracking-widest px-2.5 py-1 uppercase rounded-none shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Product Image Box */}
                  <div className="relative w-full h-56 mb-3 overflow-hidden rounded-none bg-[#FAF8FC] flex items-center justify-center p-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 rounded-none"
                      onError={(e) => {
                        e.currentTarget.src = '/logo_main.png';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col">
                    <p className="text-[10px] tracking-widest text-purple-700 uppercase font-semibold mb-0.5">
                      {item.category}
                    </p>

                    <h3 className="text-sm font-bold text-black group-hover:text-purple-900 transition-colors mb-1 line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[32px]">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-purple-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-900">Rs. {formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Flash Sale Promotional Banner (4 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative rounded-none overflow-hidden bg-black text-white flex flex-col justify-end p-10 min-h-[500px] shadow-2xl group border border-purple-900/30"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/sale_banner_clean.png" 
                alt="Flash Sale" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 filter saturate-[0.9] contrast-105"
                onError={(e) => {
                  e.currentTarget.src = '/logo_main.png'; 
                }}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Banner Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-purple-300 text-xs tracking-widest uppercase font-semibold mb-3">
                <Zap size={16} className="text-purple-400 animate-pulse fill-purple-400" />
                <span>Limited Time Offer</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-wide text-white mb-6 leading-[1.15]">
                Flash Sale<br />Event
              </h2>
              {/* Shop Now Button styled in #c084fc */}
              <button 
                onClick={() => setCurrentPage('shop')}
                style={{ backgroundColor: '#c084fc' }}
                className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-widest hover:bg-[#a855f7] transition-all duration-300 shadow-xl"
              >
                <span>Shop Now</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}