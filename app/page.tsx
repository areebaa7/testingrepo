/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Navbar from './storefront/Navbar';
import SplashScreen from './storefront/SplashScreen';
import Hero from './storefront/Hero';
import TrustBenefits from './storefront/TrustBenefits';
import TrustBadge from './storefront/TrustBadge';
import KidsBanner from './storefront/KidsBanner';
import NewArrivals from './storefront/NewArrivals';
import WomenFavorites from './storefront/WomenFavorites';
import ForHerForHim from './storefront/ForHerForHim';
import BestSellers from './storefront/BestSellers';
import DiscoverMore from './storefront/DiscoverMore';
import CustomerReviews from './storefront/CustomerReviews';
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

// Dynamic Sale Banner Component
function DynamicSaleBanner({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const fetchedProducts = json.data;
          const pinned1 = fetchedProducts.find((p: any) => p.title && p.title.toLowerCase().includes('flowerly pink'));
          const pinned2 = fetchedProducts.find((p: any) => p.title && p.title.toLowerCase().includes('rivera interlaced'));
          
          const remaining = fetchedProducts.filter((p: any) => p.id !== pinned1?.id && p.id !== pinned2?.id);
          
          const finalList = [
            ...(pinned1 ? [pinned1] : []),
            ...(pinned2 ? [pinned2] : []),
            ...remaining
          ].slice(0, 3);
          
          setProducts(finalList);
        }
      } catch (err) {
        console.error('Failed to load products for banner:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const displayProducts = products.length > 0 ? products : [
    {
      id: 'fallback-1',
      name: 'Flowerly Pink',
      category: 'WOMEN',
      price: '1399',
      salePrice: '1399',
      image: '/product/shoe-7.jpeg',
      badge: 'NEW',
      description: 'Inspired by the fleeting beauty of a tropical spring, our designers crafted this...'
    },
    {
      id: 'fallback-2',
      name: 'Midnight Shimmer Woven Flat',
      category: 'FLATS CASUAL WOMEN',
      price: '923',
      salePrice: '923',
      image: '/product/sneaker-4.jpeg',
      badge: 'SALE',
      description: 'Elevate your everyday stride with the Midnight Shimmer Flat Sandals....'
    }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-white text-black overflow-hidden my-4 shadow-sm">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-purple-700 text-xs tracking-[0.25em] uppercase font-semibold block mb-2">
            Exclusive Collection
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-black tracking-wide">
            Flash Sale & New Arrivals
          </h2>
          <div className="w-16 h-0.5 bg-purple-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProducts.map((item, index) => {
              const productName = item.name || item.title || item.productName || 'Featured Footwear';
              
              let productCategory = item.category || item.tag || 'FOOTWEAR';
              if (index === 1 || (typeof productCategory === 'string' && productCategory.toUpperCase().includes('SNEAKER'))) {
                productCategory = 'FLATS CASUAL WOMEN';
              }

              const productDesc = item.description && item.description !== 'none' ? item.description : 'Designed for the modern individual seeking comfort and luxury.';
              
              let rawImage = item.image || item.imageUrl || '/logo_main.png';
              if (typeof rawImage === 'string') {
                rawImage = rawImage.replace(/\\/g, '/');
                if (rawImage.includes('placeholder') || rawImage.trim() === '') {
                  rawImage = '/logo_main.png';
                } else if (!rawImage.startsWith('http') && !rawImage.startsWith('/')) {
                  rawImage = '/' + rawImage;
                }
              }
              const productImage = rawImage;
              
              const formatPrice = (val: any) => Number(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const displayPrice = item.salePrice ? item.salePrice : item.price;

              return (
                <motion.div 
                  key={item.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className={`group flex flex-col bg-white p-4 rounded-none border border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 relative cursor-pointer text-black h-fit ${item.stock <= 0 || item.inStock === false ? 'opacity-80' : ''}`}
                  onClick={() => setCurrentPage('shop')}
                >
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    {(item.stock <= 0 || item.inStock === false) && (
                      <span className="bg-white text-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        SOLD OUT
                      </span>
                    )}
                    {item.badge && !(item.stock <= 0 || item.inStock === false) && (
                      <span className="bg-black text-white text-[10px] tracking-widest px-2.5 py-1 uppercase rounded-none shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative w-full h-56 mb-3 overflow-hidden rounded-none bg-[#FAF8FC] flex items-center justify-center p-2">
                    <img 
                      src={productImage} 
                      alt={productName} 
                      className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500 rounded-none"
                      onError={(e) => {
                        e.currentTarget.src = '/logo_main.png';
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="text-[10px] tracking-widest text-purple-700 uppercase font-semibold mb-0.5">
                      {productCategory}
                    </p>

                    <h3 className="text-sm font-bold text-black group-hover:text-purple-900 transition-colors mb-1 line-clamp-1">
                      {productName}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[32px]">
                      {productDesc}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-purple-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-900">Rs. {formatPrice(displayPrice)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative rounded-none overflow-hidden bg-black text-white flex flex-col justify-end p-10 min-h-[500px] shadow-2xl group border border-purple-900/30"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/sale_banner_clean.png" 
                alt="Flash Sale" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 filter saturate-[0.9] contrast-105"
                onError={(e) => {
                  e.currentTarget.src = '/logo_main.png'; 
                }}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-purple-300 text-xs tracking-widest uppercase font-semibold mb-3">
                <Zap size={16} className="text-purple-400 animate-pulse fill-purple-400" />
                <span>Limited Time Offer</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-wide text-white mb-6 leading-[1.15]">
                Flash Sale<br />Event
              </h2>
              <button 
                onClick={() => setCurrentPage('shop')}
                style={{ backgroundColor: '#c084fc' }}
                className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-widest hover:bg-[#a855f7] transition-all duration-300 shadow-xl"
              >
                <span>Shop Now</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  
  const { items: cartItems, addItem, removeItem, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup'>('login');

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

            {/* 1. New Arrivals Section */}
            <div id="new-arrivals-section">
              <NewArrivals setCurrentPage={setCurrentPage} />
            </div>

            {/* 2. Kids Collection Section Banner */}
            <KidsBanner setCurrentPage={setCurrentPage} />
            
            {/* 3. Women's Favorites Carousel Section */}
            <WomenFavorites setCurrentPage={setCurrentPage} />

            <DynamicSaleBanner setCurrentPage={setCurrentPage} />

            <DiscoverMore setCurrentPage={setCurrentPage} />
            <AffiliateSection setCurrentPage={setCurrentPage} />
            <CustomerReviews />
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