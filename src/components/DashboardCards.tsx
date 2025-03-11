
import React, { useEffect, useState } from 'react';
import { Users, Heart, Clock } from 'lucide-react';
import { NiceDeerLogo } from './layout/Logo';
import { supabase } from '@/integrations/supabase/client';

interface DashboardCardsProps {
  darkMode: boolean;
  formatTime: (date: Date) => string;
  currentTime: Date;
  searchTerm?: string;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ darkMode, formatTime, currentTime, searchTerm }) => {
  const [patientCount, setPatientCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        let query = supabase.from('zohour').select('id', { count: 'exact' });
        
        // Apply search filter if provided
        if (searchTerm && searchTerm.trim() !== '') {
          query = query.or(
            `Name.ilike.%${searchTerm}%,Organization.ilike.%${searchTerm}%,"Card No".eq.${!isNaN(Number(searchTerm)) ? Number(searchTerm) : 0}`
          );
        }
        
        const { count, error } = await query;
        
        if (error) {
          console.error('Error fetching patient count:', error);
          return;
        }
        
        setPatientCount(count || 0);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [searchTerm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
      <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
        darkMode 
          ? 'bg-gray-800/40 border-gray-700/50 shadow-lg shadow-purple-500/10' 
          : 'bg-white/40 border-white/50 shadow-lg shadow-purple-500/5'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {searchTerm && searchTerm.trim() !== '' ? 'Search Results' : 'Total Patients'}
          </h3>
          <Users className="text-blue-500" size={24} />
        </div>
        <p className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {isLoading ? '...' : patientCount}
        </p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {searchTerm && searchTerm.trim() !== '' 
            ? `Patients matching: "${searchTerm}"` 
            : 'All patients in database'}
        </p>
      </div>

      <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
        darkMode 
          ? 'bg-gray-800/40 border-gray-700/50 shadow-lg shadow-purple-500/10' 
          : 'bg-white/40 border-white/50 shadow-lg shadow-purple-500/5'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Latest Updates</h3>
          <Heart className="text-red-500" size={24} fill="rgb(239 68 68)" />
        </div>
        <ul className="space-y-2">
          <li className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>New medications in stock</li>
          <li className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Updated service hours</li>
        </ul>
      </div>

      <div className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
        darkMode 
          ? 'bg-gray-800/40 border-gray-700/50 shadow-lg shadow-purple-500/10' 
          : 'bg-white/40 border-white/50 shadow-lg shadow-purple-500/5'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Current Time</h3>
          <Clock className="text-green-500" size={24} />
        </div>
        <p className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{formatTime(currentTime)}</p>
        <div className="mt-4">
          <NiceDeerLogo darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
