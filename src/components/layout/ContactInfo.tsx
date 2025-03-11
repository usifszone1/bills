
import React from 'react';
import { Phone } from 'lucide-react';

interface ContactInfoProps {
  darkMode: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ darkMode }) => {
  return (
    <div className={`flex items-center gap-2 transform transition-all duration-300 hover:scale-105 ${
      darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
    }`}>
      <Phone size={20} className="animate-bounce" />
      <span dir="ltr" className="text-lg">+20 123 456 789</span>
    </div>
  );
};

export default ContactInfo;
