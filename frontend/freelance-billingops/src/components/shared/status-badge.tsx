import { Badge } from '@/components/ui/badge'

export type InvoiceStatus =
  | 'Draft'
  | 'Pending'
  | 'Paid'
  | 'Overdue'
  | 'Cancelled'

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  const variant =
    status === 'Paid'
      ? 'success'
      : status === 'Pending'
        ? 'accent'
        : status === 'Overdue'
          ? 'warning'
          : status === 'Cancelled'
            ? 'danger'
            : 'muted'

  return <Badge variant={variant}>{status}</Badge>
}

