
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { parsePDF } from '@/utils/pdfParser';
import { extractReceiptData } from '@/utils/dataExtractor';
import { ReceiptData } from '@/types';
import { Loader2, UploadCloud } from 'lucide-react';

interface PDFUploaderProps {
  onDataExtracted: (data: ReceiptData[]) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onDataExtracted }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<{current: number, total: number}>({current: 0, total: 0});

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

  const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
    toast({
      title,
      description,
      variant,
    });
  };

  const validateFile = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      showToast("Error", `File "${file.name}" is not a PDF file`, "destructive");
      return false;
    }
    return true;
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length === 0) return;
    
    setIsProcessing(true);
    setProcessingProgress({current: 0, total: validFiles.length});
    
    try {
      const processedData: ReceiptData[] = [];
      
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setProcessingProgress({current: i + 1, total: validFiles.length});
        
        try {
          const pdfText = await parsePDF(file);
          const receiptData = extractReceiptData(pdfText);
          
          // Generate unique invoice ID based on timestamp and random string
          const uniqueId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          receiptData.invoiceId = uniqueId;
          
          processedData.push(receiptData);
        } catch (error: any) {
          console.error(`Error processing PDF ${file.name}:`, error);
          showToast("Warning", `Failed to process "${file.name}": ${error.message}`, "destructive");
        }
      }
      
      if (processedData.length > 0) {
        onDataExtracted(processedData);
        showToast(
          "Success", 
          `Successfully processed ${processedData.length} out of ${validFiles.length} PDF files`
        );
      } else {
        showToast("Error", "No PDFs could be processed successfully", "destructive");
      }
    } catch (error: any) {
      console.error('Error batch processing PDFs:', error);
      showToast("Error", `Failed to process PDF files: ${error.message}`, "destructive");
    } finally {
      setIsProcessing(false);
      setProcessingProgress({current: 0, total: 0});
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
          {isProcessing ? (
            <Loader2 className="h-12 w-12 mb-4 text-pharmacy-coral animate-spin" />
          ) : (
            <UploadCloud 
              className={`h-12 w-12 mb-4 ${dragActive ? 'text-pharmacy-coral' : 'text-pharmacy-navy/60'}`}
            />
          )}
          
          <h3 className="text-lg font-medium mb-2">
            {isProcessing ? 'Processing...' : 'Upload PDF Receipts'}
          </h3>
          
          {isProcessing && processingProgress.total > 1 && (
            <p className="text-sm text-pharmacy-darkGray/70 mb-2">
              Processing file {processingProgress.current} of {processingProgress.total}
            </p>
          )}
          
          <p className="text-sm text-pharmacy-darkGray/70 mb-4">
            {isProcessing 
              ? 'Please wait while we process your files' 
              : 'Drag and drop multiple PDF files here, or click to select'}
          </p>
          
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pharmacy-navy hover:bg-pharmacy-navy/80">
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              'Select Files'
            )}
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={handleFileChange} 
              disabled={isProcessing}
              multiple
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;
