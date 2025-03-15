
/**
 * @file extractionPatterns.ts
 * @description Different pattern matching strategies for medication extraction
 */

import { Medication } from '@/types';
import { parseQuantityAndUnit, standardizeUnit } from './unitStandardizer';

/**
 * Extracts medications using a table-like format pattern
 * @param {string} text - PDF text content
 * @returns {Medication[]} Array of extracted medications
 */
export const extractTableFormat = (text: string): Medication[] => {
  const medications: Medication[] = [];
  
  // Pattern for table-like format (like in the image):
  // Qty | ICD | Name | Unit | Dis. | Cop. | Net
  const tableRowPattern = /([0-9\.]+\/[A-Za-z]+)\s+(?:[^\s|]+)\s+([^\|]+?)\s+([0-9\.]+)\s+(?:[0-9\.]+)\s+(?:[0-9\.]+)\s+([0-9\.]+)/g;
  
  let match;
  while ((match = tableRowPattern.exec(text)) !== null) {
    const qtyWithUnit = match[1].trim();
    const name = match[2].trim();
    const unitPrice = parseFloat(match[3]);
    const netPrice = parseFloat(match[4]);
    
    const { quantity, unit } = parseQuantityAndUnit(qtyWithUnit);
    
    medications.push({
      name,
      quantity,
      unit,
      price: unitPrice,
      total: unitPrice * quantity,
      net: netPrice
    });
  }
  
  return medications;
};

/**
 * Extracts medications using a pattern with quantity/unit, name, price
 * @param {string} text - PDF text content
 * @returns {Medication[]} Array of extracted medications
 */
export const extractQuantityUnitNamePrice = (text: string): Medication[] => {
  const medications: Medication[] = [];
  
  // Pattern 1: Looking for quantity/unit, name, price pattern
  // Example: 3/STRIPS Axomyellin Ultra 30 Tablets 460
  const medicationPattern = /([\d\.]+)\/(\w+)\s+(.*?)\s+([\d\.]+)/gm;
  
  let match;
  while ((match = medicationPattern.exec(text)) !== null) {
    const quantity = parseFloat(match[1]);
    const rawUnit = match[2].trim();
    const name = match[3].trim();
    const price = parseFloat(match[4]);
    const total = quantity * price;
    
    medications.push({
      name,
      quantity,
      unit: standardizeUnit(rawUnit),
      price,
      total
    });
  }
  
  return medications;
};

/**
 * Extracts medications using a pattern with quantity, unit, name, price
 * @param {string} text - PDF text content
 * @returns {Medication[]} Array of extracted medications
 */
export const extractQuantityUnitNamePriceFormat = (text: string): Medication[] => {
  const medications: Medication[] = [];
  
  // Pattern 2: Looking for quantity, unit abbreviation, name, price
  // Example: 3 STRIPS Axomyellin Ultra 30 Tablets 460
  const pattern = /([\d\.]+)\s+(\w+)\s+(.*?)\s+([\d\.]+)/gm;
  
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const quantity = parseFloat(match[1]);
    const rawUnit = match[2].trim();
    const name = match[3].trim();
    const price = parseFloat(match[4]);
    const total = quantity * price;
    
    // Only add if the second part looks like a unit
    if (/^(tab|strip|box|vial|amp|bottle|syringe)/i.test(rawUnit)) {
      medications.push({
        name,
        quantity,
        unit: standardizeUnit(rawUnit),
        price,
        total
      });
    }
  }
  
  return medications;
};

/**
 * Extracts medications using a simple line-by-line pattern
 * @param {string} text - PDF text content
 * @returns {Medication[]} Array of extracted medications
 */
export const extractLineByLineFormat = (text: string): Medication[] => {
  const medications: Medication[] = [];
  
  // Pattern 3: Simple line-by-line pattern with name - quantity x price
  const pattern = /([a-zA-Z\u0600-\u06FF\s]+)[\s-]+(\d+)[\s\*x]+([\d\.]+)/gi;
  
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const name = match[1].trim();
    const quantity = parseInt(match[2], 10);
    const price = parseFloat(match[3]);
    const total = quantity * price;
    
    medications.push({
      name,
      quantity,
      unit: 'TAB',  // Default unit if not specified
      price,
      total
    });
  }
  
  return medications;
};

/**
 * Extracts medications from table-like structure with rows
 * @param {string} text - PDF text content
 * @returns {Medication[]} Array of extracted medications
 */
export const extractTableRowsFormat = (text: string): Medication[] => {
  const medications: Medication[] = [];
  
  // Pattern 4: Table-like structure with rows
  const lines = text.split('\n');
  
  for (const line of lines) {
    // Look for lines that have at least 3 numbers (qty, price, total)
    const numbers = line.match(/\d+(\.\d+)?/g);
    
    if (numbers && numbers.length >= 3) {
      // Extract text between first and second number as the name
      const firstNumIndex = line.indexOf(numbers[0]);
      const secondNumIndex = line.indexOf(numbers[1], firstNumIndex + numbers[0].length);
      
      if (firstNumIndex >= 0 && secondNumIndex > firstNumIndex) {
        const quantity = parseFloat(numbers[0]);
        const price = parseFloat(numbers[1]);
        
        // Extract the name between the first number and the second number
        let name = line.substring(firstNumIndex + numbers[0].length, secondNumIndex).trim();
        
        // Try to identify a unit in the name
        const unitMatch = name.match(/^(tab|tabs|strip|strips|box|boxes|vial|vials|amp|bottle|syringe)/i);
        let unit = 'UNIT';
        
        if (unitMatch) {
          unit = standardizeUnit(unitMatch[0]);
          name = name.substring(unitMatch[0].length).trim();
        }
        
        // If name still not extracted, use the text before the first number
        if (!name && firstNumIndex > 0) {
          name = line.substring(0, firstNumIndex).trim();
        }
        
        if (name && quantity && price) {
          medications.push({
            name,
            quantity,
            unit,
            price,
            total: quantity * price
          });
        }
      }
    }
  }
  
  return medications;
};
