/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import './TrustBadge.css';

export default function TrustBadge() {
  const trustItems = [
    { icon: <CreditCard size={20} className="text-purple-300 shrink-0" />, text: "5% Discount on Bank Transfer" },
    { icon: <ShieldCheck size={20} className="text-purple-300 shrink-0" />, text: "Check Before Payment" },
    { icon: <RefreshCw size={20} className="text-purple-300 shrink-0" />, text: "7 Days Easy Return" },
    { icon: <Truck size={20} className="text-purple-300 shrink-0" />, text: "Nationwide Fast Shipping" }
  ];

  // Tripled array to ensure seamless infinite looping without gaps
  const loopingTrustItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="trust-badge-section py-4 bg-purple-900 text-white overflow-hidden shadow-inner my-2">
      <div className="trust-badge-container">
        <div className="trust-badge-track">
          {loopingTrustItems.map((item, idx) => (
            <div key={idx} className="trust-badge-item flex items-center gap-3 shrink-0 px-6">
              {item.icon}
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-100 whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}