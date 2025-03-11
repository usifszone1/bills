
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { parsePDF } from '@/utils/pdfParser';
import { extractReceiptData } from '@/utils/dataExtractor';
import { ReceiptData } from '@/types';

interface PDFUploaderProps {
  onDataExtracted: (data: ReceiptData) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onDataExtracted }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Parse the PDF file
      const pdfText = await parsePDF(file);
      
      // Extract receipt data
      const receiptData = extractReceiptData(pdfText);
      
      // Pass the data to the parent component
      onDataExtracted(receiptData);
      
      toast({
        title: "Success",
        description: "PDF processed successfully",
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Error",
        description: "Failed to process PDF file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div 
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 
          ${dragActive ? 'border-pharmacy-coral bg-pharmacy-coral/5' : 'border-pharmacy-navy/20'} 
          ${isProcessing ? 'opacity-70' : 'hover:border-pharmacy-navy/50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-12 w-12 mb-4 ${dragActive ? 'text-pharmacy-coral' : 'text-pharmacy-navy/60'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          
          <h3 className="text-lg font-medium mb-2">
            {isProcessing ? 'Processing...' : 'Upload PDF Receipt'}
          </h3>
          
          <p className="text-sm text-pharmacy-darkGray/70 mb-4">
            Drag and drop your PDF file here, or click to select
          </p>
          
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pharmacy-navy hover:bg-pharmacy-navy/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pharmacy-navy/50 transition-colors">
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              'Select File'
            )}
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileChange} 
              disabled={isProcessing}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;
