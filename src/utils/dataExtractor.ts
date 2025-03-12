
import { ReceiptData } from '@/types';
import { extractCustomerInfo } from './customerExtractor';
import { extractMedications } from './medicationExtractor';
import { calculateReceiptSummary, extractCoveragePercentage } from './receiptCalculator';
import { PHARMACY_INFO } from './pharmacyInfo';

// Main function to extract all data from PDF text
export const extractReceiptData = (text: string): ReceiptData => {
  const customer = extractCustomerInfo(text);
  const medications = extractMedications(text);
  
  // Default to 0% coverage, can be extracted from PDF if available
  const coveragePercentage = extractCoveragePercentage(text);
  
  const summary = calculateReceiptSummary(medications, coveragePercentage);
  
  return {
    customer,
    medications,
    summary,
    pharmacy: PHARMACY_INFO
  };
};

// Re-export everything for backwards compatibility
export { PHARMACY_INFO } from './pharmacyInfo';
export { extractCustomerInfo } from './customerExtractor';
export { extractMedications } from './medicationExtractor';
export { calculateReceiptSummary, extractCoveragePercentage } from './receiptCalculator';
