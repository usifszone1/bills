
import { Medication, ReceiptSummary } from '@/types';

// Extract coverage percentage
export const extractCoveragePercentage = (text: string): number => {
  try {
    // Enhanced pattern for coverage percentage
    const coveragePattern = /(?:تغطية|نسبة التغطية|Coverage|Insurance|coverage percentage|Co-payment)[\s:]+(\d+)%?/i;
    const coverageMatch = text.match(coveragePattern);
    if (coverageMatch && coverageMatch[1]) {
      return parseInt(coverageMatch[1], 10);
    }
  } catch (error) {
    console.error('Error extracting coverage percentage:', error);
  }
  
  return 0; // Default to 0% if not found
};

// Calculate receipt summary
export const calculateReceiptSummary = (medications: Medication[], coveragePercentage: number = 0): ReceiptSummary => {
  // Calculate subtotal
  const subtotal = medications.reduce((sum, medication) => sum + medication.total, 0);
  
  // Calculate coverage amount
  const coverageAmount = (subtotal * coveragePercentage) / 100;
  
  // Calculate final total
  const finalTotal = subtotal - coverageAmount;
  
  return {
    subtotal,
    coveragePercentage,
    coverageAmount,
    finalTotal
  };
};
