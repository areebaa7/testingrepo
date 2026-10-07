/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, PackageCheck, DollarSign, ShieldCheck, RefreshCw, Headphones, Percent } from 'lucide-react';
import './TrustBenefits.css';

const trustBenefitsSlides = [
  {
    id: 1,
    eyebrow: 'OPEN & PAY POLICY',
    title: 'Pay Cash on Delivery & Enjoy Open Parcel Facility',
    features: [
      { icon: Truck, title: 'Fast & Secure Delivery', desc: 'Prompt delivery to all cities with secure packaging & doorstep convenience.' },
      { icon: PackageCheck, title: 'Open Parcel Facility', desc: 'Open package before payment to check items for accuracy & quality.' },
      { icon: DollarSign, title: 'Cash on Delivery', desc: 'Secure cash payment with zero prepayments & total risk-free ordering.' }
    ]
  },
  {
    id: 2,
    eyebrow: '7 DAYS RETURN POLICY',
    title: 'Not Happy With Your Purchase? Return It Within 7 Days.',
    features: [
      { icon: RefreshCw, title: '7 Days Return', desc: 'Easy returns within 7 days of receiving your order.' },
      { icon: ShieldCheck, title: '100% Trusted', desc: 'Hassle-free return process backed by our guarantee.' },
      { icon: PackageCheck, title: 'Customer First', desc: 'Your complete satisfaction is our primary commitment.' }
    ]
  },
  {
    id: 3,
    eyebrow: 'EXCLUSIVE SAVINGS',
    title: 'Save 5% Extra on Bank Transfers',
    features: [
      { icon: DollarSign, title: 'Secure Bank Transfer', desc: 'Simple & secure transfer process with details at checkout.' },
      { icon: PackageCheck, title: 'Open Parcel Facility', desc: 'Inspect items upon delivery before final confirmation.' },
      { icon: Percent, title: 'Instant Discount', desc: 'Get an automatic 5% discount applied to your bank transfers.' }
    ]
  },
  {
    id: 4,
    eyebrow: 'NATIONWIDE SERVICE',
    title: 'Fast & Secure Delivery Across Pakistan',
    features: [
      { icon: Truck, title: 'Fast Delivery', desc: 'Shipping across Pakistan right to your doorstep.' },
      { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Every pair of footwear is packed with utmost care.' },
      { icon: Headphones, title: 'Dedicated Support', desc: 'Always available to assist you with any questions.' }
    ]
  },
];

interface TrustBenefitsProps {
  setCurrentPage?: (page: string) => void;
}

export default function TrustBenefits({ setCurrentPage }: TrustBenefitsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  // Reset feature sub-index when slide changes
  useEffect(() => {
    setFeatureIndex(0);
  }, [currentIndex]);

  // Auto-slide: cycles through features one by one, then moves to the next slide
  useEffect(() => {
    const timer = setInterval(() => {
      const currentSlideFeatures = trustBenefitsSlides[currentIndex].features;
      if (featureIndex < currentSlideFeatures.length - 1) {
        setFeatureIndex((prev) => prev + 1);
      } else {
        setFeatureIndex(0);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trustBenefitsSlides.length);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, featureIndex]);

  const currentSlide = trustBenefitsSlides[currentIndex];
  const activeFeature = currentSlide.features[featureIndex];
  const IconComponent = activeFeature.icon;

  return (
    <section 
      className="trust-benefits-hero-section" 
      onClick={() => setCurrentPage && setCurrentPage('shop')} 
      style={{ cursor: 'pointer' }}
    >
      <div className="trust-benefits-container">
        
        {/* Centered Section Header */}
        <div className="trust-section-header">
          <span className="trust-header-eyebrow">Our Commitment</span>
          <h2 className="trust-header-title">WHY CHOOSE STEP & STYL</h2>
        </div>

        <div className="trust-hero-carousel-container">
          <div className="trust-container-glow-accent"></div>
          
          <div className="trust-hero-slide text-banner-slide">
            <div className="trust-slide-content-box">
              <span className="trust-slide-badge">{currentSlide.eyebrow}</span>
              <h3 className="trust-slide-heading">{currentSlide.title}</h3>
              
              <div className="trust-features-single-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${currentIndex}-${featureIndex}`}
                    className="trust-feature-card single-card-display"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="trust-feature-icon-wrap">
                      <IconComponent size={26} />
                    </div>
                    <h4 className="trust-feature-title">{activeFeature.title}</h4>
                    <p className="trust-feature-desc">{activeFeature.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sub-indicators for features within the current slide */}
              <div className="trust-sub-feature-dots" onClick={(e) => e.stopPropagation()}>
                {currentSlide.features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFeatureIndex(idx)}
                    className={`trust-sub-dot ${featureIndex === idx ? 'active' : ''}`}
                    aria-label={`Go to feature ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="trust-carousel-dots" onClick={(e) => e.stopPropagation()}>
            {trustBenefitsSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setFeatureIndex(0);
                }}
                className={`trust-dot ${currentIndex === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}