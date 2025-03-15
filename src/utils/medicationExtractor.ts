
/**
 * @file medicationExtractor.ts
 * @description Functions for extracting medication information from PDF text
 */

import { Medication } from '@/types';
import { 
  extractTableFormat,
  extractQuantityUnitNamePrice,
  extractQuantityUnitNamePriceFormat,
  extractLineByLineFormat,
  extractTableRowsFormat
} from './extractionPatterns';
import { parseQuantityAndUnit, standardizeUnit } from './unitStandardizer';

/**
 * Extracts medication information from the PDF text
 * Uses multiple pattern matching strategies to identify medication details
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {Medication[]} Array of medication objects with name, quantity, unit, price and total
 */
export const extractMedications = (text: string): Medication[] => {
  let medications: Medication[] = [];

  try {
    // Try each extraction pattern until we find some medications
    medications = extractTableFormat(text);
    
    if (medications.length === 0) {
      medications = extractQuantityUnitNamePrice(text);
    }
    
    if (medications.length === 0) {
      medications = extractQuantityUnitNamePriceFormat(text);
    }
    
    if (medications.length === 0) {
      medications = extractLineByLineFormat(text);
    }
    
    if (medications.length === 0) {
      medications = extractTableRowsFormat(text);
    }
  } catch (error) {
    console.error('Error extracting medications:', error);
  }

  return medications;
};

// Re-export utility functions for backwards compatibility
export { standardizeUnit, parseQuantityAndUnit };
