
import React from 'react';
import { ReceiptData } from '@/types';
import PharmacyHeader from './PharmacyHeader';
import MedicationTable from './MedicationTable';
import SummaryBox from './SummaryBox';
import { Printer } from 'lucide-react';

interface ReceiptComponentProps {
  data: ReceiptData;
}

const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return date;
  }
};

// Separate functional component for displaying customer information
const CustomerInfo = ({ label, value }: { label: string, value: string | number | undefined }) => (
  <div className="text-right mb-1">
    <span className="font-medium rtl">{label}: </span>
    <span className="font-medium rtl">{value || 'غير متوفر'}</span>
  </div>
);

const Receipt: React.FC<ReceiptComponentProps> = ({ data }) => {
  const { customer, summary, medications, pharmacy, sequenceNumber } = data;

  return (
    <div className="w-full max-w-3xl mx-auto receipt-paper p-6 rounded-lg animate-fade-in mb-8 print:mb-0">
      {/* Pharmacy Header */}
      <PharmacyHeader pharmacyInfo={pharmacy} />
      
      {/* Invoice ID */}
      <div className="mb-2 text-xs text-pharmacy-darkGray/70 flex justify-between">
        <span>Invoice Number: {sequenceNumber || 'N/A'}</span>
        <span>Print Date: {new Date().toLocaleDateString()}</span>
      </div>
      
      {/* Only showing company name and hiding other patient data */}
      <div className="mb-6 p-4 bg-pharmacy-lightBlue/30 rounded-md animate-scale-in">
        <h2 className="text-pharmacy-navy font-medium mb-2 text-center">تعـاقدات</h2>
        <h3 className="text-pharmacy-navy/80 font-medium mb-3 text-center text-sm">شركة الأهلي للخدمات الطبية</h3>
      </div>
      
      {/* Medications */}
      <div className="mb-6">
        <h2 className="text-pharmacy-navy font-medium mb-3 text-center">Medications</h2>
        <MedicationTable medications={medications} coveragePercentage={summary.coveragePercentage} />
      </div>
      
      {/* Summary */}
      <SummaryBox summary={summary} />
      
      {/* Receipt Footer */}
      <div className="mt-8 text-center text-xs text-pharmacy-darkGray/50 animate-fade-in">
        <p>شكراً لزيارتكم صيدلية الزهور</p>
      </div>
      
      {/* Print Button - Visible only on screen, not in print */}
      <div className="mt-6 text-center no-print animate-fade-in">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pharmacy-coral hover:bg-pharmacy-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-coral/50 transition-colors"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;
