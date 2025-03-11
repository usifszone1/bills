
import React from 'react';
import { PharmacyInfo } from '@/types';

interface PharmacyHeaderProps {
  pharmacyInfo: PharmacyInfo;
}

const PharmacyHeader: React.FC<PharmacyHeaderProps> = ({ pharmacyInfo }) => {
  return (
    <div className="animate-fade-in pb-4 mb-4 border-b border-pharmacy-navy/10">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-3">
          <img 
            src={pharmacyInfo.logo} 
            alt={pharmacyInfo.name} 
            className="h-16 md:h-24 object-contain max-w-[80%]"
          />
        </div>
        
        <h1 className="text-pharmacy-navy text-xl md:text-2xl font-bold rtl mb-1">
          {pharmacyInfo.name}
        </h1>
        
        <p className="text-pharmacy-darkGray/80 text-sm rtl mb-1">
          {pharmacyInfo.address}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 text-xs text-pharmacy-darkGray/70">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {pharmacyInfo.phone}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12" y2="18" />
            </svg>
            {pharmacyInfo.landline}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {pharmacyInfo.website}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHeader;
