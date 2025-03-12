
import React from 'react';
import { Search, X } from 'lucide-react';

interface SidebarSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pharmacy-darkGray/50" size={16} />
      <input
        type="text"
        placeholder="Search by name or invoice number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-pharmacy-navy/20 py-2 pl-9 pr-3 text-sm focus:border-pharmacy-navy focus:outline-none focus:ring-1 focus:ring-pharmacy-navy"
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pharmacy-darkGray/50 hover:text-pharmacy-navy"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SidebarSearch;
