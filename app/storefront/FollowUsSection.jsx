/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './FollowUsSection.css';

export default function FollowUsSection() {
  // Gallery images representing Step & Styl footwear and luxury aesthetics
  const galleryImages = [
    '/assets/shoe-1.jpg',
    '/assets/shoe-2.jpg',
    '/assets/shoe-3.jpg',
    '/assets/shoe-4.jpg',
    '/assets/shoe-5.jpg',
    '/assets/shoe-6.jpg'
  ];

  return (
    <section className="follow-us-section">
      
      {/* Edge-to-Edge Image Collage Strip with NO dark gradient overlays */}
      <div className="follow-gallery-strip">
        {galleryImages.map((imgSrc, idx) => (
          <div key={idx} className="follow-gallery-item">
            <img 
              src={imgSrc} 
              alt={`Step & Styl Gallery ${idx + 1}`} 
              onError={(e) => { e.currentTarget.src = '/logo_main.png'; }}
            />
          </div>
        ))}
      </div>

      {/* Central Floating Instagram Card */}
      <motion.div 
        className="follow-card-wrapper"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="follow-floating-card">
          
          <div className="follow-card-header">
            <div className="follow-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <h3 className="follow-platform-name">Instagram</h3>
            <span className="follow-handle">@step_andstyl</span>
          </div>

          <div className="follow-social-links-row">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/step_andstyl?igsh=dHZ0dG1qdjFoaG55" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="follow-action-btn"
            >
              <span>FOLLOW US</span>
            </a>
          </div>

        </div>
      </motion.div>

    </section>
  );
}