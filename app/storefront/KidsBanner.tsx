/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import './KidsBanner.css';

export default function KidsBanner({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <section className="kids-banner-section">
      <div className="kids-banner-container">
        
        {/* Section Heading */}
        <div className="kids-section-header">
          <span className="kids-section-subtitle">
            Little Steps & Style
          </span>
          <h2 className="kids-section-title">
            Explore Kids Collection
          </h2>
          <div className="kids-title-underline"></div>
        </div>

        <div className="kids-banner-grid">
          
          {/* Left Side: Text & Description Banner (8 columns on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="kids-text-card group"
          >
            <div className="kids-card-inner">
              <div className="kids-badge-tag">
                <Sparkles size={16} className="text-purple-600 animate-pulse" />
                <span>New Season Kids Footwear</span>
              </div>
              
              <h3 className="kids-card-heading">
                Playful Comfort<br />For Little Explorers
              </h3>
              
              <p className="kids-card-desc">
                Designed for everyday adventures. Explore our exclusive range of durable, flexible, and trendy shoes crafted specifically for growing feet.
              </p>

              <button 
                onClick={() => setCurrentPage('kids')}
                style={{ backgroundColor: '#9b4de0' }}
                className="kids-shop-btn"
              >
                <span>Shop Kids Collection</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Side: Kids Collection Promotional Visual Banner (4 columns on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="kids-visual-card group"
            onClick={() => setCurrentPage('kids')}
          >
            <div className="kids-visual-bg">
              <img 
                src="/assets/kids.webp" 
                alt="Kids Collection Banner" 
                className="kids-visual-img"
                onError={(e) => {
                  e.currentTarget.src = '/logo_main.png'; 
                }}
              />
              <div className="kids-visual-overlay"></div>
            </div>

            <div className="kids-visual-content">
              <span className="kids-visual-tag">
                Trendy & Durable
              </span>
              <h3 className="kids-visual-heading">
                Designed For Kids
              </h3>
              <span className="kids-visual-link">
                Discover More &rarr;
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}