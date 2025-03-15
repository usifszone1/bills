
/**
 * @file medicationExtractor.ts
 * @description Functions for extracting medication information from PDF text
 */

import { Medication } from '@/types';

/**
 * Maps common Arabic/English unit abbreviations to standardized units
 * @param {string} unit - The unit string from the PDF
 * @returns {string} Standardized unit name
 */
const standardizeUnit = (unit: string): string => {
  const unitMap: Record<string, string> = {
    'tab': 'TAB',
    'tabs': 'TAB',
    'tablet': 'TAB',
    'tablets': 'TAB',
    'حبة': 'TAB',
    'اقراص': 'TAB',
    'قرص': 'TAB',
    'box': 'BOX',
    'boxes': 'BOX',
    'علبة': 'BOX',
    'strip': 'STRIP',
    'strips': 'STRIP',
    'شريط': 'STRIP',
    'شرائط': 'STRIP',
    'vial': 'VIAL',
    'vials': 'VIAL',
    'amp': 'AMP',
    'ampule': 'AMP',
    'syringe': 'SYRINGE',
    'syringes': 'SYRINGE',
    'حقنة': 'SYRINGE',
    'bottle': 'BOTTLE',
    'زجاجة': 'BOTTLE',
    'cap': 'CAP',
    'caps': 'CAP',
    'capsule': 'CAP',
    'capsules': 'CAP',
    'cream': 'CREAM',
  };

  const lowerUnit = unit.toLowerCase().trim();
  return unitMap[lowerUnit] || unit.toUpperCase();
};

/**
 * Parses quantity string like "1.0/Box" into quantity and unit
 * @param {string} quantityStr - The quantity string from the PDF
 * @returns {{ quantity: number, unit: string }} Object with quantity and unit
 */
const parseQuantityAndUnit = (quantityStr: string): { quantity: number, unit: string } => {
  // Default values
  let quantity = 1;
  let unit = 'UNIT';

  try {
    // Handle formats like "1.0/Box", "3.0/Strip", etc.
    const slashPattern = /^\s*([\d\.]+)\s*\/\s*(\w+)\s*$/i;
    const slashMatch = quantityStr.match(slashPattern);
    
    if (slashMatch) {
      quantity = parseFloat(slashMatch[1]);
      unit = standardizeUnit(slashMatch[2]);
      return { quantity, unit };
    }
    
    // Handle other formats
    const simplePattern = /^\s*([\d\.]+)\s*(\w+)?\s*$/i;
    const simpleMatch = quantityStr.match(simplePattern);
    
    if (simpleMatch) {
      quantity = parseFloat(simpleMatch[1]);
      if (simpleMatch[2]) {
        unit = standardizeUnit(simpleMatch[2]);
      }
    }
  } catch (error) {
    console.error('Error parsing quantity and unit:', error);
  }
  
  return { quantity, unit };
};

/**
 * Extracts medication information from the PDF text
 * Uses multiple pattern matching strategies to identify medication details
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {Medication[]} Array of medication objects with name, quantity, unit, price and total
 */
export const extractMedications = (text: string): Medication[] => {
  const medications: Medication[] = [];

  try {
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

    // Pattern 1: Looking for quantity/unit, name, price pattern
    // Example: 3/STRIPS Axomyellin Ultra 30 Tablets 460
    if (medications.length === 0) {
      const medicationPattern = /([\d\.]+)\/(\w+)\s+(.*?)\s+([\d\.]+)/gm;
      
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
    }

    // Pattern 2: Looking for quantity, unit abbreviation, name, price
    // Example: 3 STRIPS Axomyellin Ultra 30 Tablets 460
    if (medications.length === 0) {
      const pattern2 = /([\d\.]+)\s+(\w+)\s+(.*?)\s+([\d\.]+)/gm;
      
      while ((match = pattern2.exec(text)) !== null) {
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
    }
    
    // Pattern 3: Simple line-by-line pattern with name - quantity x price
    if (medications.length === 0) {
      const pattern3 = /([a-zA-Z\u0600-\u06FF\s]+)[\s-]+(\d+)[\s\*x]+([\d\.]+)/gi;
      
      while ((match = pattern3.exec(text)) !== null) {
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
    }

    // Pattern 4: Table-like structure with rows
    if (medications.length === 0) {
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
    }
  } catch (error) {
    console.error('Error extracting medications:', error);
  }

  return medications;
};
