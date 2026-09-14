/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Minus, Plus, ShoppingBag, 
  Truck, ShieldCheck, RefreshCw, X, Ruler, Percent, CheckCircle2, Sparkles, CreditCard 
} from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail({ product, onBack, onAddToCart }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Dynamic images and description switches based on color or default product data
  const images = product.images && product.images.length > 0 ? product.images : [product.image, product.image];

  const activeDescription = product.description || 'Crafted with precision for style and day-long wearability.';

  // Unique product specifications mapping (falls back to defaults if not specified per shoe)
  const productSpecs = product.details || {
    embellishment: 'None / Clean Finish',
    heelType: 'Standard Sole',
    heelHeight: 'Flat / 1.0 inch',
    liningMaterial: 'Breathable Synthetic PU',
    shoeSole: 'Non-Slip Durable Sheet',
    upperMaterial: 'Premium Synthetic Leather'
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('39');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [addedNotification, setAddedNotification] = useState(false);

  // Pop-up modal state for 5% Bank Transfer offer upon opening product page and adding to cart
  const [showBankOfferModal, setShowBankOfferModal] = useState(false);

  useEffect(() => {
    // Show bank offer popup automatically when product page mounts
    const timer = setTimeout(() => {
      setShowBankOfferModal(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Accordion Toggle State for Product Details (Open by default)
  const [productDetailsOpen, setProductDetailsOpen] = useState(true);

  const availableSizes = ['36', '37', '39', '40', '41'];

  const handleColorChange = (index) => {
    setSelectedColorIndex(index);
    setActiveImageIndex(0);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const chosenColor = (product.colors && product.colors.length > 0) 
      ? (product.colors[selectedColorIndex] || '#000000') 
      : null;

    onAddToCart({
      ...product,
      title: product.title || product.name,
      description: activeDescription,
      image: images[activeImageIndex],
      selectedSize: selectedSize,
      size: selectedSize,
      selectedColor: chosenColor,
      color: chosenColor,
      quantity,
    });

    setAddedNotification(true);
    // Show popup again when item is added to cart to remind about bank transfer savings
    setShowBankOfferModal(true);
    setTimeout(() => setAddedNotification(false), 2500);
  };

  return (
    <motion.div 
      className="pdp-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button className="pdp-back-btn" onClick={onBack}>
        &larr; Back to Catalog
      </button>

      <div className="pdp-grid-layout">
        
        {/* Left Column: Scrollable Gallery */}
        <div className="pdp-gallery-section">
          <div className="pdp-main-image-wrapper">
            {images.length > 1 && (
              <button className="gallery-arrow left" onClick={handlePrevImage}>
                <ChevronLeft size={20} />
              </button>
            )}

            <motion.img 
              key={images[activeImageIndex]}
              src={images[activeImageIndex]} 
              alt={product.title}
              className="pdp-main-image"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {images.length > 1 && (
              <button className="gallery-arrow right" onClick={handleNextImage}>
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <div className="pdp-thumbnails-row">
            {images.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className={`pdp-thumb-box ${activeImageIndex === idx ? 'active-thumb' : ''}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img src={imgUrl} alt={`Thumb ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Accordion Sections */}
        <div className="pdp-info-section">
          <span className="pdp-category-tag">{product.category || 'Luxury Footwear'}</span>
          <h1 className="pdp-product-title">{product.title || product.name}</h1>

          <div className="pdp-pricing-box">
            <span className="pdp-sale-price">{product.formattedPrice || product.price}</span>
            {product.formattedOriginalPrice && (
              <span className="pdp-original-price">{product.formattedOriginalPrice}</span>
            )}
            <span className="pdp-discount-badge">{product.discount || '15% OFF'}</span>
          </div>

          <p className="pdp-short-desc">
            {activeDescription}
          </p>

          {/* Color Option Swatches */}
          <div className="pdp-option-group">
            <label className="pdp-option-label">
              Color Option
            </label>
            <div className="pdp-color-swatches">
              {product.colors && product.colors.length > 0 ? (
                product.colors.map((hex, idx) => (
                  <div 
                    key={idx}
                    className={`pdp-color-dot ${selectedColorIndex === idx ? 'selected-color' : ''}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => handleColorChange(idx)}
                  />
                ))
              ) : (
                <div className="pdp-color-dot selected-color" style={{ backgroundColor: '#1F2937' }} />
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="pdp-option-group">
            <div className="pdp-size-header">
              <label className="pdp-option-label">Select Size (EU):</label>
              <button className="pdp-size-chart-link" onClick={() => setShowSizeChart(true)}>
                <Ruler size={14} /> Size Chart
              </button>
            </div>
            <div className="pdp-sizes-row">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`pdp-size-btn ${selectedSize === size ? 'active-size' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="pdp-option-group">
            <label className="pdp-option-label">Quantity:</label>
            <div className="pdp-quantity-wrapper">
              <button className="qty-btn" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                <Minus size={16} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(prev => prev + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button className="pdp-add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingBag size={18} /> Add to Cart
          </button>

          {addedNotification && (
            <motion.p className="pdp-success-alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Successfully added to cart!
            </motion.p>
          )}

          {/* ========================================== */}
          {/* HIGHLY VISIBLE ASSURANCES GRID BELOW CART  */}
          {/* ========================================== */}
          <div className="pdp-product-assurances-grid">
            <div className="assurance-card">
              <CheckCircle2 size={20} className="assurance-icon" />
              <div>
                <h5>Check Before You Pay</h5>
                <p>Inspect your order before payment.</p>
              </div>
            </div>

            <div className="assurance-card">
              <RefreshCw size={20} className="assurance-icon" />
              <div>
                <h5>7 Days Easy Return</h5>
                <p>Easy return within 7 days.</p>
              </div>
            </div>

            <div className="assurance-card highlight-bank-card">
              <Percent size={20} className="assurance-icon" />
              <div>
                <h5>5% OFF Bank Transfer</h5>
                <p>Get extra discount on direct payment.</p>
              </div>
            </div>

            <div className="assurance-card">
              <Truck size={20} className="assurance-icon" />
              <div>
                <h5>Nationwide Fast Delivery</h5>
                <p>Fast delivery across Pakistan.</p>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* PRODUCT DETAILS ACCORDION SECTION ONLY    */}
          {/* ========================================== */}
          <div className="pdp-accordion-wrapper">
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => setProductDetailsOpen(!productDetailsOpen)}>
                <span>Product Details</span>
                {productDetailsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {productDetailsOpen && (
                  <motion.div 
                    className="accordion-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <ul className="details-list">
                      <li>Embellishment: <strong>{productSpecs.embellishment}</strong></li>
                      <li>Heel Type: <strong>{productSpecs.heelType}</strong></li>
                      <li>Heel Height: <strong>{productSpecs.heelHeight}</strong></li>
                      <li>Lining Material: <strong>{productSpecs.liningMaterial}</strong></li>
                      <li>Shoe Sole: <strong>{productSpecs.shoeSole}</strong></li>
                      <li>Upper Material: <strong>{productSpecs.upperMaterial}</strong></li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/* 5% OFF BANK TRANSFER AUTO POP-UP MODAL     */}
      {/* ========================================== */}
      <AnimatePresence>
        {showBankOfferModal && (
          <div className="bank-offer-modal-overlay" onClick={() => setShowBankOfferModal(false)}>
            <motion.div 
              className="bank-offer-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="bank-offer-close-btn" onClick={() => setShowBankOfferModal(false)}>
                <X size={20} />
              </button>

              <div className="bank-offer-icon-box">
                <CreditCard size={32} />
              </div>

              <span className="bank-offer-badge">Limited Time Savings</span>
              <h3>Get 5% OFF on Bank Transfer!</h3>
              <p>
                Enjoy an instant <strong>5% extra discount</strong> automatically applied when you choose direct Bank Transfer at checkout.
              </p>

              <button 
                className="bank-offer-cta-btn" 
                onClick={() => setShowBankOfferModal(false)}
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <div className="pdp-modal-overlay" onClick={() => setShowSizeChart(false)}>
            <motion.div 
              className="pdp-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button className="pdp-modal-close" onClick={() => setShowSizeChart(false)}>
                <X size={20} />
              </button>
              <h2>Footwear Size Chart (EU)</h2>
              <p>Find your perfect fit using standard European shoe measurements.</p>
              <table className="size-chart-table">
                <thead>
                  <tr>
                    <th>EU Size</th>
                    <th>US Women</th>
                    <th>US Men</th>
                    <th>Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>36</td><td>5.5</td><td>4.5</td><td>22.5 cm</td></tr>
                  <tr><td>37</td><td>6.5</td><td>5.5</td><td>23.2 cm</td></tr>
                  <tr><td>39</td><td>8.0</td><td>7.0</td><td>24.5 cm</td></tr>
                  <tr><td>40</td><td>8.5</td><td>7.5</td><td>25.1 cm</td></tr>
                  <tr><td>41</td><td>9.5</td><td>8.5</td><td>25.8 cm</td></tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}