/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { AnimatePresence } from 'framer-motion';
import Navbar from './storefront/Navbar';
import SplashScreen from './storefront/SplashScreen';
import Hero from './storefront/Hero';
import TrustBenefits from './storefront/TrustBenefits';
import TrustBadge from './storefront/TrustBadge';
import KidsBanner from './storefront/KidsBanner';
import NewArrivals from './storefront/NewArrivals';
import WomenFavorites from './storefront/WomenFavorites';
import ForHerForHim from './storefront/ForHerForHim';
import DynamicSaleBanner from './storefront/DynamicSaleBanner';
import MensCollectionBanner from './storefront/MensCollectionBanner';
import MensStylesCarousel from './storefront/MensStylesCarousel';
import WhyStepAndStyl from './storefront/WhyStepAndStyl';
import DiscoverMore from './storefront/DiscoverMore';
import CustomerReviews from './storefront/CustomerReviews';
import FollowUsSection from './storefront/FollowUsSection';
import AffiliateSection from './storefront/AffiliateSection';
import AffiliatePage from './storefront/AffiliatePage';
import ShopPage from './storefront/ShopPage';
import WomenShopPage from './storefront/WomenShopPage';
import MenShopPage from './storefront/MenShopPage';
import KidsShopPage from './storefront/KidsShopPage';
import CheckoutPage from './storefront/CheckoutPage'; 
import Footer from './storefront/Footer';
import CartDrawer from './storefront/CartDrawer';
import AuthModal from './storefront/AuthModal';
import WhatsAppButton from './components/WhatsAppButton'; 
import ShippingDeliveryPage from './storefront/ShippingDeliveryPage';
import ReturnsExchangesPage from './storefront/ReturnsExchangesPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  
  const { items: cartItems, addItem, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login');

  // Automatically reset scroll to top on every page view transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleOpenAuthModal = (tab: 'login' | 'signup' = 'login') => {
    setAuthInitialTab(tab);
    setAuthModalOpen(true);
  };

  const handleAddToCart = (productWithSpecs: any) => {
    addItem({
      id: productWithSpecs.id,
      title: productWithSpecs.title,
      price: productWithSpecs.price,
      image: productWithSpecs.image || productWithSpecs.images?.[0] || '',
      size: productWithSpecs.size || productWithSpecs.selectedSize || undefined,
      color: productWithSpecs.color || productWithSpecs.selectedColor || undefined
    }, productWithSpecs.quantity || 1);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const item = cartItems[index];
    if (item) {
      updateQuantity(item.id, newQty, item.size, item.color);
    }
  };

  const handleRemoveItem = (index: number) => {
    const item = cartItems[index];
    if (item) {
      removeItem(item.id, item.size, item.color);
    }
  };

  useEffect(() => {
    const splashSeen = sessionStorage.getItem('splashSeen');
    if (splashSeen) setShowSplash(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashSeen', 'true');
  };

  return (
    <div className="relative overflow-x-hidden font-sans">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <Navbar 
        setCurrentPage={setCurrentPage} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenSearch={() => {}}
      />

      <main className="flex flex-col">
        {currentPage === 'home' ? (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            
            <ForHerForHim setCurrentPage={setCurrentPage} />
            
            {/* Trust Badge Banner Strip */}
            <TrustBadge />

            {/* Trust Benefits Hero Carousel */}
            <TrustBenefits setCurrentPage={setCurrentPage} />

            {/* Affiliate Section placed right after the trust banners */}
            <AffiliateSection setCurrentPage={setCurrentPage} />

            {/* 1. New Arrivals Section */}
            <div id="new-arrivals-section">
              <NewArrivals setCurrentPage={setCurrentPage} />
            </div>

            {/* 2. Kids Collection Section Banner */}
            <KidsBanner setCurrentPage={setCurrentPage} />
            
            {/* 3. Women's Favorites Carousel Section */}
            <WomenFavorites setCurrentPage={setCurrentPage} />

            {/* 4. Flash Sale & Second Trust Carousel */}
            <DynamicSaleBanner setCurrentPage={setCurrentPage} />

            {/* 5. Men's Editorial Banner & Categories Carousel */}
            <MensCollectionBanner setCurrentPage={setCurrentPage} />
            <MensStylesCarousel setCurrentPage={setCurrentPage} />

            {/* 6. Why Step & Styl Black Compact Layout */}
            <WhyStepAndStyl />

            {/* 7. Customer Reviews & Discover More */}
            <CustomerReviews />
            <DiscoverMore setCurrentPage={setCurrentPage} />

            {/* 8. Follow Us on Socials / Instagram Section */}
            <FollowUsSection />
          </>
        ) : currentPage === 'shop' ? (
          <ShopPage setCurrentPage={setCurrentPage} onAddToCart={handleAddToCart} />
        ) : currentPage === 'women' ? (
          <WomenShopPage onAddToCart={handleAddToCart} />
        ) : currentPage === 'men' ? (
          <MenShopPage onAddToCart={handleAddToCart} />
        ) : currentPage === 'kids' ? (
          <KidsShopPage onAddToCart={handleAddToCart} />
        ) : currentPage === 'checkout' ? (
          <CheckoutPage 
            cartItems={cartItems} 
            setCurrentPage={setCurrentPage} 
            onOrderSuccess={() => {
              clearCart(); 
            }}
          />
        ) : currentPage === 'affiliate' ? (
          <AffiliatePage />
        ) : currentPage === 'shipping-delivery' ? (
          <ShippingDeliveryPage setCurrentPage={setCurrentPage} />
        ) : currentPage === 'returns-exchanges' ? (
          <ReturnsExchangesPage setCurrentPage={setCurrentPage} />
        ) : (
          <div className="dynamic-page-view px-6 py-20 text-center">
            <h1 className="text-3xl font-bold">{currentPage.toUpperCase()} COLLECTION</h1>
            <p className="mt-2 text-gray-600">Explore premium luxury items curated for {currentPage}.</p>
            <button className="mt-6 rounded-full bg-black px-6 py-2.5 text-white" onClick={() => setCurrentPage('home')}>
              Back to Home
            </button>
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        setCurrentPage={setCurrentPage}
      />

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
      />

      {/* WhatsApp button only renders when splash screen is done */}
      {!showSplash && <WhatsAppButton />}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}