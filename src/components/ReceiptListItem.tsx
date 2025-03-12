
import React from 'react';
import { X } from 'lucide-react';
import { ReceiptData } from '@/types';

interface ReceiptListItemProps {
  receipt: ReceiptData;
  selectedReceipt: ReceiptData | null;
  onSelect: (receipt: ReceiptData) => void;
  onDelete: (sequenceNumber: number) => void;
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ 
  receipt, 
  selectedReceipt, 
  onSelect, 
  onDelete 
}) => {
  return (
    <div 
      className={`p-3 rounded-md cursor-pointer hover:bg-pharmacy-lightBlue/20 transition-colors relative ${
        selectedReceipt?.sequenceNumber === receipt.sequenceNumber ? 'bg-pharmacy-lightBlue/30 border-l-4 border-pharmacy-navy' : 'bg-pharmacy-lightGray/20'
      }`}
      onClick={() => onSelect(receipt)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-pharmacy-navy">{receipt.customer.name}</h3>
          <p className="text-xs text-pharmacy-darkGray/70">
            {receipt.customer.date ? new Date(receipt.customer.date).toLocaleDateString() : 'No date'}
          </p>
          <p className="text-xs text-pharmacy-darkGray/70 mt-1">
            {receipt.sequenceNumber || 'No ID'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-pharmacy-coral">
            {receipt.summary.finalTotal.toFixed(2)}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(receipt.sequenceNumber || 0);
            }}
            className="ml-2 text-pharmacy-darkGray/50 hover:text-pharmacy-coral transition-colors"
            title="Delete receipt"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptListItem;
