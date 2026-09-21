/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TrustBenefits.css';

const trustBenefitsSlides = [
  {
    id: 1,
    title: 'Check Before You Pay',
    image: '/assets/openAndpay.jpg',
  },
  {
    id: 2,
    title: '7 Days Easy Return',
    image: '/assets/returnpolicy.jpg',
  },
  {
    id: 3,
    title: '5% OFF Bank Transfer',
    image: '/assets/trust3.jpg',
  },
  {
    id: 4,
    title: 'Fast Delivery Across Pakistan',
    image: '/assets/shipping.jpeg',
  },
];

interface TrustBenefitsProps {
  setCurrentPage?: (page: string) => void;
}

export default function TrustBenefits({ setCurrentPage }: TrustBenefitsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trustBenefitsSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = trustBenefitsSlides[currentIndex];

  return (
    <section 
      className="trust-benefits-hero-section" 
      onClick={() => setCurrentPage && setCurrentPage('shop')} 
      style={{ cursor: 'pointer' }}
    >
      <div className="trust-hero-carousel-container">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="trust-hero-slide full-banner-slide"
          >
            {/* Full Size Banner Image Block */}
            <div className="trust-hero-image-wrapper full-width-wrapper">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title} 
                className="trust-hero-img"
                onError={(e) => {
                  e.currentTarget.src = '/logo_main.png';
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicator Dots */}
        <div className="trust-carousel-dots" onClick={(e) => e.stopPropagation()}>
          {trustBenefitsSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`trust-dot ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}