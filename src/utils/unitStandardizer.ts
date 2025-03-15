
/**
 * @file unitStandardizer.ts
 * @description Functions for standardizing medication units
 */

/**
 * Maps common Arabic/English unit abbreviations to standardized units
 * @param {string} unit - The unit string from the PDF
 * @returns {string} Standardized unit name
 */
export const standardizeUnit = (unit: string): string => {
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
export const parseQuantityAndUnit = (quantityStr: string): { quantity: number, unit: string } => {
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
