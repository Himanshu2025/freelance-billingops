import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { downloadInvoicePdf } from '../api/invoices';
import { useCreateInvoice, useInvoices } from '../hooks/useInvoices';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { CreateInvoiceRequest } from '../types/invoice';

export default function InvoicesPage() {
  const { data: invoices, isLoading, isError } = useInvoices();
  const { mutateAsync: createInvoice, isPending: isCreating, error: createError } = useCreateInvoice();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateInvoiceRequest>({
    clientName: '',
    clientEmail: '',
    description: '',
    amount: 0,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'Draft',
  });

  const handleCreateInvoice = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createInvoice({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      clientName: '',
      clientEmail: '',
      description: '',
      amount: 0,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      status: 'Draft',
    });
    setShowCreateForm(false);
  };

  const handleDownloadPdf = async (invoiceId: number, invoiceNumber: string) => {
    try {
      setDownloadingId(invoiceId);
      const pdfBlob = await downloadInvoicePdf(invoiceId);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${invoiceNumber || `invoice-${invoiceId}`}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{invoices?.length ?? 0} invoices total</p>
        <Button size="sm" onClick={() => setShowCreateForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          {showCreateForm ? 'Close' : 'New Invoice'}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <h2 className="mb-4 text-base font-semibold text-gray-900">Create Invoice</h2>
          <form onSubmit={handleCreateInvoice} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Client Name</label>
              <input
                required
                className="input w-full"
                value={form.clientName}
                onChange={(e) => setForm((prev) => ({ ...prev, clientName: e.target.value }))}
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Client Email</label>
              <input
                required
                type="email"
                className="input w-full"
                value={form.clientEmail}
                onChange={(e) => setForm((prev) => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="billing@acme.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <input
                required
                className="input w-full"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Website redesign - phase 1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
              <input
                required
                min={0.01}
                step="0.01"
                type="number"
                className="input w-full"
                value={form.amount || ''}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    amount: e.target.value === '' ? 0 : Number(e.target.value),
                  }))
                }
                placeholder="2500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Due Date</label>
              <input
                required
                type="date"
                className="input w-full"
                value={form.dueDate}
                onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                className="input w-full"
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Invoice'}
              </Button>
            </div>
          </form>
          {createError && (
            <p className="mt-3 text-sm text-red-500">
              Failed to create invoice. Please check your details and try again.
            </p>
          )}
        </Card>
      )}

      <Card>
        {isLoading && <p className="py-8 text-center text-sm text-gray-400">Loading invoices…</p>}
        {isError && <p className="py-8 text-center text-sm text-red-500">Failed to load invoices.</p>}
        {invoices && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase text-gray-400">
                  <th className="pb-3 pr-4">Invoice #</th>
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Issue Date</th>
                  <th className="pb-3 pr-4">Due Date</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-indigo-600">
                      <Link to={`/invoices/${inv.id}`}>{inv.invoiceNumber}</Link>
                    </td>
                    <td className="py-3 pr-4 text-gray-700">{inv.clientName}</td>
                    <td className="py-3 pr-4 text-gray-500">{formatDate(inv.issueDate)}</td>
                    <td className="py-3 pr-4 text-gray-500">{formatDate(inv.dueDate)}</td>
                    <td className="py-3 pr-4 font-medium text-gray-900">{formatCurrency(inv.amount)}</td>
                    <td className="py-3">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={downloadingId === inv.id}
                        onClick={() => void handleDownloadPdf(inv.id, inv.invoiceNumber)}
                      >
                        {downloadingId === inv.id ? 'Generating...' : 'Download'}
                      </Button>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400">
                      No invoices yet. Create your first one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
