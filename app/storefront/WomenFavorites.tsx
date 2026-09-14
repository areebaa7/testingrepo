/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './WomenFavorites.css';

const fallbackWomenProducts = [
  { id: 1, title: 'Classic Urban Heel', price: '2,499', image: '/assets/shoe-7.jpeg', badge: 'POPULAR' },
  { id: 2, title: 'Minimalist Summer Sandal', price: '1,899', image: '/assets/shoe-6.jpg', badge: 'NEW' },
  { id: 3, title: 'Everyday Comfort Flat', price: '1,399', image: '/assets/sneaker-4.jpeg', badge: 'TRENDING' },
  { id: 4, title: 'Evening Party Wear', price: '3,200', image: '/assets/shoe-2.jpeg', badge: 'EXCLUSIVE' },
  { id: 5, title: 'Relaxed Casual Slide', price: '1,250', image: '/assets/openAndpay.jpeg', badge: 'HOT' },
];

export default function WomenFavorites({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [products, setProducts] = useState(fallbackWomenProducts);

  // Fetch products from admin panel API and dynamically filter for Women category
  useEffect(() => {
    async function fetchWomenProducts() {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Flexible filter for women products from admin database
          const womenItems = json.data.filter((item: any) => {
            const cat = (item.category || item.tag || '').toLowerCase();
            const name = (item.name || item.title || '').toLowerCase();
            const gender = (item.gender || '').toLowerCase();
            const desc = (item.description || '').toLowerCase();

            // Exclude explicit men products first
            const isMen = cat.includes('men') || gender.includes('men') || name.includes('men');
            if (isMen && !cat.includes('women')) return false;

            // Include if matches women indicators or general female footwear keywords
            return (
              cat.includes('women') || 
              cat.includes('female') || 
              cat.includes('ladies') || 
              cat.includes('girl') || 
              gender.includes('women') || 
              gender.includes('female') ||
              name.includes('women') || 
              name.includes('ladies') || 
              name.includes('heel') || 
              name.includes('sandal') || 
              name.includes('flat') ||
              name.includes('women')
            );
          });

          // If admin has matching women items, use them; otherwise fallback gracefully or use all active items if appropriate
          const displayItems = womenItems.length > 0 ? womenItems : json.data;

          if (displayItems.length > 0) {
            const formatted = displayItems.map((item: any) => {
              let rawImage = item.image || item.imageUrl || '/logo_main.png';
              if (typeof rawImage === 'string') {
                rawImage = rawImage.replace(/\\/g, '/');
                if (rawImage.includes('placeholder') || rawImage.trim() === '') {
                  rawImage = '/logo_main.png';
                } else if (!rawImage.startsWith('http') && !rawImage.startsWith('/')) {
                  rawImage = '/' + rawImage;
                }
              }

              return {
                id: item.id,
                title: item.name || item.title || 'Women Footwear',
                price: item.salePrice || item.price || '0',
                image: rawImage,
                badge: item.badge || 'POPULAR'
              };
            });
            setProducts(formatted);
          }
        }
      } catch (err) {
        console.error('Failed to load admin products for Women Favorites, using fallback:', err);
      }
    }
    fetchWomenProducts();
  }, []);

  const formatPrice = (val: string | number) => Number(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Duplicate the product array to create a seamless infinite loop animation track
  const loopingProducts = [...products, ...products, ...products];

  return (
    <section className="women-favorites-section">
      <div className="women-favorites-container">
        
        <div className="women-favorites-grid">
          
          {/* Left Side: Large Promotional Banner */}
          <motion.div 
            className="women-fav-banner"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.65)), url('/assets/seasonal-style-guide.png')` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="women-banner-content">
              <span className="women-banner-eyebrow">Curated Selection</span>
              <h2 className="women-fav-title">Women's Favorites</h2>
              <p className="women-fav-subtitle">Discover footwear made for every occasion.</p>
              
              <motion.button 
                className="btn-explore-favorites"
                onClick={() => setCurrentPage('women')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Favorite's</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side: Auto-Scrolling Infinite Product Ticker */}
          <div className="women-fav-carousel-container">
            <div className="women-fav-carousel-wrapper">
              <div className="women-ticker-track">
                {loopingProducts.map((item, index) => (
                  <motion.div 
                    key={`${item.id}-${index}`} 
                    className="women-product-card"
                    onClick={() => setCurrentPage('women')}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.badge && <span className="women-product-badge">{item.badge}</span>}
                    <div className="women-product-img-wrap">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="women-product-img"
                        onError={(e) => {
                          e.currentTarget.src = '/logo_main.png';
                        }}
                      />
                    </div>
                    <div className="women-product-details">
                      <h3 className="women-product-title">{item.title}</h3>
                      <p className="women-product-price">Rs. {formatPrice(item.price)}</p>
                      <span className="women-product-link">View Collection &rarr;</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}