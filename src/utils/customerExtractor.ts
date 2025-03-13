
/**
 * @file customerExtractor.ts
 * @description Functions for extracting customer information from PDF text
 */

import { Customer } from '@/types';

/**
 * Extracts customer information from the PDF text
 * Uses regex patterns to identify customer details like ID, date, and organization
 * 
 * @param {string} text - The raw text extracted from a PDF document
 * @returns {Customer} Customer information object with extracted details
 */
export const extractCustomerInfo = (text: string): Customer => {
  // Default values
  let customer: Customer = {
    id: 'Unknown ID',
    date: new Date().toLocaleDateString(),
    memberOf: 'Agricultural Bank of Egypt'
  };

  try {
    // Pattern for customer ID
    const idPattern = /(?:الرقم القومي|رقم الهوية|ID Number|ID|Beneficiary ID)[\s:]+([0-9\-]+)/i;
    const idMatch = text.match(idPattern);
    if (idMatch && idMatch[1]) {
      customer.id = idMatch[1].trim();
    }

    // Enhanced pattern for date extraction
    const datePattern = /(?:Dispensed Date|Date|التاريخ|تاريخ|تاريخ الصرف)[\s:]+([0-9\-/\.\s\p{L}]+)/u;
    const dateMatch = text.match(datePattern);
    if (dateMatch && dateMatch[1]) {
      customer.date = dateMatch[1].trim();
    }
    
    // Enhanced member organization pattern - looking for patterns with "Member Of" or Arabic equivalents
    const memberPattern = /(?:Member Of|عضو في|موظفى|موظفين|اعضاء|موظفي|عملاء|التأمين على)[\s:]+([^\n]+)/i;
    const memberMatch = text.match(memberPattern);
    if (memberMatch && memberMatch[1]) {
      customer.memberOf = memberMatch[1].trim();
    } else {
      // Alternative pattern to capture organizational affiliations
      const altMemberPattern = /(جمعية|شركة|بنك|مؤسسة|هيئة)[\s]+([\p{L}\s]+)/u;
      const altMemberMatch = text.match(altMemberPattern);
      if (altMemberMatch) {
        customer.memberOf = altMemberMatch[0].trim();
      }
    }
    
    // Additional customer information patterns
    // Mobile no pattern
    const mobilePattern = /(?:Mobile No|رقم الجوال)[\s.:]+([0-9\-]+)/i;
    const mobileMatch = text.match(mobilePattern);
    if (mobileMatch && mobileMatch[1]) {
      customer.mobileNo = mobileMatch[1].trim();
    }
    
    // Claim code pattern
    const claimCodePattern = /(?:Claim Code)[\s:]+([0-9\-]+)/i;
    const claimCodeMatch = text.match(claimCodePattern);
    if (claimCodeMatch && claimCodeMatch[1]) {
      customer.claimCode = claimCodeMatch[1].trim();
    }
    
    // First dispensing date pattern
    const firstDispDatePattern = /(?:First Dispensing Date)[\s:]+([0-9\-/\.]+)/i;
    const firstDispDateMatch = text.match(firstDispDatePattern);
    if (firstDispDateMatch && firstDispDateMatch[1]) {
      customer.firstDispensingDate = firstDispDateMatch[1].trim();
    }
    
    // Examination date pattern
    const examDatePattern = /(?:Examination Date)[\s:]+([0-9\-/\.]+)/i;
    const examDateMatch = text.match(examDatePattern);
    if (examDateMatch && examDateMatch[1]) {
      customer.examinationDate = examDateMatch[1].trim();
    }
    
    // Claim type pattern
    const claimTypePattern = /(?:Claim Type)[\s:]+([^\n]+)/i;
    const claimTypeMatch = text.match(claimTypePattern);
    if (claimTypeMatch && claimTypeMatch[1]) {
      customer.claimType = claimTypeMatch[1].trim();
    }
    
    // Special instructions pattern
    const specialInstrPattern = /(?:Special Instructions)[\s:]+([^\n]+)/i;
    const specialInstrMatch = text.match(specialInstrPattern);
    if (specialInstrMatch && specialInstrMatch[1]) {
      customer.specialInstructions = specialInstrMatch[1].trim();
    }
    
    // Provider notes pattern
    const providerNotesPattern = /(?:Provider Notes)[\s:]+([^\n]+)/i;
    const providerNotesMatch = text.match(providerNotesPattern);
    if (providerNotesMatch && providerNotesMatch[1]) {
      customer.providerNotes = providerNotesMatch[1].trim();
    }
    
  } catch (error) {
    console.error('Error extracting customer info:', error);
  }

  return customer;
};
