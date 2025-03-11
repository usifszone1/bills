
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
        darkMode 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 hover:shadow-lg hover:shadow-yellow-500/20' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500/20'
      }`}
    >
      {darkMode ? 
        <Sun size={24} className="animate-spin-slow" /> : 
        <Moon size={24} className="animate-pulse" />
      }
    </button>
  );
};

export default ThemeToggle;
