/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './MensCollectionBanner.css';

const menSlides = [
  {
    id: 1,
    eyebrow: 'Editorial Collection',
    title: "Men's Collection",
    subtitle: 'Everyday footwear. Modern comfort. Timeless style.',
    image: '/assets/men-shoe-care-guide.png'
  },
  {
    id: 2,
    eyebrow: 'New Urban Series',
    title: 'Performance & Luxury',
    subtitle: 'Engineered for the modern stride. Built to last.',
    image: '/assets/mens-collection.jpg'
  },
  {
    id: 3,
    eyebrow: 'Formal & Occasion',
    title: 'Sophisticated Strides',
    subtitle: 'Classic oxfords and refined leathers for every milestone.',
    image: '/assets/men_mobile.png'
  }
];

export default function MensCollectionBanner({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % menSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = menSlides[currentSlide];

  return (
    <section className="mens-banner-section">
      <div className="mens-banner-container">
        
        {/* Background Image Slideshow with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mens-banner-bg"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.45) 70%, rgba(0, 0, 0, 0.2) 100%), url('${slide.image}')` 
            }}
          />
        </AnimatePresence>

        {/* Content Layer */}
        <div className="mens-banner-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="mens-banner-eyebrow">{slide.eyebrow}</span>
              <h2 className="mens-banner-title">{slide.title}</h2>
              <p className="mens-banner-subtitle">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
          
          <motion.button 
            className="btn-shop-men"
            onClick={() => setCurrentPage('men')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>SHOP MEN</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mens-banner-dots">
          {menSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`mens-dot ${currentSlide === idx ? 'active' : ''}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}