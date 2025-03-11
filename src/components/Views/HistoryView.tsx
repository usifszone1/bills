
import React from "react";
import InvoiceHistory from "../InvoiceHistory";
import { Receipt as ReceiptType } from "../../utils/sampleData";

interface HistoryViewProps {
  onSelectReceipt: (receipt: ReceiptType) => void;
  onSelectMultipleReceipts: (receipts: ReceiptType[]) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({
  onSelectReceipt,
  onSelectMultipleReceipts,
}) => {
  return (
    <div className="min-h-[60vh] py-8">
      <div className="container max-w-5xl mx-auto px-4">
        <InvoiceHistory 
          onSelectReceipt={onSelectReceipt}
          onSelectMultipleReceipts={onSelectMultipleReceipts}
        />
      </div>
    </div>
  );
};

export default HistoryView;
