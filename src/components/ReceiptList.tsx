
import React from 'react';
import { ReceiptData } from '@/types';
import ReceiptListItem from './ReceiptListItem';

interface ReceiptListProps {
  filteredReceipts: ReceiptData[];
  selectedReceipt: ReceiptData | null;
  onSelectReceipt: (receipt: ReceiptData) => void;
  onDeleteReceipt: (sequenceNumber: number) => void;
}

const ReceiptList: React.FC<ReceiptListProps> = ({ 
  filteredReceipts, 
  selectedReceipt, 
  onSelectReceipt, 
  onDeleteReceipt 
}) => {
  return (
    <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
      {filteredReceipts.length > 0 ? (
        filteredReceipts.map((receipt) => (
          <ReceiptListItem
            key={receipt.sequenceNumber}
            receipt={receipt}
            selectedReceipt={selectedReceipt}
            onSelect={onSelectReceipt}
            onDelete={onDeleteReceipt}
          />
        ))
      ) : (
        <div className="text-center py-6 text-pharmacy-darkGray/70">
          No matching receipts found
        </div>
      )}
    </div>
  );
};

export default ReceiptList;
