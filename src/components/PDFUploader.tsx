
import React, { useState, useRef } from "react";
import { Upload, FileUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSampleReceipt, createMultipleSampleReceipts, Receipt as ReceiptType } from "../utils/sampleData";

interface PDFUploaderProps {
  onDataExtracted: (data: ReceiptType | ReceiptType[]) => void;
  onUseSample: () => void;
  isMultiple?: boolean;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onDataExtracted,
  onUseSample,
  isMultiple = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // For now, we're simulating the PDF processing with a timeout
    // In a real implementation, you would use a PDF parsing library
    setTimeout(() => {
      // Generate sample data
      if (isMultiple) {
        onDataExtracted(createMultipleSampleReceipts(Math.floor(Math.random() * 3) + 2));
      } else {
        onDataExtracted(createSampleReceipt());
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleUseSample = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate processing delay
    setTimeout(() => {
      onUseSample();
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? "border-pharmacy-navy bg-pharmacy-lightBlue"
            : "border-gray-300 hover:border-pharmacy-navy hover:bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-pharmacy-lightBlue p-4">
            <Upload className="w-8 h-8 text-pharmacy-navy" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800">
              {isMultiple ? "Upload Multiple Receipts" : "Upload Prescription"}
            </h3>
            <p className="text-sm text-gray-500">
              Drag and drop your PDF file, or click to browse files
            </p>
          </div>
          <Button
            onClick={handleButtonClick}
            className="bg-pharmacy-navy hover:bg-pharmacy-navy/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FileUp className="w-4 h-4" />
                <span>Select PDF File</span>
              </div>
            )}
          </Button>
          <div className="text-sm text-gray-500">
            <p>Supported format: PDF</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="text-center mt-6">
        <Button
          variant="outline"
          onClick={handleUseSample}
          disabled={isLoading}
          className="text-pharmacy-navy hover:bg-pharmacy-lightBlue hover:text-pharmacy-navy hover:border-pharmacy-navy transition-all duration-300"
        >
          Use Sample Data Instead
        </Button>
      </div>
    </div>
  );
};

export default PDFUploader;
