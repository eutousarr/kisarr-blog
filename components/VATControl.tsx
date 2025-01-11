import { Invoice } from '@/type';
import React from 'react';

interface Props {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const VATControl: React.FC<Props> = ({ invoice, setInvoice }) => {
  const handleVatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({
      ...invoice,
      vatActive: e.target.checked,
      vatRate: e.target.checked ? invoice.vatRate : 0,
    });
  };

  const handleVatRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice({
      ...invoice,
      vatRate: parseFloat(e.target.value),
    });
  };

  return (
    <div className="flex items-center">
      <label className="block text-sm font-bold">TVA (%)</label>
      <input
        type="checkbox"
        className="toggle toggle-sm ml-2"
        onChange={handleVatChange}
        checked={invoice.vatActive}
      />
      {invoice.vatActive && (
        <input
          type="number"
          value={invoice.vatRate}
          className="input input-sm input-bordered ml-2 w-16"
          onChange={handleVatRateChange}
          min={0}
        />
      )}
    </div>
  );
};

export default VATControl;