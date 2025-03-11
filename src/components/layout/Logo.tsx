
import React from 'react';
import { Star } from 'lucide-react';

interface LogoProps {
  darkMode: boolean;
}

export const NiceDeerLogo: React.FC<LogoProps> = ({ darkMode }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <Star 
      size={32} 
      className={`transform transition-all duration-300 group-hover:scale-110 ${
        darkMode ? 'text-purple-400' : 'text-purple-600'
      }`}
    />
    <span className={`font-bold text-lg transition-colors duration-300 ${
      darkMode ? 'text-purple-400' : 'text-purple-600'
    }`}>
      NiceDeer
    </span>
  </div>
);
