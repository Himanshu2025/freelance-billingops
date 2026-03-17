import { Link, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { useInvoice } from '../hooks/useInvoices';
import { downloadInvoicePdf } from '../api/invoices';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function InvoiceDetailsPage() {
  const { id } = useParams();
  const invoiceId = Number(id);
  const { data: invoice, isLoading, isError } = useInvoice(invoiceId);

  const handleDownloadPdf = async () => {
    if (!invoice) return;
    const pdfBlob = await downloadInvoicePdf(invoice.id);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber || `invoice-${invoice.id}`}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (!Number.isFinite(invoiceId) || invoiceId <= 0) {
    return (
      <Card>
        <p className="text-sm text-red-500">Invalid invoice id.</p>
        <div className="mt-4">
          <Link to="/invoices">
            <Button variant="secondary">Back to invoices</Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return <p className="py-8 text-center text-sm text-gray-400">Loading invoice…</p>;
  }

  if (isError || !invoice) {
    return (
      <Card>
        <p className="text-sm text-red-500">Failed to load invoice.</p>
        <div className="mt-4">
          <Link to="/invoices">
            <Button variant="secondary">Back to invoices</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Invoice {invoice.invoiceNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">Client: {invoice.clientName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => void handleDownloadPdf()}>
            Download PDF
          </Button>
          <Link to="/invoices">
            <Button variant="secondary">Back</Button>
          </Link>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Status</p>
            <div className="mt-2">
              <StatusBadge status={invoice.status} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Amount</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">{formatCurrency(invoice.amount)}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Issue Date</p>
            <p className="mt-1 text-sm text-gray-700">{formatDate(invoice.issueDate)}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Due Date</p>
            <p className="mt-1 text-sm text-gray-700">{formatDate(invoice.dueDate)}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Client Email</p>
            <p className="mt-1 text-sm text-gray-700">{invoice.clientEmail}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Description</p>
            <p className="mt-1 text-sm text-gray-700">{invoice.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
