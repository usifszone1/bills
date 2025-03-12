
import React, { useState, useEffect } from 'react';
import { ReceiptData } from '@/types';
import PDFUploader from '@/components/PDFUploader';
import Receipt from '@/components/Receipt';
import { PHARMACY_INFO } from '@/utils/dataExtractor';
import { Search, ArrowUp, ArrowDown, X, Trash2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'pharmacy-receipts';

const Index = () => {
  const [receipts, setReceipts] = useState<ReceiptData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);
  
  // Load saved receipts from localStorage on component mount
  useEffect(() => {
    const savedReceipts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedReceipts) {
      try {
        setReceipts(JSON.parse(savedReceipts));
      } catch (e) {
        console.error('Failed to parse saved receipts:', e);
      }
    }
  }, []);
  
  // Save receipts to localStorage whenever they change
  useEffect(() => {
    if (receipts.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(receipts));
    }
  }, [receipts]);
  
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
    pharmacy: PHARMACY_INFO,
    invoiceId: `INV-SAMPLE-${Date.now()}`
  };

  const handleDataExtracted = (newReceipts: ReceiptData[]) => {
    setReceipts(prev => [...newReceipts, ...prev]);
    if (newReceipts.length === 1) {
      setSelectedReceipt(newReceipts[0]);
    }
  };

  const handleReset = () => {
    setSelectedReceipt(null);
  };
  
  const handleDeleteReceipt = (invoiceId: string) => {
    setReceipts(prev => prev.filter(receipt => receipt.invoiceId !== invoiceId));
    if (selectedReceipt && selectedReceipt.invoiceId === invoiceId) {
      setSelectedReceipt(null);
    }
  };
  
  const handleClearAllReceipts = () => {
    setReceipts([]);
    setSelectedReceipt(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };
  
  const filteredReceipts = receipts.filter(receipt => 
    receipt.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (receipt.invoiceId && receipt.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pharmacy-lightGray/30 pharmacy-container">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-8 text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-pharmacy-navy mb-2">Pharmacy Receipt System</h1>
          <p className="text-lg text-pharmacy-darkGray/70 max-w-2xl">
            Upload pharmacy prescription PDFs to automatically generate receipts
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
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
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pharmacy-darkGray/50" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name or invoice ID"
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
                
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredReceipts.length > 0 ? (
                    filteredReceipts.map((receipt) => (
                      <div 
                        key={receipt.invoiceId} 
                        className={`p-3 rounded-md cursor-pointer hover:bg-pharmacy-lightBlue/20 transition-colors relative ${
                          selectedReceipt?.invoiceId === receipt.invoiceId ? 'bg-pharmacy-lightBlue/30 border-l-4 border-pharmacy-navy' : 'bg-pharmacy-lightGray/20'
                        }`}
                        onClick={() => setSelectedReceipt(receipt)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-pharmacy-navy">{receipt.customer.name}</h3>
                            <p className="text-xs text-pharmacy-darkGray/70">
                              {receipt.customer.date ? new Date(receipt.customer.date).toLocaleDateString() : 'No date'}
                            </p>
                            <p className="text-xs text-pharmacy-darkGray/70 mt-1">
                              {receipt.invoiceId || 'No ID'}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-pharmacy-coral">
                              {receipt.summary.finalTotal.toFixed(2)}
                            </span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteReceipt(receipt.invoiceId || '');
                              }}
                              className="ml-2 text-pharmacy-darkGray/50 hover:text-pharmacy-coral transition-colors"
                              title="Delete receipt"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-pharmacy-darkGray/70">
                      No matching receipts found
                    </div>
                  )}
                </div>
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
                      const sampleWithId = {...sampleData, invoiceId: `INV-SAMPLE-${Date.now()}`};
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
          
          {/* Main Content */}
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
                    {receipts.length > 0 
                      ? 'Select a receipt from the sidebar to view it' 
                      : 'Upload pharmacy PDF receipts to get started'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
