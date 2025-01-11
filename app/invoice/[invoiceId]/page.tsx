/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { deleteInvoice, getInvoiceById, updateInvoice } from '@/app/actions';
import InvoiceInfo from '@/app/components/InvoiceInfo';
import InvoiceLines from '@/app/components/InvoiceLines';
import InvoicePDF from '@/app/components/InvoicePDF';
import VATControl from '@/app/components/VATControl';
import Wrapper from '@/app/components/Wrapper';
import { Invoice, Totals } from '@/type';
import { Save, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = ({ params }: { params: Promise<{ invoiceId: string }> }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [initialInvoice, setInitialInvoice] = useState<Invoice | null>(null);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchInvoice = async () => {
    try {
      const { invoiceId } = await params;
      const fetchedInvoice = await getInvoiceById(invoiceId);
      if (fetchedInvoice) {
        setInvoice(fetchedInvoice);
        setInitialInvoice(fetchedInvoice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    if (!invoice) return;
    const ht = invoice.lines.reduce(
      (acc, { quantity, unitPrice }) => acc + quantity * unitPrice,
      0,
    );
    const vat = invoice.vatActive ? ht * (invoice.vatRate / 100) : 0;
    setTotals({ totalHT: ht, totalVAT: vat, totalTTC: ht + vat });
  }, [invoice]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(e.target.value);
    if (invoice) {
      const updatedInvoice = { ...invoice, status: newStatus };
      setInvoice(updatedInvoice);
    }
  };

  useEffect(() => {
    setIsSaveDisabled(
      JSON.stringify(invoice) === JSON.stringify(initialInvoice),
    );
  }, [invoice, initialInvoice]);

  const handleSave = async () => {
    if (!invoice) return;
    setIsLoading(true);
    try {
      await updateInvoice(invoice);
      const updatedInvoice = await getInvoiceById(invoice.id);
      if (updatedInvoice) {
        setInvoice(updatedInvoice);
        setInitialInvoice(updatedInvoice);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la facture :', error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cette facture ?',
    );

    if (confirmed) {
      try {
        await deleteInvoice(invoice?.id as string);
        router.push('/');
      } catch (error) {
        console.error('Erreur lors de la suppression de la facture.', error);
      }
    }
  };

  if (!invoice || !totals)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="font-bold">Facture Non Trouvée</span>
      </div>
    );

  return (
    <Wrapper>
      <div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="badge badge-ghost badge-lg uppercase">
            <span>Facture-</span>
            {invoice?.id}
          </p>
          <div className="mt-4 flex md:mt-0">
            <select
              className="select select-bordered select-sm w-full"
              value={invoice?.status}
              onChange={handleStatusChange}
            >
              <option value={1}>Brouillon</option>
              <option value={2}>En attente</option>
              <option value={3}>Payée</option>
              <option value={4}>Annulée</option>
              <option value={5}>Impayée</option>
            </select>

            <button
              className="btn btn-accent btn-sm ml-4"
              disabled={isSaveDisabled || isLoading}
              onClick={handleSave}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Sauvegarder
                  <Save className="ml-2 w-4" />
                </>
              )}
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-accent btn-sm ml-4"
            >
              <Trash className="w-4" />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full flex-col md:w-1/3">
            <div className="mb-4 rounded-xl bg-base-200 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="badge badge-accent">Résumé des Totaux</div>
                <VATControl invoice={invoice} setInvoice={setInvoice} />
              </div>

              <div className="flex justify-between">
                <span>Total Hors Taxes</span>
                <span> {totals.totalHT.toFixed(2)} xof</span>
              </div>

              <div className="flex justify-between">
                <span>
                  TVA ({invoice?.vatActive ? `${invoice?.vatRate}` : '0'} %)
                </span>
                <span> {totals.totalVAT.toFixed(2)}xof </span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Total TTC</span>
                <span> {totals.totalTTC.toFixed(2)}xof</span>
              </div>
            </div>

            <InvoiceInfo invoice={invoice} setInvoice={setInvoice} />
          </div>

          <div className="flex w-full flex-col md:ml-4 md:w-2/3">
            <InvoiceLines invoice={invoice} setInvoice={setInvoice} />
            <InvoicePDF invoice={invoice} totals={totals} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;