import * as React from 'react'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { FilterBar } from '@/components/shared/filter-bar'
import { PageHeader } from '@/components/shared/page-header'
import { SearchInput } from '@/components/shared/search-input'
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
import { LoadingState } from '@/components/feedback/loading-state'
import { ErrorState } from '@/components/feedback/error-state'
import { EmptyState } from '@/components/shared/empty-state'
import { invoicesService } from '@/services/invoices'
import { mapInvoiceToUi } from '@/features/invoices/invoices-mappers'

function money(v: number) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function InvoicesListPage() {
  const navigate = useNavigate()
  const [q, setQ] = React.useState('')

  const invoicesQuery = useQuery({
    queryKey: ['invoices', 'list'],
    queryFn: () => invoicesService.list(),
    select: (rows) => rows.map(mapInvoiceToUi),
  })

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    const rows = invoicesQuery.data ?? []
    if (!query) return rows
    return rows.filter((i) =>
      [i.invoiceNumber, i.clientName, i.status]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [q, invoicesQuery.data])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Search, review, and manage invoice lifecycle."
        actions={
          <Button size="sm" className="gap-2" onClick={() => navigate('/invoices/new')}>
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        }
      />

      <FilterBar
        left={<SearchInput value={q} onChange={setQ} placeholder="Search invoices…" className="max-w-md w-full" />}
        right={<Button variant="secondary" size="sm">Export</Button>}
      />

      {invoicesQuery.isLoading ? (
        <LoadingState label="Loading invoices…" />
      ) : invoicesQuery.isError ? (
        <ErrorState
          title="Couldn’t load invoices"
          description="Check your session and API base URL, then retry."
          onRetry={() => invoicesQuery.refetch()}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No invoices yet"
          description="Create your first invoice to start tracking cashflow."
          action={
            <Button size="sm" onClick={() => navigate('/invoices/new')}>
              New Invoice
            </Button>
          }
        />
      ) : (
        <TableWrap>
          <Table>
            <THead>
              <TR className="hover:bg-transparent">
                <TH>Invoice</TH>
                <TH>Client</TH>
                <TH>Issue</TH>
                <TH>Due</TH>
                <TH className="text-right">Amount</TH>
                <TH>Status</TH>
                <TH className="w-10" />
              </TR>
            </THead>
            <TBody>
              {filtered.map((inv) => (
                <TR key={inv.id}>
                  <TD className="font-medium text-white">
                    <button
                      className="hover:underline"
                      onClick={() => navigate(`/invoices/${inv.id}`)}
                    >
                      {inv.invoiceNumber}
                    </button>
                    <div className="text-[12px] text-white/55">ID {inv.id}</div>
                  </TD>
                  <TD>{inv.clientName}</TD>
                  <TD>{inv.issueDate}</TD>
                  <TD>{inv.dueDate}</TD>
                  <TD className="text-right font-medium text-white">
                    {money(inv.amount)}
                  </TD>
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
                        <DropdownMenuItem onSelect={() => navigate(`/invoices/${inv.id}`)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => navigate(`/invoices/${inv.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-200">
                          Delete invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </TableWrap>
      )}
    </div>
  )
}

