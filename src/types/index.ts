
export interface Medication {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  net?: number;
}

export interface Customer {
  name: string;
  id: string;
  date?: string;
  memberOf?: string;
  mobileNo?: string;
  claimCode?: string;
  firstDispensingDate?: string;
  examinationDate?: string;
  approvalDoctor?: string;
  claimType?: string;
  specialInstructions?: string;
  providerNotes?: string;
}

export interface ReceiptSummary {
  subtotal: number;
  coveragePercentage: number;
  coverageAmount: number;
  finalTotal: number;
}

export interface PharmacyInfo {
  name: string;
  address: string;
  phone: string;
  landline: string;
  website: string;
  logo: string;
}

export interface ReceiptData {
  customer: Customer;
  medications: Medication[];
  summary: ReceiptSummary;
  pharmacy: PharmacyInfo;
  invoiceId?: string;
}
