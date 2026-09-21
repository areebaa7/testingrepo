/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './KidsBanner.css';

export default function KidsBanner({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <section className="kids-banner-section">
      {/* Full Screen Width Editorial Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="kids-editorial-card group"
        onClick={() => {
          setCurrentPage('kids');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        style={{ backgroundImage: `url('/assets/kids-banner.jpg')` }}
      >
        {/* Dark cinematic overlay for maximum clarity and contrast */}
        <div className="kids-editorial-overlay"></div>

        <div className="kids-editorial-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button 
              className="kids-shop-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage('kids');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              <span>Shop Kids</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}