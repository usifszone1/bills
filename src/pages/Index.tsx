
import React, { useState } from 'react';
import { ReceiptData } from '@/types';
import PDFUploader from '@/components/PDFUploader';
import Receipt from '@/components/Receipt';
import { PHARMACY_INFO } from '@/utils/dataExtractor';

const Index = () => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  
  // Sample receipt data for demonstration
  const sampleData: ReceiptData = {
    customer: {
      name: 'أحمد محمد',
      id: '29703457812345',
      date: '2023-09-15'
    },
    medications: [
      {
        name: 'باراسيتامول',
        quantity: 2,
        unit: 'علبة',
        price: 15.50,
        total: 31.00
      },
      {
        name: 'أموكسيسيلين',
        quantity: 1,
        unit: 'علبة',
        price: 45.75,
        total: 45.75
      },
      {
        name: 'فيتامين سي',
        quantity: 3,
        unit: 'علبة',
        price: 20.00,
        total: 60.00
      }
    ],
    summary: {
      subtotal: 136.75,
      coveragePercentage: 80,
      coverageAmount: 109.40,
      finalTotal: 27.35
    },
    pharmacy: PHARMACY_INFO
  };

  const handleDataExtracted = (data: ReceiptData) => {
    setReceiptData(data);
  };

  const handleReset = () => {
    setReceiptData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pharmacy-lightGray/30 pharmacy-container">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-10 text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-pharmacy-navy mb-2">Pharmacy Receipt System</h1>
          <p className="text-lg text-pharmacy-darkGray/70 max-w-2xl">
            Upload a prescription PDF to automatically generate a pharmacy receipt
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!receiptData ? (
            <div className="animate-slide-up">
              <PDFUploader onDataExtracted={handleDataExtracted} />
              
              <div className="mt-8 p-4 border border-pharmacy-navy/10 rounded-md bg-white">
                <h3 className="text-pharmacy-navy font-medium mb-3 text-center">
                  No PDF uploaded yet
                </h3>
                <p className="text-center text-pharmacy-darkGray/70 mb-4">
                  Upload a PDF or view a sample receipt
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setReceiptData(sampleData)}
                    className="inline-flex items-center px-4 py-2 border border-pharmacy-navy text-sm font-medium rounded-md text-pharmacy-navy hover:bg-pharmacy-navy/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-navy/50 transition-colors"
                  >
                    View Sample Receipt
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-scale-in">
              <Receipt data={receiptData} />
              
              <div className="mt-6 text-center no-print">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 border border-pharmacy-navy/20 text-sm font-medium rounded-md text-pharmacy-navy hover:bg-pharmacy-navy/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-navy/50 transition-colors"
                >
                  Upload Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
