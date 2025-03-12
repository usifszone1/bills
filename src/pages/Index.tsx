
import React, { useState, useEffect } from 'react';
import { ReceiptData } from '@/types';
import { PHARMACY_INFO } from '@/utils/dataExtractor';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

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
        const parsedReceipts = JSON.parse(savedReceipts);
        // Update receipts with sequential numbers if they don't have them
        const updatedReceipts = parsedReceipts.map((receipt: ReceiptData, index: number) => ({
          ...receipt,
          sequenceNumber: index + 1
        }));
        setReceipts(updatedReceipts);
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
  const createSampleData = (): ReceiptData => {
    return {
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
      sequenceNumber: receipts.length + 1
    };
  };

  const handleDataExtracted = (newReceipts: ReceiptData[]) => {
    // Add sequential numbers to new receipts
    const updatedNewReceipts = newReceipts.map((receipt, index) => ({
      ...receipt,
      sequenceNumber: receipts.length + index + 1
    }));
    setReceipts(prev => [...updatedNewReceipts, ...prev]);
    if (updatedNewReceipts.length === 1) {
      setSelectedReceipt(updatedNewReceipts[0]);
    }
  };

  const handleReset = () => {
    setSelectedReceipt(null);
  };
  
  const handleDeleteReceipt = (sequenceNumber: number) => {
    setReceipts(prev => {
      const filtered = prev.filter(receipt => receipt.sequenceNumber !== sequenceNumber);
      // Reassign sequential numbers
      return filtered.map((receipt, index) => ({
        ...receipt,
        sequenceNumber: index + 1
      }));
    });
    if (selectedReceipt && selectedReceipt.sequenceNumber === sequenceNumber) {
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
    (receipt.sequenceNumber && receipt.sequenceNumber.toString().includes(searchTerm))
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
          <Sidebar
            receipts={receipts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedReceipt={selectedReceipt}
            setSelectedReceipt={setSelectedReceipt}
            handleDeleteReceipt={handleDeleteReceipt}
            handleClearAllReceipts={handleClearAllReceipts}
            handleDataExtracted={handleDataExtracted}
            createSampleData={createSampleData}
            filteredReceipts={filteredReceipts}
            setReceipts={setReceipts}
          />
          
          {/* Main Content */}
          <MainContent selectedReceipt={selectedReceipt} handleReset={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default Index;
