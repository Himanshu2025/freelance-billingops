import { MoreHorizontal } from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'

const payments = [
  {
    id: 'pay_551',
    invoiceNumber: 'INV-1031',
    clientName: 'Helio Labs',
    amount: 1430,
    paymentDate: '2026-03-01',
    method: 'ACH',
    status: 'Completed',
  },
  {
    id: 'pay_547',
    invoiceNumber: 'INV-1029',
    clientName: 'Acme Ventures',
    amount: 1980,
    paymentDate: '2026-02-22',
    method: 'Card',
    status: 'Completed',
  },
]

function money(v: number) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Track incoming payments and reconcile invoice status."
        actions={<Button size="sm" variant="secondary">Sync</Button>}
      />

      <SectionCard title="Recent payments" description="Latest successful and pending transactions.">
        <TableWrap>
          <Table>
            <THead>
              <TR className="hover:bg-transparent">
                <TH>Payment</TH>
                <TH>Client</TH>
                <TH>Date</TH>
                <TH>Method</TH>
                <TH className="text-right">Amount</TH>
                <TH>Status</TH>
                <TH className="w-10" />
              </TR>
            </THead>
            <TBody>
              {payments.map((p) => (
                <TR key={p.id}>
                  <TD className="font-medium text-white">
                    {p.invoiceNumber}
                    <div className="text-[12px] text-white/55">{p.id}</div>
                  </TD>
                  <TD>{p.clientName}</TD>
                  <TD>{p.paymentDate}</TD>
                  <TD>{p.method}</TD>
                  <TD className="text-right font-medium text-white">{money(p.amount)}</TD>
                  <TD>
                    <Badge variant="success">{p.status}</Badge>
                  </TD>
                  <TD className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Row actions">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View payment</DropdownMenuItem>
                        <DropdownMenuItem>Open invoice</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TableWrap>
      </SectionCard>
    </div>
  )
}

