
/**
 * @file receiptCalculator.ts
 * @description Functions for calculating receipt totals and extracting coverage percentages
 */

import { Medication, ReceiptSummary } from '@/types';

/**
 * Extracts the insurance coverage percentage from the PDF text
 * Searches for various patterns that might indicate coverage percentage
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {number} The extracted coverage percentage, or 0 if not found
 */
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

/**
 * Calculates the receipt summary including subtotal, coverage amount, and final total
 * 
 * @param {Medication[]} medications - Array of medications with quantities and prices
 * @param {number} coveragePercentage - Insurance coverage percentage (0-100)
 * @returns {ReceiptSummary} Object containing subtotal, coverage info, and final amount
 */
export const calculateReceiptSummary = (medications: Medication[], coveragePercentage: number = 0): ReceiptSummary => {
  // Calculate subtotal
  const subtotal = medications.reduce((sum, medication) => sum + medication.total, 0);
  
  // Apply 7% increase to the total
  const increasedSubtotal = subtotal * 1.07;
  
  // Calculate discount amount (coverage amount) based on the increased subtotal
  const coverageAmount = (increasedSubtotal * coveragePercentage) / 100;
  
  // Calculate final total (Net)
  const finalTotal = increasedSubtotal - coverageAmount;
  
  return {
    subtotal: increasedSubtotal, // Using the increased value as the gross amount
    coveragePercentage,
    coverageAmount,
    finalTotal
  };
};
