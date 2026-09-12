'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, RefreshCcw, Percent, Truck } from 'lucide-react';
import './TrustBenefits.css';

const trustBenefitsSlides = [
  {
    id: 1,
    badge: 'CONFIDENCE FIRST',
    title: 'Check Before You Pay',
    subtitle: 'Inspect your order completely upon delivery before making any payment.',
    image: '/assets/openAndpay.jpeg',
    icon: <ShieldCheck size={28} />,
  },
  {
    id: 2,
    badge: 'HASSLE-FREE',
    title: '7 Days Easy Return',
    subtitle: 'Not quite right? Enjoy smooth, straightforward returns within 7 days.',
    image: '/assets/returnpolicy.png',
    icon: <RefreshCcw size={28} />,
  },
  {
    id: 3,
    badge: 'SPECIAL SAVINGS',
    title: '5% OFF Bank Transfer',
    subtitle: 'Get an extra discount instantly when choosing direct bank transfer at checkout.',
    image: '/assets/Safe and Secure Payment.jpg',
    icon: <Percent size={28} />,
  },
  {
    id: 4,
    badge: 'NATIONWIDE SERVICE',
    title: 'Fast Delivery Across Pakistan',
    subtitle: 'Swift, reliable doorstep shipping to any city nationwide.',
    image: '/assets/shipping.jpg',
    icon: <Truck size={28} />,
  },
];

export default function TrustBenefits({ setCurrentPage }) {
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
    <section className="trust-benefits-hero-section">
      <div className="trust-hero-carousel-container">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="trust-hero-slide"
          >
            {/* Left Content Block */}
            <div className="trust-hero-content">
              <div className="trust-hero-badge-tag">
                <span className="trust-icon-box">{currentSlide.icon}</span>
                <span>{currentSlide.badge}</span>
              </div>
              <h2 className="trust-hero-title">{currentSlide.title}</h2>
              <p className="trust-hero-subtitle">{currentSlide.subtitle}</p>
              
              <button 
                className="trust-hero-btn"
                onClick={() => setCurrentPage('shop')}
              >
                Explore Collection
              </button>
            </div>

            {/* Right Full-Display Product/Banner Image Block */}
            <div className="trust-hero-image-wrapper">
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
        <div className="trust-carousel-dots">
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