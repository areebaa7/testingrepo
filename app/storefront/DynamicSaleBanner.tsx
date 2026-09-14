/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Truck, RefreshCw, CreditCard, Sparkles } from 'lucide-react';
import './DynamicSaleBanner.css';

export default function DynamicSaleBanner({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Live Countdown State (2 hours, 15 minutes, 42 seconds)
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 15 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs} : ${mins} : ${secs}`;
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load flash sale products from admin API:', err);
      }
    }
    fetchProducts();
  }, []);

  const fallbackProducts = [
    {
      id: 'fb-1',
      name: "Classic Women's Heel",
      price: 4999,
      salePrice: 3499,
      image: '/assets/shoe-7.jpeg',
      discount: '30% OFF'
    },
    {
      id: 'fb-2',
      name: "Urban Men's Oxford",
      price: 6500,
      salePrice: 4550,
      image: '/assets/shoe-6.jpg',
      discount: '30% OFF'
    },
    {
      id: 'fb-3',
      name: "Minimalist Leather Loafer",
      price: 3999,
      salePrice: 2999,
      image: '/assets/sneaker-4.jpeg',
      discount: '25% OFF'
    },
    {
      id: 'fb-4',
      name: "Velvet Strap Party Heel",
      price: 5200,
      salePrice: 3640,
      image: '/assets/shoe-2.jpeg',
      discount: '30% OFF'
    }
  ];

  const activeProducts = products.length > 0 ? products : fallbackProducts;

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const formatPrice = (val: any) => Number(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Trust items list for the infinite auto-scrolling ticker
  const trustItems = [
    { icon: <CreditCard size={20} className="text-purple-300 shrink-0" />, text: "5% Discount on Bank Transfer" },
    { icon: <ShieldCheck size={20} className="text-purple-300 shrink-0" />, text: "Check Before Payment" },
    { icon: <RefreshCw size={20} className="text-purple-300 shrink-0" />, text: "7 Days Easy Return" },
    { icon: <Truck size={20} className="text-purple-300 shrink-0" />, text: "Nationwide Fast Shipping" }
  ];

  // Tripled array to ensure seamless infinite looping without gaps
  const loopingTrustItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <>
      {/* 8. Flash Sale Section */}
      <section className="flash-sale-section pt-12 pb-8 px-4 md:px-12 bg-gradient-to-b from-white via-purple-50/20 to-white text-black overflow-hidden my-2">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header with Title, Subtext, Countdown & VIEW ALL */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-purple-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-700 text-xs tracking-[0.25em] uppercase font-bold mb-2">
                <Sparkles size={14} className="animate-pulse" />
                <span>Limited Stock Offer</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-black tracking-wide uppercase font-medium">
                  Flash Sale
                </h2>
                {/* Live Ticking Countdown Timer Badge */}
                <div className="bg-purple-900 text-white border border-purple-800 px-3 py-1 text-xs font-mono font-bold tracking-wider shadow-md">
                  ⚡ {formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-xs tracking-wider text-gray-500 uppercase font-medium mt-2">
                Exclusive limited-time styles curated for your wardrobe.
              </p>
            </div>

            <button 
              onClick={() => setCurrentPage('shop')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] bg-black text-white px-6 py-3 rounded-none hover:bg-purple-800 transition-all shadow-lg w-full md:w-auto justify-center"
            >
              <span>View All</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>

          {/* Product Grid: Desktop 4 products per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {activeProducts.map((item, index) => {
              const name = item.name || item.title || 'Footwear Item';
              const price = item.price || 4999;
              const salePrice = item.salePrice || item.price * 0.7;
              
              const discountPercent = item.discount || (salePrice < price ? `${Math.round(((price - salePrice) / price) * 100)}% OFF` : 'SPECIAL');
              
              let rawImage = item.image || item.imageUrl || '/logo_main.png';
              if (typeof rawImage === 'string') {
                rawImage = rawImage.replace(/\\/g, '/');
                if (!rawImage.startsWith('http') && !rawImage.startsWith('/')) {
                  rawImage = '/' + rawImage;
                }
              }

              const isWishlisted = wishlist.includes(item.id || String(index));

              return (
                <motion.div 
                  key={item.id || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col bg-white p-4 rounded-none border border-gray-100 hover:border-purple-600 transition-all duration-300 relative cursor-pointer shadow-sm hover:shadow-2xl"
                  onClick={() => setCurrentPage('shop')}
                >
                  {/* Sale Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-purple-900 text-white text-[10px] tracking-widest px-3 py-1 uppercase font-bold shadow-md">
                      {discountPercent}
                    </span>
                  </div>

                  {/* Wishlist Icon */}
                  <button 
                    onClick={(e) => toggleWishlist(e, item.id || String(index))}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-purple-700 transition-all shadow-md hover:scale-110"
                    aria-label="Wishlist"
                  >
                    <Heart size={16} className={isWishlisted ? "fill-purple-600 text-purple-600" : ""} />
                  </button>

                  {/* Product Image */}
                  <div className="relative w-full h-72 sm:h-80 mb-4 bg-[#FAF8FC] overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={rawImage} 
                      alt={name} 
                      className="object-cover h-full w-full group-hover:scale-108 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = '/logo_main.png';
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-800 transition-colors line-clamp-1 font-serif tracking-wide">
                      {name}
                    </h3>

                    {/* Price & Sale Price layout */}
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-bold text-purple-900 tracking-wider">Rs. {formatPrice(salePrice)}</span>
                      {price > salePrice && (
                        <span className="text-xs text-gray-400 line-through">Rs. {formatPrice(price)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Second Trust Carousel (Infinite Auto-Moving Ticker, repositioned closer upward) */}
      <section className="second-trust-section py-4 bg-purple-900 text-white overflow-hidden shadow-inner my-2">
        <div className="trust-ticker-container">
          <div className="trust-ticker-track">
            {loopingTrustItems.map((item, idx) => (
              <div key={idx} className="trust-ticker-item flex items-center gap-3 shrink-0 px-6">
                {item.icon}
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-100 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}