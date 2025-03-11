
import React from "react";
import PDFUploader from "../PDFUploader";
import { Receipt as ReceiptType, createSampleReceipt } from "../../utils/sampleData";

interface UploadViewProps {
  onDataExtracted: (data: ReceiptType | ReceiptType[]) => void;
  isMultipleMode: boolean;
  setIsMultipleMode: (value: boolean) => void;
  handleUseSample: () => void;
}

const UploadView: React.FC<UploadViewProps> = ({
  onDataExtracted,
  isMultipleMode,
  setIsMultipleMode,
  handleUseSample,
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-pharmacy-lightBlue text-pharmacy-navy text-xs font-medium mb-3">Pharmacy Receipt System</span>
          <h1 className="text-3xl md:text-4xl font-bold text-pharmacy-navy mb-3">
            Prescription Upload & Receipt Generation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your prescription PDF to generate a detailed pharmacy receipt.
            Our system extracts all the necessary information automatically.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4 gap-4 animate-fade-in delay-100">
            <Button
              variant={!isMultipleMode ? "default" : "outline"}
              onClick={() => setIsMultipleMode(false)}
              className={!isMultipleMode ? "bg-pharmacy-navy hover:bg-pharmacy-navy/90" : "hover:text-pharmacy-navy hover:border-pharmacy-navy"}
            >
              Single Receipt
            </Button>
            <Button
              variant={isMultipleMode ? "default" : "outline"}
              onClick={() => setIsMultipleMode(true)}
              className={isMultipleMode ? "bg-pharmacy-navy hover:bg-pharmacy-navy/90" : "hover:text-pharmacy-navy hover:border-pharmacy-navy"}
            >
              Multiple Receipts
            </Button>
          </div>

          <PDFUploader
            onDataExtracted={onDataExtracted}
            onUseSample={handleUseSample}
            isMultiple={isMultipleMode}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadView;

import { Button } from "@/components/ui/button";
