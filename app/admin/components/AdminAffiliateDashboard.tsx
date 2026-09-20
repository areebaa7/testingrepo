'use client';

import { useState } from 'react';
import AffiliateApplicationsPanel from './AffiliateApplicationsPanel';

export default function AdminAffiliateDashboard() {
  const [activeSubTab, setActiveSubTab] = useState('applications');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Affiliate & Creator Program</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage creator applications, track commissions, and process withdrawals.
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'applications', label: 'Applications' },
            { id: 'creators', label: 'Creators & Promos' },
            { id: 'ledger', label: 'Commission Ledger' },
            { id: 'withdrawals', label: 'Withdrawal Requests' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeSubTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Areas */}
      <div className="pt-4">
        {activeSubTab === 'applications' && <AffiliateApplicationsPanel />}
        
        {activeSubTab === 'creators' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
            Creators & Promos management coming soon.
          </div>
        )}
        
        {activeSubTab === 'ledger' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
            Commission Ledger tracking coming soon.
          </div>
        )}
        
        {activeSubTab === 'withdrawals' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
            Withdrawal Requests management coming soon.
          </div>
        )}
      </div>
    </div>
  );
}
