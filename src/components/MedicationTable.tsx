
import React from 'react';
import { Medication } from '@/types';

interface MedicationTableProps {
  medications: Medication[];
  coveragePercentage: number;
}

const MedicationTable: React.FC<MedicationTableProps> = ({ medications, coveragePercentage }) => {
  if (!medications.length) {
    return (
      <div className="py-6 text-center text-pharmacy-darkGray/60 animate-fade-in">
        <p>No medications found</p>
      </div>
    );
  }

  // Calculate net price after company discount
  const calculateNet = (total: number, coveragePercentage: number) => {
    // Net is the amount after coverage percentage is applied
    const discount = (total * coveragePercentage) / 100;
    return total - discount;
  };

  return (
    <div className="w-full overflow-hidden animate-slide-up">
      <table className="w-full min-w-full text-sm">
        <thead>
          <tr className="border-b border-pharmacy-navy/10">
            <th className="py-2 px-1 text-center font-medium text-pharmacy-navy">Qty</th>
            <th className="py-2 px-1 text-left font-medium text-pharmacy-navy">Name</th>
            <th className="py-2 px-1 text-center font-medium text-pharmacy-navy">Unit</th>
            <th className="py-2 px-1 text-right font-medium text-pharmacy-navy">Net</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => {
            const netAmount = calculateNet(medication.total, coveragePercentage);
            
            return (
              <tr 
                key={index} 
                className="border-b border-pharmacy-navy/5 hover:bg-pharmacy-lightGray transition-colors"
              >
                <td className="py-2 px-1 text-center">{medication.quantity}</td>
                <td className="py-2 px-1 text-left">{medication.name}</td>
                <td className="py-2 px-1 text-center">{medication.price.toFixed(2)}</td>
                <td className="py-2 px-1 text-right">{netAmount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationTable;
