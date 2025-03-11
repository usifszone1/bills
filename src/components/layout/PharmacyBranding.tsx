
import React from 'react';
import { Heart } from 'lucide-react';

interface PharmacyBrandingProps {
  darkMode: boolean;
}

const PharmacyBranding: React.FC<PharmacyBrandingProps> = ({ darkMode }) => {
  return (
    <div className="flex items-center group">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-900 to-red-500 flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
        <Heart className="text-white transform transition-transform duration-500 group-hover:scale-110" size={32} fill="white" />
      </div>
      <div className="mr-4" style={{ direction: 'rtl' }}>
        <h1 className="text-3xl font-bold transform transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-red-500">صيدلية الزهور</h1>
        <p className={`text-lg mt-1 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>شريكك الصحي الموثوق به</p>
      </div>
    </div>
  );
};

export default PharmacyBranding;
