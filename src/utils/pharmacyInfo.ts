
export const PHARMACY_INFO = {
  name: "Elzohour Pharmacy - صيدلية الزهـور",
  address: "شارع 6 أكتوبر - سور النادي الرياضي بجوار مسجد الاستاد- كفر الشيخ",
  phone: "01066677826",
  landline: "0473232222",
  email: "info@elzohourpharmacy.com",
  website: "www.zohourph.site",
  logo: "https://i.imgur.com/Jzn1v0t.png", // Fixed Imgur direct image link
};

// Generate a random invoice number
export const generateInvoiceNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
