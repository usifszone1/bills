
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
 * Extracts the gross amount from the PDF text
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {number} The extracted gross amount, or 0 if not found
 */
export const extractGrossAmount = (text: string): number => {
  try {
    // Pattern for gross amount
    const grossPattern = /(?:Gross Amount|إجمالي المبلغ)[\s:]+(\d+(?:\.\d+)?)\s*(?:EGP|ج\.م\.?)?/i;
    const grossMatch = text.match(grossPattern);
    if (grossMatch && grossMatch[1]) {
      return parseFloat(grossMatch[1]);
    }
  } catch (error) {
    console.error('Error extracting gross amount:', error);
  }
  
  return 0; // Default to 0 if not found
};

/**
 * Extracts the discount amount from the PDF text
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {number} The extracted discount amount, or 0 if not found
 */
export const extractDiscountAmount = (text: string): number => {
  try {
    // Pattern for discount amount
    const discountPattern = /(?:Discount Amount|مبلغ الخصم)[\s:]+(\d+(?:\.\d+)?)\s*(?:EGP|ج\.م\.?)?/i;
    const discountMatch = text.match(discountPattern);
    if (discountMatch && discountMatch[1]) {
      return parseFloat(discountMatch[1]);
    }
  } catch (error) {
    console.error('Error extracting discount amount:', error);
  }
  
  return 0; // Default to 0 if not found
};

/**
 * Extracts the net amount from the PDF text
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {number} The extracted net amount, or 0 if not found
 */
export const extractNetAmount = (text: string): number => {
  try {
    // Pattern for net amount
    const netPattern = /(?:Net Amount|صافي المبلغ)[\s:]+(\d+(?:\.\d+)?)\s*(?:EGP|ج\.م\.?)?/i;
    const netMatch = text.match(netPattern);
    if (netMatch && netMatch[1]) {
      return parseFloat(netMatch[1]);
    }
  } catch (error) {
    console.error('Error extracting net amount:', error);
  }
  
  return 0; // Default to 0 if not found
};

/**
 * Calculates the receipt summary including subtotal, coverage amount, and final total
 * 
 * @param {Medication[]} medications - Array of medications with quantities and prices
 * @param {number} coveragePercentage - Insurance coverage percentage (0-100)
 * @param {number} extractedGross - Gross amount extracted from PDF (optional)
 * @param {number} extractedDiscount - Discount amount extracted from PDF (optional)
 * @param {number} extractedNet - Net amount extracted from PDF (optional)
 * @returns {ReceiptSummary} Object containing subtotal, coverage info, and final amount
 */
export const calculateReceiptSummary = (
  medications: Medication[], 
  coveragePercentage: number = 0,
  extractedGross: number = 0,
  extractedDiscount: number = 0,
  extractedNet: number = 0
): ReceiptSummary => {
  // Calculate subtotal from medications if no extracted gross is provided
  const subtotalFromMedications = medications.reduce((sum, medication) => sum + medication.total, 0);
  
  // Apply 7% increase to the total
  const increasedSubtotal = subtotalFromMedications * 1.07;
  
  // Use extracted gross amount if available, otherwise use calculated amount
  const subtotal = extractedGross > 0 ? extractedGross : increasedSubtotal;
  
  // Use extracted discount if available, otherwise calculate it
  const coverageAmount = extractedDiscount > 0 ? 
    extractedDiscount : 
    (subtotal * coveragePercentage) / 100;
  
  // Use extracted net if available, otherwise calculate it
  const finalTotal = extractedNet > 0 ? 
    extractedNet : 
    subtotal - coverageAmount;
  
  return {
    subtotal,
    coveragePercentage,
    coverageAmount,
    finalTotal
  };
};
