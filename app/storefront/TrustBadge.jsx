'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, Percent, Truck } from 'lucide-react';
import './TrustBadge.css';

const trustItems = [
  {
    id: 1,
    title: '5% Discount on Bank Transfer',
    icon: <Percent size={18} />,
  },
  {
    id: 2,
    title: 'Check Before Payment',
    icon: <ShieldCheck size={18} />,
  },
  {
    id: 3,
    title: '7 Days Easy Return',
    icon: <RefreshCw size={18} />,
  },
  {
    id: 4,
    title: 'Nationwide Fast Shipping',
    icon: <Truck size={18} />,
  },
];

export default function TrustBadge() {
  return (
    <div className="trust-badge-wrapper">
      <div className="trust-badge-track">
        {/* Render twice to create a seamless infinite scrolling effect on desktop */}
        {[...trustItems, ...trustItems].map((item, index) => (
          <motion.div 
            key={`${item.id}-${index}`} 
            className="trust-badge-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="trust-badge-icon">{item.icon}</span>
            <span className="trust-badge-text">{item.title}</span>
            <span className="trust-badge-bullet">&bull;</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}