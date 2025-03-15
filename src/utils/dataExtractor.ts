
/**
 * @file dataExtractor.ts
 * @description Main coordinator for extracting receipt data from PDF text
 */

import { ReceiptData } from '@/types';
import { extractCustomerInfo } from './customerExtractor';
import { extractMedications } from './medicationExtractor';
import { calculateReceiptSummary, extractCoveragePercentage } from './receiptCalculator';
import { PHARMACY_INFO } from './pharmacyInfo';

/**
 * Main function to extract all data from PDF text
 * Coordinates the extraction of customer info, medications, and calculates summary
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {ReceiptData} Complete receipt data object containing customer, medications, and summary
 */
export const extractReceiptData = (text: string): ReceiptData => {
  const customer = extractCustomerInfo(text);
  const medications = extractMedications(text);
  
  // Extract coverage percentage or default to 0%
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
