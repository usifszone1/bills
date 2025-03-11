
import React from "react";
import Receipt from "../Receipt";
import { Receipt as ReceiptType } from "../../utils/sampleData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Download } from "lucide-react";

interface ReceiptViewProps {
  receipts: ReceiptType[];
  handlePrintClick: () => void;
  handleDownload: () => void;
  handleReset: () => void;
  printRef: React.RefObject<HTMLDivElement>;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({
  receipts,
  handlePrintClick,
  handleDownload,
  handleReset,
  printRef,
}) => {
  return (
    <div className="min-h-[60vh] py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between animate-fade-in no-print">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Upload Another
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrintClick}
              className="flex items-center gap-2 hover:text-pharmacy-navy hover:border-pharmacy-navy"
              size="sm"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-pharmacy-navy hover:bg-pharmacy-navy/90"
              size="sm"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        <div ref={printRef}>
          {receipts.map((receipt) => (
            <Receipt key={receipt.invoiceNumber} receipt={receipt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiptView;

