
import { generateInvoiceNumber } from "./pharmacyInfo";

export interface Medication {
  name: string;
  nameArabic?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Receipt {
  invoiceNumber: string;
  date: string;
  customer: {
    name: string;
    nameArabic?: string;
    id: string;
    phone: string;
    insurance?: {
      provider: string;
      providerArabic?: string;
      policyNumber: string;
      coverage: number;
    };
  };
  medications: Medication[];
  subtotal: number;
  discount?: number;
  tax?: number;
  insuranceCoverage?: number;
  total: number;
  paymentMethod: string;
}

export const createSampleReceipt = (): Receipt => {
  return {
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString(),
    customer: {
      name: "Ahmed Mohamed",
      nameArabic: "أحمد محمد",
      id: "1234567890",
      phone: "+20123456789",
      insurance: {
        provider: "National Health Insurance",
        providerArabic: "التأمين الصحي الوطني",
        policyNumber: "INS-789456",
        coverage: 70,
      },
    },
    medications: [
      {
        name: "Paracetamol 500mg",
        nameArabic: "باراسيتامول 500 ملغ",
        quantity: 2,
        price: 5.99,
        total: 11.98,
      },
      {
        name: "Amoxicillin 250mg",
        nameArabic: "أموكسيسيلين 250 ملغ",
        quantity: 1,
        price: 12.5,
        total: 12.5,
      },
      {
        name: "Vitamin C 1000mg",
        nameArabic: "فيتامين سي 1000 ملغ",
        quantity: 3,
        price: 8.75,
        total: 26.25,
      },
    ],
    subtotal: 50.73,
    discount: 5.0,
    tax: 2.29,
    insuranceCoverage: 33.71,
    total: 14.31,
    paymentMethod: "Cash",
  };
};

export const createMultipleSampleReceipts = (count: number = 3): Receipt[] => {
  return Array(count).fill(null).map(() => createSampleReceipt());
};
