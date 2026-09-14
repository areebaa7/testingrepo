/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './AffiliateSection.css';

export default function AffiliateSection({ setCurrentPage }) {
  return (
    <section className="affiliate-section-split">
      <div className="affiliate-split-container">
        
        {/* Left Content Box */}
        <motion.div 
          className="affiliate-left-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="affiliate-mini-tag">Create. Share. Earn.</span>
          <h2 className="affiliate-main-heading">
            Earn With <br />
            <span>Step & Styl</span>
          </h2>
          <p className="affiliate-subtext">
            Join our Affiliate Program and earn by sharing your favorite Step & Styl looks.
          </p>
          
          <motion.button 
            className="btn-join-affiliate"
            onClick={() => {
              setCurrentPage('affiliate');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>JOIN AFFILIATE PROGRAM</span>
          </motion.button>
        </motion.div>

        {/* Right Image Box */}
        <motion.div 
          className="affiliate-right-image"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="affiliate-image-wrapper">
            <img 
              src="/assets/affiliate1.jpg" 
              alt="Earn With Step & Styl Affiliate" 
              onError={(e) => { e.currentTarget.src = '/assets/shoe-8.jpg'; }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}