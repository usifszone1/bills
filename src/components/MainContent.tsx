
import React from 'react';
import { ReceiptData } from '@/types';
import Receipt from './Receipt';

interface MainContentProps {
  selectedReceipt: ReceiptData | null;
  handleReset: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedReceipt, handleReset }) => {
  return (
    <div className="lg:col-span-2">
      {selectedReceipt ? (
        <div>
          <Receipt data={selectedReceipt} />
          
          <div className="mt-6 text-center no-print">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-pharmacy-navy/20 text-sm font-medium rounded-md text-pharmacy-navy hover:bg-pharmacy-navy/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-navy/50 transition-colors"
            >
              Back to All Receipts
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[400px] bg-white rounded-lg p-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-pharmacy-navy mb-4">No Receipt Selected</h2>
            <p className="text-pharmacy-darkGray mb-6">
              {selectedReceipt === null ? 'Select a receipt from the sidebar to view it' : 'Upload pharmacy PDF receipts to get started'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
