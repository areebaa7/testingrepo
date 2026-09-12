/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './NewArrivals.css';

const fallbackPlaceholders = [
  { id: 1, title: 'Classic Urban Sneaker', price: '1,399', image: '/assets/shoe-2.jpeg', badge: 'NEW' },
  { id: 2, title: 'Minimalist Leather Loafer', price: '2,499', image: '/assets/shoe-6.jpg', badge: 'TRENDING' },
  { id: 3, title: 'Signature Evening Heel', price: '3,200', image: '/assets/shoe-7.jpeg', badge: 'SALE' },
  { id: 4, title: 'Modern Street Runner', price: '1,999', image: '/assets/sneaker-4.jpeg', badge: 'NEW' },
  { id: 5, title: 'Velvet Strap Sandal', price: '1,750', image: '/assets/openAndpay.jpeg', badge: 'HOT' },
];

export default function NewArrivals({ setCurrentPage }) {
  const [products, setProducts] = useState(fallbackPlaceholders);

  // Fetch products added from the admin panel API
  useEffect(() => {
    async function fetchAdminProducts() {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const formatted = json.data.map((item) => ({
            id: item.id,
            title: item.name || item.title || 'Product',
            price: item.salePrice || item.price || '0',
            image: item.image || item.imageUrl || '/logo_main.png',
            badge: item.badge || 'NEW'
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error('Failed to load admin products for new arrivals, using fallback:', err);
      }
    }
    fetchAdminProducts();
  }, []);

  const formatPrice = (val) => Number(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Duplicate the product array to create an infinite seamless loop effect
  const loopingProducts = [...products, ...products, ...products];

  return (
    <section className="new-arrivals-section">
      <div className="arrivals-header-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          New Arrivals
        </motion.h2>
        <div className="w-12 h-0.5 bg-purple-600 mx-auto mt-2"></div>
      </div>

      {/* Infinite Running Ticker Carousel Track */}
      <div className="arrivals-ticker-container">
        <div className="arrivals-ticker-track">
          {loopingProducts.map((item, index) => (
            <motion.div 
              key={`${item.id}-${index}`} 
              className="arrival-product-card" 
              onClick={() => setCurrentPage('shop')}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {item.badge && (
                <span className="arrival-badge">{item.badge}</span>
              )}
              <div className="arrival-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="arrival-product-image"
                  onError={(e) => {
                    e.currentTarget.src = '/logo_main.png';
                  }}
                />
              </div>
              <div className="arrival-card-details">
                <h3 className="arrival-product-title">{item.title}</h3>
                <p className="arrival-product-price">Rs. {formatPrice(item.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}