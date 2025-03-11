
import React from "react";
import { Receipt as ReceiptType } from "../utils/sampleData";
import { PHARMACY_INFO, formatCurrency, formatDate } from "../utils/pharmacyInfo";

interface ReceiptProps {
  receipt: ReceiptType;
  isPrintMode?: boolean;
}

const Receipt: React.FC<ReceiptProps> = ({ receipt, isPrintMode = false }) => {
  const dateObj = new Date(receipt.date);

  return (
    <div className={`receipt-container w-full max-w-2xl mx-auto ${!isPrintMode ? "animate-scale-in-content" : ""} bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 mb-8 print:mb-0 print:shadow-none print:border-0 page-break-after-always`}>
      {/* Header */}
      <div className="bg-pharmacy-navy text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{PHARMACY_INFO.name}</h2>
            <p className="text-sm opacity-80">{PHARMACY_INFO.address}</p>
            <p className="text-sm opacity-80">Phone: {PHARMACY_INFO.phone} | Landline: {PHARMACY_INFO.landline}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Receipt #{receipt.invoiceNumber}</p>
            <p className="text-sm opacity-80">{formatDate(dateObj)}</p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-3 text-pharmacy-navy">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Name:</span> {receipt.customer.name}</p>
            {receipt.customer.nameArabic && (
              <p className="arabic">{receipt.customer.nameArabic}</p>
            )}
            <p><span className="font-medium">ID:</span> {receipt.customer.id}</p>
            <p><span className="font-medium">Phone:</span> {receipt.customer.phone}</p>
          </div>
          {receipt.customer.insurance && (
            <div>
              <p><span className="font-medium">Insurance:</span> {receipt.customer.insurance.provider}</p>
              {receipt.customer.insurance.providerArabic && (
                <p className="arabic">{receipt.customer.insurance.providerArabic}</p>
              )}
              <p><span className="font-medium">Policy Number:</span> {receipt.customer.insurance.policyNumber}</p>
              <p><span className="font-medium">Coverage:</span> {receipt.customer.insurance.coverage}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Medications */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold mb-3 text-pharmacy-navy">Medications</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {receipt.medications.map((medication, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      {medication.nameArabic && (
                        <p className="arabic text-sm text-gray-500">{medication.nameArabic}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">{medication.quantity}</td>
                  <td className="py-3 px-4">{formatCurrency(medication.price)}</td>
                  <td className="py-3 px-4">{formatCurrency(medication.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-end">
          <div className="w-full max-w-xs">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(receipt.subtotal)}</span>
            </div>
            {receipt.discount && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(receipt.discount)}</span>
              </div>
            )}
            {receipt.tax && (
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>{formatCurrency(receipt.tax)}</span>
              </div>
            )}
            {receipt.insuranceCoverage && (
              <div className="flex justify-between mb-2 text-blue-600">
                <span>Insurance Coverage:</span>
                <span>-{formatCurrency(receipt.insuranceCoverage)}</span>
              </div>
            )}
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-300 font-bold text-pharmacy-navy">
              <span>Total:</span>
              <span>{formatCurrency(receipt.total)}</span>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Payment Method:</span>
              <span>{receipt.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-gray-500 bg-gray-100">
        <p>Thank you for choosing {PHARMACY_INFO.name}</p>
        <p>{PHARMACY_INFO.website} | {PHARMACY_INFO.email}</p>
      </div>
    </div>
  );
};

export default Receipt;
