/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, Truck, ShieldCheck } from 'lucide-react';
import './WhyStepAndStyl.css';

export default function WhyStepAndStyl() {
  const leftPoints = [
    {
      icon: <Sparkles size={20} className="why-icon" />,
      title: "Quality Styles",
      desc: "Premium craftsmanship designed for trendsetters and day-long wearability."
    },
    {
      icon: <HeartHandshake size={20} className="why-icon" />,
      title: "Customer First",
      desc: "Dedicated support, open parcel inspection, and hassle-free returns."
    }
  ];

  const rightPoints = [
    {
      icon: <Truck size={20} className="why-icon" />,
      title: "Nationwide Delivery",
      desc: "Fast, reliable shipping right to your doorstep across Pakistan."
    },
    {
      icon: <ShieldCheck size={20} className="why-icon" />,
      title: "Trusted Service",
      desc: "Secure transactions and a smooth shopping experience every step of the way."
    }
  ];

  return (
    <section className="why-brand-section">
      <div className="why-brand-container">
        
        {/* Section Header */}
        <div className="why-section-header">
          <h2 className="why-main-heading">Why Step & Styl</h2>
          <p className="why-sub-heading">
            Stylish footwear, trusted service and an effortless shopping experience — designed to make every step better.
          </p>
        </div>

        {/* Central Layout Grid: Left Points | Center Square Image | Right Points */}
        <div className="why-center-layout-grid">
          
          {/* Left Points Column */}
          <div className="why-points-column left">
            {leftPoints.map((pt, idx) => (
              <motion.div 
                key={idx} 
                className="why-point-box"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="why-icon-badge">{pt.icon}</div>
                <div className="why-text-content">
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Featured Square Image Column */}
          <motion.div 
            className="why-center-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Watermark Logo Background Motif */}
            <div className="why-watermark-bg">
              <img src="/logo_main.png" alt="Watermark Logo" />
            </div>

            {/* Compact Square Image Card */}
            <div className="why-image-card">
              <img 
                src="/assets/shoe-8.jpg" 
                alt="Step & Styl Featured" 
                onError={(e) => { e.currentTarget.src = '/logo_main.png'; }}
              />
              <div className="why-image-overlay"></div>
            </div>
          </motion.div>

          {/* Right Points Column */}
          <div className="why-points-column right">
            {rightPoints.map((pt, idx) => (
              <motion.div 
                key={idx} 
                className="why-point-box"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="why-icon-badge">{pt.icon}</div>
                <div className="why-text-content">
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}