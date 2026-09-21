/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, CreditCard, Percent } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, setCurrentPage }) {
  // State for 5% Bank Transfer offer popup when proceeding to checkout
  const [showCheckoutBankModal, setShowCheckoutBankModal] = useState(false);

  // Calculate total price in PKR
  const subtotal = cartItems.reduce((acc, item) => {
    const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + cleanPrice * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    // Show the 5% bank transfer reminder popup before directing to checkout
    setShowCheckoutBankModal(true);
  };

  const handleConfirmCheckout = () => {
    setShowCheckoutBankModal(false);
    onClose();
    if (setCurrentPage) {
      setCurrentPage('checkout');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="cart-drawer-overlay" onClick={onClose}>
            <motion.div 
              className="cart-drawer-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              {/* Drawer Header */}
              <div className="cart-drawer-header">
                <div className="cart-title-wrap">
                  <ShoppingBag size={20} />
                  <h2>Your Shopping Cart ({cartItems.length})</h2>
                </div>
                <button className="cart-close-btn" onClick={onClose}>
                  <X size={22} />
                </button>
              </div>

              {/* Free Delivery Promo Banner */}
              <div className="cart-promo-banner">
                🎉 <strong>Free Delivery</strong> & Open Parcel Then Pay enabled on all orders!
              </div>

              {/* Cart Items List */}
              <div className="cart-items-list">
                {cartItems.length === 0 ? (
                  <div className="cart-empty-state">
                    <ShoppingBag size={48} strokeWidth={1.5} />
                    <p>Your cart is currently empty.</p>
                    <span>Explore our collections and step into style!</span>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="cart-item-card">
                      <img src={item.image} alt={item.title} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.title}</h4>
                        <p className="cart-item-specs">
                          Size: <strong>{item.selectedSize}</strong> | Color: 
                          <span className="cart-color-dot" style={{ backgroundColor: item.selectedColor }} />
                        </p>
                        <p className="cart-item-price">{item.price}</p>
                        
                        <div className="cart-item-controls">
                          <div className="cart-qty-box">
                            <button onClick={() => onUpdateQuantity(index, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>+</button>
                          </div>
                          <button className="cart-delete-btn" onClick={() => onRemoveItem(index)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="cart-drawer-footer">
                  <div className="cart-subtotal-row">
                    <span>Subtotal:</span>
                    <span className="cart-subtotal-price">{subtotal.toLocaleString()} PKR</span>
                  </div>
                  <p className="cart-tax-note">Shipping & taxes calculated at checkout.</p>
                  <button 
                    className="cart-checkout-btn"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5% Bank Transfer Popup Modal when entering checkout */}
      <AnimatePresence>
        {showCheckoutBankModal && (
          <div className="bank-offer-modal-overlay" onClick={() => setShowCheckoutBankModal(false)}>
            <motion.div 
              className="bank-offer-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="bank-offer-close-btn" onClick={() => setShowCheckoutBankModal(false)}>
                <X size={20} />
              </button>

              <div className="bank-offer-icon-box">
                <CreditCard size={32} />
              </div>

              <span className="bank-offer-badge">Special Checkout Offer</span>
              <h3>Get 5% OFF on Bank Transfer!</h3>
              <p>
                Choose <strong>Direct Bank Transfer</strong> on the checkout page to automatically receive an instant <strong>5% extra discount</strong> on your order total.
              </p>

              <button 
                className="bank-offer-cta-btn" 
                onClick={handleConfirmCheckout}
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}