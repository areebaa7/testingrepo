/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar({ 
  setCurrentPage, 
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onOpenAuthModal,
  onOpenSearch 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (page, sectionId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);

    if (sectionId) {
      // Increased timeout slightly to ensure DOM renders the home page elements first if coming from another page
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    }
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (onOpenSearch) onOpenSearch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Announcement Bar */}
      <div className="promo-ticker-strip">
        <div className="ticker-track">
          <span>Nationwide Fast Delivery &bull; 5% OFF on Bank Transfer</span>
          <span>Nationwide Fast Delivery &bull; 5% OFF on Bank Transfer</span>
          <span>Nationwide Fast Delivery &bull; 5% OFF on Bank Transfer</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          
          {/* LEFT: Logo & Mobile Toggle */}
          <div className="nav-left">
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="nav-brand" onClick={() => handleNavClick('home')}>
              <img src="/assets/step&styl-newlogo.png" alt="Step & Styl Logo" className="brand-logo-img" />
              <span className="brand-name">Step & Styl</span>
            </div> 
          </div>

          {/* CENTER: Navigation Links */}
          <div className="nav-center desktop-nav">
            <button onClick={() => handleNavClick('women')} className="nav-link-btn">Women</button>
            <button onClick={() => handleNavClick('men')} className="nav-link-btn">Men</button>
            <button onClick={() => handleNavClick('kids')} className="nav-link-btn">Kids</button>
            <button onClick={() => handleNavClick('home', 'new-arrivals-section')} className="nav-link-btn">New Arrivals</button>
            <button onClick={() => handleNavClick('home', 'flash-sale-section')} className="sale-link">Sale</button>
          </div>

          {/* RIGHT: Search, Account, Wishlist, Cart Icons */}
          <div className="nav-right">
            <button className="icon-btn" aria-label="Search" onClick={handleSearchToggle} title="Search">
              <Search size={20} />
            </button>
            <button className="icon-btn desktop-only" aria-label="Account" onClick={() => onOpenAuthModal('login')} title="Account">
              <User size={20} />
            </button>
            <button className="icon-btn" aria-label="Wishlist" onClick={() => handleNavClick('wishlist')} title="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            
            {/* Added id="cart-icon" here for the fly-to-cart target tracking */}
            <button id="cart-icon" className="icon-btn cart-wrapper" aria-label="Cart" onClick={onOpenCart} title="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>

        </div>

        {/* Expandable Search Input Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="navbar-search-overlay"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '70px' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSearchSubmit} className="search-form-container">
                <Search size={18} className="search-input-icon" />
                <input 
                  type="text" 
                  placeholder="Search for footwear, sneakers, collections..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="navbar-search-input"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="search-close-btn">
                  <X size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-menu-drawer"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Top Drawer Header with Close Button */}
              <div className="mobile-drawer-header">
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="mobile-close-icon-btn"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="mobile-drawer-links">
                <button onClick={() => handleNavClick('home', 'new-arrivals-section')} className="mobile-drawer-row">
                  <span>New Arrivals</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button onClick={() => handleNavClick('men')} className="mobile-drawer-row">
                  <span>Men</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>

                <button onClick={() => handleNavClick('women')} className="mobile-drawer-row">
                  <span>Women</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>

                <button onClick={() => handleNavClick('kids')} className="mobile-drawer-row">
                  <span>Kids</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>

                {/* Sale link jumping directly to flash-sale-section */}
                <button onClick={() => handleNavClick('home', 'flash-sale-section')} className="mobile-drawer-row sale-row">
                  <span>Sale</span>
                  <ChevronRight size={18} className="text-red-400" />
                </button>

                {/* Added Affiliate Option */}
                <button onClick={() => handleNavClick('affiliate')} className="mobile-drawer-row">
                  <span>Affiliate Program</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Bottom Footer Login Link */}
              <div className="mobile-drawer-footer">
                <button 
                  onClick={() => { onOpenAuthModal('login'); setMobileMenuOpen(false); }} 
                  className="mobile-drawer-login-btn"
                >
                  <User size={18} />
                  <span>Login</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}