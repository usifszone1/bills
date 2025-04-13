
import React from 'react';
import { ReceiptData, Customer } from '@/types';
import PharmacyHeader from './PharmacyHeader';
import MedicationTable from './MedicationTable';
import SummaryBox from './SummaryBox';

interface ReceiptProps {
  data: ReceiptData;
}

const Receipt: React.FC<ReceiptProps> = ({ data }) => {
  return (
    <div className="w-full max-w-3xl mx-auto receipt-paper p-6 rounded-lg animate-fade-in">
      {/* Pharmacy Header */}
      <PharmacyHeader pharmacyInfo={data.pharmacy} />
      
      {/* Customer Information */}
      <div className="mb-6 p-4 bg-pharmacy-lightBlue/30 rounded-md animate-scale-in">
        <h2 className="text-pharmacy-navy font-medium mb-3 text-center">تعـاقدات</h2>
        <h3 className="text-pharmacy-navy/80 font-medium mb-3 text-center text-sm">شركة الأهلي للخدمات الطبية</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="text-right">
            <p className="text-sm text-pharmacy-darkGray/70">الاسم:</p>
            <p className="font-medium rtl">{data.customer.name}</p>
          </div>
          
          {data.summary.coveragePercentage > 0 && (
            <div className="text-right">
              <p className="text-sm text-pharmacy-darkGray/70">نسبة التغطية:</p>
              <p className="font-medium">{data.summary.coveragePercentage}%</p>
            </div>
          )}
          
          {data.customer.date && (
            <div className="text-right">
              <p className="text-sm text-pharmacy-darkGray/70">التاريخ:</p>
              <p className="font-medium">{data.customer.date}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Medications */}
      <div className="mb-6">
        <h2 className="text-pharmacy-navy font-medium mb-3 text-center">الأدوية</h2>
        <MedicationTable medications={data.medications} />
      </div>
      
      {/* Summary */}
      <SummaryBox summary={data.summary} />
      
      {/* Receipt Footer */}
      <div className="mt-8 text-center text-xs text-pharmacy-darkGray/50 animate-fade-in">
        <p>شكراً لزيارتكم صيدلية الزهور</p>
        <p className="mt-1">تاريخ الطباعة: {new Date().toLocaleDateString()}</p>
      </div>
      
      {/* Print Button - Visible only on screen, not in print */}
      <div className="mt-6 text-center no-print animate-fade-in">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pharmacy-coral hover:bg-pharmacy-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-coral/50 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
            />
          </svg>
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;
