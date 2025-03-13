
import React from 'react';
import { ReceiptSummary } from '@/types';

interface SummaryBoxProps {
  summary: ReceiptSummary;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({ summary }) => {
  return (
    <div className="mt-6 p-4 border border-pharmacy-navy/10 rounded-md bg-pharmacy-lightGray/50 animate-scale-in">
      <h3 className="text-pharmacy-navy font-semibold mb-3 text-center">ملخص الفاتورة</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-pharmacy-darkGray/80">Gross Amount:</span>
          <span className="font-medium">{summary.subtotal.toFixed(2)}</span>
        </div>
        
        {summary.coveragePercentage > 0 && (
          <div className="flex justify-between">
            <span className="text-pharmacy-darkGray/80">Insurance Coverage ({summary.coveragePercentage}%):</span>
            <span className="font-medium text-pharmacy-coral">- {summary.coverageAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-pharmacy-navy/10 pt-2 mt-2"></div>
        
        <div className="flex justify-between font-bold">
          <span className="text-pharmacy-navy">Patient Payment ({100 - summary.coveragePercentage}%):</span>
          <span className="text-pharmacy-navy">{summary.finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
