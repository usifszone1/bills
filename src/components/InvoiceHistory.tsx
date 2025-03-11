
import React, { useState } from "react";
import { createMultipleSampleReceipts, Receipt as ReceiptType } from "../utils/sampleData";
import { Button } from "@/components/ui/button";
import { formatDate } from "../utils/pharmacyInfo";
import { ArrowRight, FileText, Search } from "lucide-react";

interface InvoiceHistoryProps {
  onSelectReceipt: (receipt: ReceiptType) => void;
  onSelectMultipleReceipts: (receipts: ReceiptType[]) => void;
}

const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({
  onSelectReceipt,
  onSelectMultipleReceipts,
}) => {
  // Generate sample receipts for the history
  const [receipts] = useState<ReceiptType[]>(
    createMultipleSampleReceipts(10).map((receipt, index) => ({
      ...receipt,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
    }))
  );
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  const filteredReceipts = receipts.filter(
    (receipt) =>
      receipt.invoiceNumber.includes(searchTerm) ||
      receipt.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReceiptSelect = (invoiceNumber: string) => {
    if (selectedReceipts.includes(invoiceNumber)) {
      setSelectedReceipts(selectedReceipts.filter(id => id !== invoiceNumber));
    } else {
      setSelectedReceipts([...selectedReceipts, invoiceNumber]);
    }
  };

  const handleViewReceipt = (receipt: ReceiptType) => {
    onSelectReceipt(receipt);
  };

  const handleViewSelected = () => {
    const selectedReceiptObjects = receipts.filter(receipt => 
      selectedReceipts.includes(receipt.invoiceNumber)
    );
    
    if (selectedReceiptObjects.length === 1) {
      onSelectReceipt(selectedReceiptObjects[0]);
    } else {
      onSelectMultipleReceipts(selectedReceiptObjects);
    }
  };

  const sortedReceipts = [...filteredReceipts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 bg-pharmacy-navy text-white">
          <h2 className="text-xl font-semibold">Invoice History</h2>
          <p className="text-sm opacity-80">View and manage your previous invoices</p>
        </div>
        
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pharmacy-navy focus:border-pharmacy-navy transition-all duration-200"
              placeholder="Search by invoice number or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {selectedReceipts.length > 0 && (
          <div className="p-4 bg-pharmacy-lightBlue border-b border-gray-100 flex justify-between items-center">
            <div>
              <span className="text-pharmacy-navy font-medium">{selectedReceipts.length} invoice(s) selected</span>
            </div>
            <Button 
              onClick={handleViewSelected}
              className="bg-pharmacy-navy hover:bg-pharmacy-navy/90"
              size="sm"
            >
              View Selected
            </Button>
          </div>
        )}
        
        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {sortedReceipts.length > 0 ? (
            sortedReceipts.map((receipt) => (
              <div 
                key={receipt.invoiceNumber}
                className={`p-4 flex items-center hover:bg-gray-50 transition-colors duration-200 ${
                  selectedReceipts.includes(receipt.invoiceNumber) ? "bg-blue-50" : ""
                }`}
              >
                <div className="mr-4">
                  <input
                    type="checkbox"
                    checked={selectedReceipts.includes(receipt.invoiceNumber)}
                    onChange={() => handleReceiptSelect(receipt.invoiceNumber)}
                    className="h-4 w-4 text-pharmacy-navy rounded border-gray-300 focus:ring-pharmacy-navy transition-colors duration-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="font-medium text-gray-800">Invoice #{receipt.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">{receipt.customer.name}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                      <p className="text-sm font-medium">{formatDate(new Date(receipt.date))}</p>
                      <p className="text-sm text-gray-500">{receipt.medications.length} items</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-4 text-pharmacy-navy hover:text-pharmacy-navy hover:bg-pharmacy-lightBlue"
                  onClick={() => handleViewReceipt(receipt)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">View</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">No invoices found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;
