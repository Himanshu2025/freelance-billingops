import type { InvoiceResponse } from '@/services/invoices'
import type { InvoiceStatus } from '@/components/shared/status-badge'

export type UiInvoice = {
  id: number
  invoiceNumber: string
  clientName: string
  issueDate: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

function coerceStatus(s?: string | null): InvoiceStatus {
  const v = (s ?? '').toLowerCase()
  if (v === 'paid') return 'Paid'
  if (v === 'pending') return 'Pending'
  if (v === 'overdue') return 'Overdue'
  if (v === 'cancelled' || v === 'canceled') return 'Cancelled'
  if (v === 'draft') return 'Draft'
  // Backend currently returns string; default to Pending for safer UX.
  return 'Pending'
}

export function mapInvoiceToUi(inv: InvoiceResponse): UiInvoice {
  return {
    id: inv.id,
    invoiceNumber: inv.invoiceNumber ?? `INV-${inv.id}`,
    clientName: inv.clientName ?? 'Unknown client',
    issueDate: inv.issueDate?.slice(0, 10) ?? '',
    dueDate: inv.dueDate?.slice(0, 10) ?? '',
    amount: inv.amount ?? 0,
    status: coerceStatus(inv.status),
  }
}

