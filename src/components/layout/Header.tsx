
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import SocialLinks from '@/components/SocialLinks';
import { NiceDeerLogo } from './Logo';
import TimeDisplay from './TimeDisplay';
import ThemeToggle from './ThemeToggle';
import ContactInfo from './ContactInfo';
import AuthButtons from './AuthButtons';
import PharmacyBranding from './PharmacyBranding';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  formatTime: (date: Date) => string;
  currentTime: Date;
  onSearch?: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, formatTime, currentTime, onSearch }) => {
  const { session } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className={`backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-500 ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-700/50 shadow-lg shadow-purple-500/10' 
        : 'bg-white/80 border-gray-200/50 shadow-lg shadow-purple-500/5'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="flex items-center gap-3">
            <PharmacyBranding darkMode={darkMode} />
          </div>

          {session && (
            <div className="relative w-full max-w-sm">
              <Input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`pl-10 py-2 ${
                  darkMode 
                    ? 'bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400' 
                    : 'bg-white/70 border-gray-200 text-gray-900 placeholder:text-gray-500'
                }`}
              />
              <Search 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} 
              />
            </div>
          )}

          <div className="flex items-center gap-8 flex-wrap justify-center">
            <ContactInfo darkMode={darkMode} />
            <TimeDisplay formatTime={formatTime} currentTime={currentTime} darkMode={darkMode} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

          <div className="flex items-center gap-4">
            <AuthButtons session={session} />
            <SocialLinks darkMode={darkMode} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
