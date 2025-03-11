
import React, { useState, useRef, useCallback } from "react";
import Header from "../components/Header";
import { Receipt as ReceiptType, createSampleReceipt } from "../utils/sampleData";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import UploadView from "../components/views/UploadView";
import ReceiptView from "../components/views/ReceiptView";
import HistoryView from "../components/views/HistoryView";
import PrintReceiptCollection from "../components/PrintReceiptCollection";

const Index = () => {
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [view, setView] = useState<"upload" | "receipt" | "history">("upload");
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDataExtracted = (data: ReceiptType | ReceiptType[]) => {
    if (Array.isArray(data)) {
      setReceipts(data);
      setIsMultipleMode(true);
    } else {
      setReceipts([data]);
      setIsMultipleMode(false);
    }
    setView("receipt");
  };

  const handleUseSample = () => {
    const sampleReceipt = createSampleReceipt();
    setReceipts([sampleReceipt]);
    setIsMultipleMode(false);
    setView("receipt");
  };

  const handleReset = () => {
    setReceipts([]);
    setView("upload");
  };

  // Fix the useReactToPrint hook configuration by passing the ref directly
  const handlePrint = useReactToPrint({
    documentTitle: `Pharmacy_Receipt_${receipts[0]?.invoiceNumber || ""}`,
    onAfterPrint: () => {
      toast.success("Print job sent successfully!");
    },
    // Use contentRef instead of content function
    contentRef: printRef,
  });

  // Create a separate function to handle the print button click
  const handlePrintClick = useCallback(() => {
    if (handlePrint) {
      handlePrint();
    }
  }, [handlePrint]);

  const handleDownload = useCallback(() => {
    if (handlePrint) {
      handlePrint();
      toast.success("Receipt downloaded successfully!");
    }
  }, [handlePrint]);

  const handleSelectReceipt = (receipt: ReceiptType) => {
    setReceipts([receipt]);
    setIsMultipleMode(false);
    setView("receipt");
  };

  const handleSelectMultipleReceipts = (selectedReceipts: ReceiptType[]) => {
    setReceipts(selectedReceipts);
    setIsMultipleMode(true);
    setView("receipt");
  };

  const renderContent = () => {
    switch (view) {
      case "upload":
        return (
          <UploadView 
            onDataExtracted={handleDataExtracted}
            isMultipleMode={isMultipleMode}
            setIsMultipleMode={setIsMultipleMode}
            handleUseSample={handleUseSample}
          />
        );
      
      case "receipt":
        return (
          <ReceiptView 
            receipts={receipts}
            handlePrintClick={handlePrintClick}
            handleDownload={handleDownload}
            handleReset={handleReset}
            printRef={printRef}
          />
        );
      
      case "history":
        return (
          <HistoryView 
            onSelectReceipt={handleSelectReceipt}
            onSelectMultipleReceipts={handleSelectMultipleReceipts}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pharmacy-lightBlue/30">
      <Header
        onHomeClick={() => setView("upload")}
        onHistoryClick={() => setView("history")}
        onDownloadClick={handleDownload}
        showActions={view !== "upload"}
      />
      {renderContent()}

      {/* Hidden print-only container */}
      <div className="hidden print:block">
        <div ref={printRef}>
          <PrintReceiptCollection receipts={receipts} />
        </div>
      </div>
    </div>
  );
};

export default Index;
