/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Percent, Truck } from 'lucide-react';
import './trustcarousel.css';

const trustBenefitsItems = [
  {
    id: 1,
    title: 'Check Before You Pay',
    description: 'Inspect your order before payment.',
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: '7 Days Easy Return',
    description: 'Easy return within 7 days.',
    icon: RotateCcw,
  },
  {
    id: 3,
    title: '5% OFF Bank Transfer',
    description: 'Get extra discount on direct payment.',
    icon: Percent,
  },
  {
    id: 4,
    title: 'Nationwide Fast Delivery',
    description: 'Fast delivery across Pakistan.',
    icon: Truck,
  },
];

interface TrustCarouselProps {
  setCurrentPage?: (page: string) => void;
}

export default function TrustCarousel({ setCurrentPage }: TrustCarouselProps) {
  return (
    <section 
      className="trust-benefits-section"
      onClick={() => setCurrentPage && setCurrentPage('shop')}
    >
      <div className="trust-benefits-container">
        <div className="trust-benefits-grid">
          {trustBenefitsItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={item.id}
                className="trust-benefit-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="trust-benefit-icon-wrap">
                  <IconComponent className="trust-benefit-line-icon" strokeWidth={1.5} size={28} />
                </div>
                <div className="trust-benefit-text">
                  <h4 className="trust-benefit-title">{item.title}</h4>
                  <p className="trust-benefit-desc">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}