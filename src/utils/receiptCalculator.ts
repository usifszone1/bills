
/**
 * @file receiptCalculator.ts
 * @description Functions for calculating receipt totals and summaries
 */

import { Medication, ReceiptSummary } from '@/types';
import { extractCoveragePercentage } from './coverageExtractor';

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
  
  // Calculate coverage amount based on the increased subtotal
  const coverageAmount = (increasedSubtotal * coveragePercentage) / 100;
  
  // Calculate final total
  const finalTotal = increasedSubtotal - coverageAmount;
  
  return {
    subtotal: increasedSubtotal, // Using the increased value as the gross amount
    coveragePercentage,
    coverageAmount,
    finalTotal
  };
};

// Re-export the extractCoveragePercentage function for backwards compatibility
export { extractCoveragePercentage } from './coverageExtractor';
