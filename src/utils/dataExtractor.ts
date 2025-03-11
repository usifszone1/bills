
import { Customer, Medication, ReceiptSummary, ReceiptData, PharmacyInfo } from '@/types';

// Pharmacy information (static)
export const PHARMACY_INFO: PharmacyInfo = {
  name: 'صيدلية الزهور',
  address: 'ش 6 أكتوبر - سور النادي الرياضي بجوار مسجد الاستاد - كفر الشيخ',
  phone: '01066677826',
  landline: '+0473232222',
  website: 'www.zohourph.site',
  logo: '/lovable-uploads/2034f005-2d74-4abf-b0fc-a914832dd8a9.png'
};

// Extract customer information
export const extractCustomerInfo = (text: string): Customer => {
  // Default values
  let customer: Customer = {
    name: 'Unknown Customer',
    id: 'Unknown ID',
    date: new Date().toLocaleDateString(),
  };

  try {
    // Pattern for customer name (this is a simplified example)
    const namePattern = /(?:اسم المريض|اسم العميل|Patient Name|Customer)[\s:]+([^\n\r]+)/i;
    const nameMatch = text.match(namePattern);
    if (nameMatch && nameMatch[1]) {
      customer.name = nameMatch[1].trim();
    }

    // Pattern for customer ID
    const idPattern = /(?:الرقم القومي|رقم الهوية|ID Number|ID)[\s:]+([0-9\-]+)/i;
    const idMatch = text.match(idPattern);
    if (idMatch && idMatch[1]) {
      customer.id = idMatch[1].trim();
    }

    // Pattern for date
    const datePattern = /(?:التاريخ|تاريخ|Date)[\s:]+([0-9\-/\.]+)/i;
    const dateMatch = text.match(datePattern);
    if (dateMatch && dateMatch[1]) {
      customer.date = dateMatch[1].trim();
    }
  } catch (error) {
    console.error('Error extracting customer info:', error);
  }

  return customer;
};

// Extract medication information
export const extractMedications = (text: string): Medication[] => {
  const medications: Medication[] = [];

  try {
    // Looking for patterns like: Medicine Name - Quantity x Price
    // This is a simplified approach and might need to be adjusted based on the actual PDF format
    const medicationPattern = /([a-zA-Z\u0600-\u06FF\s]+)[\s-]+(\d+)[\s\*x]+([\d\.]+)/gi;
    
    let match;
    while ((match = medicationPattern.exec(text)) !== null) {
      const name = match[1].trim();
      const quantity = parseInt(match[2], 10);
      const price = parseFloat(match[3]);
      const total = quantity * price;
      
      medications.push({
        name,
        quantity,
        unit: 'box', // Default unit, can be enhanced to extract actual units
        price,
        total
      });
    }

    // If no medications were found, try a more generic approach
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

// Calculate receipt summary
export const calculateReceiptSummary = (medications: Medication[], coveragePercentage: number = 0): ReceiptSummary => {
  // Calculate subtotal
  const subtotal = medications.reduce((sum, medication) => sum + medication.total, 0);
  
  // Calculate coverage amount
  const coverageAmount = (subtotal * coveragePercentage) / 100;
  
  // Calculate final total
  const finalTotal = subtotal - coverageAmount;
  
  return {
    subtotal,
    coveragePercentage,
    coverageAmount,
    finalTotal
  };
};

// Main function to extract all data from PDF text
export const extractReceiptData = (text: string): ReceiptData => {
  const customer = extractCustomerInfo(text);
  const medications = extractMedications(text);
  
  // Default to 0% coverage, can be extracted from PDF if available
  const coveragePercentage = extractCoveragePercentage(text);
  
  const summary = calculateReceiptSummary(medications, coveragePercentage);
  
  return {
    customer,
    medications,
    summary,
    pharmacy: PHARMACY_INFO
  };
};

// Extract coverage percentage
export const extractCoveragePercentage = (text: string): number => {
  try {
    // Pattern for coverage percentage
    const coveragePattern = /(?:تغطية|نسبة التغطية|Coverage|Insurance)[\s:]+(\d+)%/i;
    const coverageMatch = text.match(coveragePattern);
    if (coverageMatch && coverageMatch[1]) {
      return parseInt(coverageMatch[1], 10);
    }
  } catch (error) {
    console.error('Error extracting coverage percentage:', error);
  }
  
  return 0; // Default to 0% if not found
};
