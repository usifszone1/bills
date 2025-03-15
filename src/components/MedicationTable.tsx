
import React from 'react';
import { Medication } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  // Calculate net price after company discount with 7% added
  const calculateNet = (total: number, coveragePercentage: number) => {
    // Apply 7% increase to the total
    const increasedTotal = total * 1.07;
    
    // Net is the amount after coverage percentage is applied
    const discount = (increasedTotal * coveragePercentage) / 100;
    return increasedTotal - discount;
  };

  return (
    <div className="w-full overflow-hidden animate-slide-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-medium text-pharmacy-navy">Qty</TableHead>
            <TableHead className="text-left font-medium text-pharmacy-navy">Name</TableHead>
            <TableHead className="text-center font-medium text-pharmacy-navy">Unit Price</TableHead>
            <TableHead className="text-right font-medium text-pharmacy-navy">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medications.map((medication, index) => {
            // Apply 7% increase to the total
            const increasedTotal = medication.total * 1.07;
            const netAmount = medication.net || calculateNet(medication.total, coveragePercentage);
            
            return (
              <TableRow 
                key={index} 
                className="hover:bg-pharmacy-lightGray transition-colors"
              >
                <TableCell className="text-center">
                  {medication.quantity.toFixed(1)}/{medication.unit}
                </TableCell>
                <TableCell className="text-left">{medication.name}</TableCell>
                <TableCell className="text-center">{medication.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{increasedTotal.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicationTable;
