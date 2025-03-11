
import React from 'react';

interface TimeDisplayProps {
  formatTime: (date: Date) => string;
  currentTime: Date;
  darkMode: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ formatTime, currentTime, darkMode }) => {
  return (
    <div className={`text-lg transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {formatTime(currentTime)}
    </div>
  );
};

export default TimeDisplay;
