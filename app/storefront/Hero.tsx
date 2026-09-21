/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const heroMedia = [
  {
    type: 'image',
    url: '/assets/banner.jpg',
    mobileUrl: '/assets/mobile-banner1.jpg',
    title: 'UP TO 50% OFF',
    subtitle: 'ON EVERYTHING',
    tagline1: 'SEASON END SALE',
    tagline2: 'IN-STORES & ONLINE',
  },
  {
    type: 'image',
    url: '/assets/mens-banner.jpg',
    mobileUrl: '/assets/mens-mobile.jpg',
  },
  {
    type: 'image',
    url: '/assets/women-banner.jpg',
    mobileUrl: '/assets/mobile-banner2.jpg',
  },
];

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMedia.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentMedia = heroMedia[currentIndex];

  return (
    <section className="hero-section">
      <div className="hero-slide active">
        {currentMedia.type === 'video' ? (
          <video autoPlay loop muted playsInline className="hero-media" key={currentMedia.url}>
            <source src={currentMedia.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {/* Desktop Banner Image */}
            <img src={currentMedia.url} alt="Hero Banner Desktop" className="hero-media desktop-banner" />
            {/* Dedicated Mobile Banner Image */}
            <img src={currentMedia.mobileUrl || currentMedia.url} alt="Hero Banner Mobile" className="hero-media mobile-banner" />
          </>
        )}

        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text-group">
              <div className="hero-buttons">
                <motion.button 
                  className="btn-shop-now" 
                  onClick={() => setCurrentPage('shop')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SHOP NOW
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicator Dots */}
      <div className="carousel-dots">
        {heroMedia.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}