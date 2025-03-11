
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

interface SocialLinksProps {
  darkMode: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ darkMode }) => {
  return (
    <div className="flex items-center gap-2">
      <a href="#" className={`transition-all duration-300 transform hover:scale-125 ${
        darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
      }`}>
        <Facebook size={24} />
      </a>
      <a href="#" className={`transition-all duration-300 transform hover:scale-125 ${
        darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-400'
      }`}>
        <Twitter size={24} />
      </a>
      <a href="#" className={`transition-all duration-300 transform hover:scale-125 ${
        darkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-600'
      }`}>
        <Instagram size={24} />
      </a>
    </div>
  );
};

export default SocialLinks;
