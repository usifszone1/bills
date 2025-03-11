
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  darkMode: boolean;
  isSearchFocused: boolean;
  setIsSearchFocused: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  darkMode, 
  isSearchFocused, 
  setIsSearchFocused 
}) => {
  return (
    <div className={`backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 ${
      darkMode 
        ? 'bg-gray-800/40 border-gray-700/50 shadow-lg shadow-purple-500/10' 
        : 'bg-white/40 border-white/50 shadow-lg shadow-purple-500/5'
    } ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
      <div className="relative">
        <Search className={`absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        } ${isSearchFocused ? 'scale-110 text-blue-500' : ''}`} size={24} />
        <input
          type="text"
          placeholder="البحث بالاسم أو الرقم التعريفي..."
          className={`w-full pr-16 pl-6 py-4 rounded-xl border text-xl transition-all duration-300 outline-none text-right ${
            darkMode 
              ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20' 
              : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
