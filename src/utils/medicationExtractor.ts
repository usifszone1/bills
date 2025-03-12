
import { Medication } from '@/types';

// Extract medication information
export const extractMedications = (text: string): Medication[] => {
  const medications: Medication[] = [];

  try {
    // New pattern provided by the user
    const medicationPattern = /([\d\.]+)\/(\w+)\s+(.*?)\s+([\d\.]+)/gm;
    
    let match;
    while ((match = medicationPattern.exec(text)) !== null) {
      const quantity = parseFloat(match[1]);
      const unit = match[2].trim();
      const name = match[3].trim();
      const price = parseFloat(match[4]);
      const total = quantity * price;
      
      medications.push({
        name,
        quantity,
        unit,
        price,
        total
      });
    }

    // If no medications were found with the new pattern, try the original patterns
    if (medications.length === 0) {
      // Original pattern: Looking for patterns like: Medicine Name - Quantity x Price
      const oldMedicationPattern = /([a-zA-Z\u0600-\u06FF\s]+)[\s-]+(\d+)[\s\*x]+([\d\.]+)/gi;
      
      while ((match = oldMedicationPattern.exec(text)) !== null) {
        const name = match[1].trim();
        const quantity = parseInt(match[2], 10);
        const price = parseFloat(match[3]);
        const total = quantity * price;
        
        medications.push({
          name,
          quantity,
          unit: 'box', // Default unit
          price,
          total
        });
      }
    }

    // If still no medications were found, try a more generic approach
    if (medications.length === 0) {
      // Extract any lines that contain numbers that might represent quantity and price
      const lines = text.split('\n');
      for (const line of lines) {
        const numberPattern = /(\d+)/g;
        const numbers = [...line.matchAll(numberPattern)];
        
        if (numbers.length >= 2) {
          const quantity = parseInt(numbers[0][0], 10);
          const price = parseFloat(numbers[1][0]);
          
          // Assume text before first number is the medication name
          const nameEndIndex = line.indexOf(numbers[0][0]);
          const name = line.substring(0, nameEndIndex).trim();
          
          if (name && quantity && price) {
            medications.push({
              name,
              quantity,
              unit: 'box',
              price,
              total: quantity * price
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error extracting medications:', error);
  }

  return medications;
};
