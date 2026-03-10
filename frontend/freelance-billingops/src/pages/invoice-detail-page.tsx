import { ChevronLeft, MoreHorizontal, Pencil } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'

const mock = {
  id: 'inv_1032',
  invoiceNumber: 'INV-1032',
  clientName: 'Northwind Studio',
  status: 'Pending' as const,
  issueDate: '2026-03-02',
  dueDate: '2026-03-16',
  subtotal: 4250,
  tax: 0,
  lineItems: [
    { description: 'Product design sprint', qty: 1, rate: 2500 },
    { description: 'Dashboard implementation', qty: 7, rate: 250 },
  ],
}

function money(v: number) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function InvoiceDetailPage() {
  const { invoiceId } = useParams()
  const navigate = useNavigate()

  // Placeholder until API integration; keyed by route param.
  const invoice = { ...mock, id: invoiceId ?? mock.id }
  const subtotal = invoice.lineItems.reduce((acc, li) => acc + li.qty * li.rate, 0)
  const total = subtotal + invoice.tax

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Back" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-white/10" />
        <div className="text-[13px] text-white/60">Invoices</div>
      </div>

      <PageHeader
        title={invoice.invoiceNumber}
        description={invoice.clientName}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={invoice.status} />
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Invoice actions">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-200">Cancel invoice</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Overview" description="Key dates and totals." className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Issue date
              </div>
              <div className="mt-1 text-[13px] text-white">{invoice.issueDate}</div>
            </div>
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Due date
              </div>
              <div className="mt-1 text-[13px] text-white">{invoice.dueDate}</div>
            </div>
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Total
              </div>
              <div className="mt-1 text-[13px] font-medium text-white">{money(total)}</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Client" description="Billing details.">
          <div className="space-y-2 text-[13px]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Name</div>
              <div className="text-white">{invoice.clientName}</div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Email</div>
              <div className="text-white">billing@northwind.studio</div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Terms</div>
              <div className="text-white">Net 14</div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Line items" description="What you billed for.">
        <TableWrap>
          <Table>
            <THead>
              <TR className="hover:bg-transparent">
                <TH>Description</TH>
                <TH className="text-right">Qty</TH>
                <TH className="text-right">Rate</TH>
                <TH className="text-right">Amount</TH>
              </TR>
            </THead>
            <TBody>
              {invoice.lineItems.map((li) => (
                <TR key={li.description}>
                  <TD className="text-white">{li.description}</TD>
                  <TD className="text-right">{li.qty}</TD>
                  <TD className="text-right">{money(li.rate)}</TD>
                  <TD className="text-right font-medium text-white">
                    {money(li.qty * li.rate)}
                  </TD>
                </TR>
              ))}
              <TR className="hover:bg-transparent">
                <TD colSpan={3} className="text-right text-white/60">
                  Subtotal
                </TD>
                <TD className="text-right font-medium text-white">{money(subtotal)}</TD>
              </TR>
              <TR className="hover:bg-transparent">
                <TD colSpan={3} className="text-right text-white/60">
                  Tax
                </TD>
                <TD className="text-right font-medium text-white">{money(invoice.tax)}</TD>
              </TR>
              <TR className="hover:bg-transparent">
                <TD colSpan={3} className="text-right text-white/60">
                  Total
                </TD>
                <TD className="text-right text-[14px] font-semibold text-white">
                  {money(total)}
                </TD>
              </TR>
            </TBody>
          </Table>
        </TableWrap>
      </SectionCard>
    </div>
  )
}

