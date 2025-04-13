
import React from 'react';
import { Medication } from '@/types';

interface MedicationTableProps {
  medications: Medication[];
}

const MedicationTable: React.FC<MedicationTableProps> = ({ medications }) => {
  if (!medications.length) {
    return (
      <div className="py-6 text-center text-pharmacy-darkGray/60 animate-fade-in">
        <p>No medications found</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden animate-slide-up">
      <table className="w-full min-w-full text-sm">
        <thead>
          <tr className="border-b border-pharmacy-navy/10">
            <th className="py-2 px-1 text-left font-medium text-pharmacy-navy">Medication</th>
            <th className="py-2 px-1 text-center font-medium text-pharmacy-navy">Quantity</th>
            <th className="py-2 px-1 text-center font-medium text-pharmacy-navy">Price</th>
            <th className="py-2 px-1 text-right font-medium text-pharmacy-navy">Total</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr 
              key={index} 
              className="border-b border-pharmacy-navy/5 hover:bg-pharmacy-lightGray transition-colors"
            >
              <td className="py-2 px-1 text-left">{medication.name}</td>
              <td className="py-2 px-1 text-center">
                {medication.quantity} {medication.unit}
              </td>
              <td className="py-2 px-1 text-center">{medication.price.toFixed(2)}</td>
              <td className="py-2 px-1 text-right">{medication.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationTable;
