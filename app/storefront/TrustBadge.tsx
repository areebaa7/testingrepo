/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { CreditCard, ShieldCheck, RotateCcw, Package, MessageSquareText, Truck } from 'lucide-react';
import './TrustBadge.css';

export default function TrustBadge() {
  const trustItems = [
    { icon: <CreditCard size={20} className="trust-badge-icon" />, text: "5% Discount on Bank Transfer" },
    { icon: <ShieldCheck size={20} className="trust-badge-icon" />, text: "Check Before Payment" },
    { icon: <RotateCcw size={20} className="trust-badge-icon" />, text: "7 Days Easy Return" },
    { icon: <Package size={20} className="trust-badge-icon" />, text: "Free delivery prepaid" },
    { icon: <MessageSquareText size={20} className="trust-badge-icon" />, text: "Best Chat support" },
    { icon: <Truck size={20} className="trust-badge-icon" />, text: "Nationwide Fast Shipping" }
  ];

  // Tripled array to ensure seamless infinite looping without gaps
  const loopingTrustItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="trust-badge-wrapper">
      <div className="trust-badge-container">
        <div className="trust-badge-track">
          {loopingTrustItems.map((item, idx) => (
            <div key={idx} className="trust-badge-item">
              <span className="trust-badge-icon-wrap">
                {item.icon}
              </span>
              <span className="trust-badge-text">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}