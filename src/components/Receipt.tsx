
import React from 'react';
import { ReceiptData } from '@/types';
import PharmacyHeader from './PharmacyHeader';
import MedicationTable from './MedicationTable';
import SummaryBox from './SummaryBox';
import { Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

const Receipt: React.FC<ReceiptComponentProps> = ({ data }) => {
  const { customer, summary, medications, pharmacy, sequenceNumber } = data;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print receipt');
      return;
    }

    const content = document.querySelector('.receipt-paper');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Pharmacy Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            table, th, td { border: 1px solid #ddd; }
            th, td { padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #777; }
            .summary { border: 1px solid #ddd; padding: 15px; margin-top: 20px; }
          </style>
        </head>
        <body>
          ${content?.innerHTML || ''}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for images and resources to load
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto receipt-paper p-6 rounded-lg animate-fade-in mb-8 print:mb-0">
      {/* Pharmacy Header */}
      <PharmacyHeader pharmacyInfo={pharmacy} />
      
      {/* Invoice ID and Date */}
      <div className="mb-2 text-xs text-pharmacy-darkGray/70 flex justify-between">
        <span>Invoice Number: {sequenceNumber || 'N/A'}</span>
        <span>Print Date: {new Date().toLocaleDateString()}</span>
      </div>
      
      {/* Company Information */}
      <div className="mb-6 p-4 bg-pharmacy-lightBlue/30 rounded-md animate-scale-in">
        <h2 className="text-pharmacy-navy font-medium mb-2 text-center">تعـاقدات</h2>
        <h3 className="text-pharmacy-navy/80 font-medium mb-3 text-center text-sm">شركة الأهلي للخدمات الطبية</h3>
        
        {/* Additional information from the PDF (highlighted in the image) */}
        <div className="flex flex-wrap justify-between text-sm mt-3 border-t pt-3 border-pharmacy-navy/10">
          <div className="w-full md:w-1/2 mb-2 md:mb-0">
            <p><span className="font-medium">Member ID:</span> {customer.id || 'N/A'}</p>
            <p><span className="font-medium">Patient Name:</span> {customer.name || 'N/A'}</p>
          </div>
          <div className="w-full md:w-1/2">
            <p><span className="font-medium">Transaction Date:</span> {customer.date ? formatDate(customer.date) : 'N/A'}</p>
            <p><span className="font-medium">Provider:</span> {pharmacy.name}</p>
          </div>
        </div>
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
        <Button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-pharmacy-coral hover:bg-pharmacy-coral/90"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Receipt
        </Button>
      </div>
    </div>
  );
};

export default Receipt;
