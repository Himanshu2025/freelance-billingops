import { MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PageHeader } from '@/components/shared/page-header'
import { StatCard } from '@/components/shared/stat-card'
import { SectionCard } from '@/components/shared/section-card'
import { StatusBadge, type InvoiceStatus } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'

type InvoiceRow = {
  id: string
  invoiceNumber: string
  clientName: string
  issueDate: string
  dueDate: string
  amount: string
  status: InvoiceStatus
}

const recentInvoices: InvoiceRow[] = [
  {
    id: 'inv_1032',
    invoiceNumber: 'INV-1032',
    clientName: 'Northwind Studio',
    issueDate: '2026-03-02',
    dueDate: '2026-03-16',
    amount: '$4,250.00',
    status: 'Pending',
  },
  {
    id: 'inv_1029',
    invoiceNumber: 'INV-1029',
    clientName: 'Acme Ventures',
    issueDate: '2026-02-18',
    dueDate: '2026-03-03',
    amount: '$1,980.00',
    status: 'Paid',
  },
  {
    id: 'inv_1027',
    invoiceNumber: 'INV-1027',
    clientName: 'Pine & Co.',
    issueDate: '2026-02-12',
    dueDate: '2026-02-26',
    amount: '$780.00',
    status: 'Overdue',
  },
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Cashflow, outstanding invoices, and client health at a glance."
        actions={
          <Button size="sm" onClick={() => navigate('/invoices/new')}>
            New Invoice
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Outstanding"
          value="$7,430"
          hint="Across 6 invoices"
          trend={{ label: '+8.1% vs last month', tone: 'muted' }}
        />
        <StatCard
          label="Paid (30d)"
          value="$12,980"
          hint="9 payments received"
          trend={{ label: '+12.4%', tone: 'positive' }}
        />
        <StatCard
          label="Overdue"
          value="$1,240"
          hint="2 invoices past due"
          trend={{ label: '-4.0%', tone: 'positive' }}
        />
        <StatCard
          label="Active clients"
          value="14"
          hint="3 at risk"
          trend={{ label: '2 new this month', tone: 'muted' }}
        />
      </div>

      <SectionCard
        title="Recent invoices"
        description="The latest activity and upcoming due dates."
        actions={
          <Button variant="secondary" size="sm" onClick={() => navigate('/invoices')}>
            View all
          </Button>
        }
      >
        <TableWrap>
          <Table>
            <THead>
              <TR className="hover:bg-transparent">
                <TH>Invoice</TH>
                <TH>Client</TH>
                <TH>Due</TH>
                <TH className="text-right">Amount</TH>
                <TH>Status</TH>
                <TH className="w-10" />
              </TR>
            </THead>
            <TBody>
              {recentInvoices.map((inv) => (
                <TR key={inv.id}>
                  <TD className="font-medium text-white">
                    <button
                      className="hover:underline"
                      onClick={() => navigate(`/invoices/${inv.id}`)}
                    >
                      {inv.invoiceNumber}
                    </button>
                    <div className="text-[12px] text-white/55">{inv.issueDate}</div>
                  </TD>
                  <TD>{inv.clientName}</TD>
                  <TD>{inv.dueDate}</TD>
                  <TD className="text-right font-medium text-white">{inv.amount}</TD>
                  <TD>
                    <StatusBadge status={inv.status} />
                  </TD>
                  <TD className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Row actions">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => navigate(`/invoices/${inv.id}`)}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => navigate(`/invoices/${inv.id}/edit`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-200">
                          Cancel invoice
                        </DropdownMenuItem>
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

