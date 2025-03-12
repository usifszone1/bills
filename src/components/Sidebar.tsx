
import React from 'react';
import { Trash2 } from 'lucide-react';
import { ReceiptData } from '@/types';
import SidebarSearch from './SidebarSearch';
import ReceiptList from './ReceiptList';
import PDFUploader from './PDFUploader';

interface SidebarProps {
  receipts: ReceiptData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedReceipt: ReceiptData | null;
  setSelectedReceipt: (receipt: ReceiptData | null) => void;
  handleDeleteReceipt: (sequenceNumber: number) => void;
  handleClearAllReceipts: () => void;
  handleDataExtracted: (newReceipts: ReceiptData[]) => void;
  createSampleData: () => ReceiptData;
  filteredReceipts: ReceiptData[];
  setReceipts: React.Dispatch<React.SetStateAction<ReceiptData[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  receipts,
  searchTerm,
  setSearchTerm,
  selectedReceipt,
  setSelectedReceipt,
  handleDeleteReceipt,
  handleClearAllReceipts,
  handleDataExtracted,
  createSampleData,
  filteredReceipts,
  setReceipts
}) => {
  return (
    <div className="lg:col-span-1">
      {receipts.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-pharmacy-navy">Recent Invoices</h2>
            <button 
              onClick={handleClearAllReceipts}
              className="text-pharmacy-darkGray/70 hover:text-pharmacy-coral transition-colors"
              title="Clear all receipts"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <SidebarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <ReceiptList 
            filteredReceipts={filteredReceipts}
            selectedReceipt={selectedReceipt}
            onSelectReceipt={setSelectedReceipt}
            onDeleteReceipt={handleDeleteReceipt}
          />
        </div>
      ) : (
        <PDFUploader onDataExtracted={handleDataExtracted} />
      )}
      
      {receipts.length > 0 && (
        <div className="mt-4">
          <PDFUploader onDataExtracted={handleDataExtracted} />
        </div>
      )}
      
      {receipts.length === 0 && (
        <div className="mt-8 p-4 border border-pharmacy-navy/10 rounded-md bg-white">
          <h3 className="text-pharmacy-navy font-medium mb-3 text-center">
            No receipts yet
          </h3>
          <p className="text-center text-pharmacy-darkGray/70 mb-4">
            Upload a PDF or view a sample receipt
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                const sampleWithId = createSampleData();
                setReceipts([sampleWithId]);
                setSelectedReceipt(sampleWithId);
              }}
              className="inline-flex items-center px-4 py-2 border border-pharmacy-navy text-sm font-medium rounded-md text-pharmacy-navy hover:bg-pharmacy-navy/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-navy/50 transition-colors"
            >
              View Sample Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
