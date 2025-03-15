
/**
 * @file coverageExtractor.ts
 * @description Functions for extracting insurance coverage information from PDF text
 */

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
