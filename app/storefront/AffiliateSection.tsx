/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './AffiliateSection.css';

interface AffiliateSectionProps {
  setCurrentPage: (page: string) => void;
}

export default function AffiliateSection({ setCurrentPage }: AffiliateSectionProps) {
  return (
    <section className="affiliate-section-full">
      <div className="affiliate-banner-container">
        
        {/* Full-Width Background Banner Image */}
        <div className="affiliate-banner-image-wrapper">
          <img 
            src="/assets/affiliate.jpg" 
            alt="Earn With Step & Styl Affiliate" 
            onError={(e) => { e.currentTarget.src = '/assets/shoe-8.jpg'; }}
          />
        </div>

        {/* Absolute Overlay with Join Button Only */}
        <div className="affiliate-banner-overlay">
          <motion.button 
            className="btn-join-affiliate"
            onClick={() => {
              setCurrentPage('affiliate');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span>JOIN AFFILIATE PROGRAM</span>
          </motion.button>
        </div>

      </div>
    </section>
  );
}