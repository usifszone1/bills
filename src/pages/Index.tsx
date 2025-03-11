
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import useTimeFormatter from '@/hooks/useTimeFormatter';
import DashboardCards from '@/components/DashboardCards';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const { formatTime } = useTimeFormatter();

  useEffect(() => {
    // Check for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle search term updates
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        formatTime={formatTime} 
        currentTime={currentTime}
        onSearch={handleSearch}
      />
      
      <div className="container mx-auto px-4 py-8">
        <DashboardCards 
          darkMode={darkMode} 
          formatTime={formatTime} 
          currentTime={currentTime}
          searchTerm={searchTerm}
        />
        
        <div className={`text-center py-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <h1 className="text-4xl font-bold mb-4">مرحباً بكم في صيدلية الزهور</h1>
          <p className="text-xl">نظام إدارة المرضى وصفاتهم الطبية</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
