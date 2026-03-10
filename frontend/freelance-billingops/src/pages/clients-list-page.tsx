import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { FilterBar } from '@/components/shared/filter-bar'
import { PageHeader } from '@/components/shared/page-header'
import { SearchInput } from '@/components/shared/search-input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableWrap, TBody, TD, TH, THead, TR } from '@/components/ui/table'

type Client = {
  id: string
  name: string
  email: string
  company: string
  phone: string
  activeProjects: number
  outstandingAmount: number
  status: 'Active' | 'At risk' | 'Inactive'
}

const mockClients: Client[] = [
  {
    id: 'cli_001',
    name: 'Jordan Lee',
    email: 'jordan@northwind.studio',
    company: 'Northwind Studio',
    phone: '+1 (555) 010-1200',
    activeProjects: 2,
    outstandingAmount: 4250,
    status: 'Active',
  },
  {
    id: 'cli_002',
    name: 'Ava Patel',
    email: 'ava@pineco.com',
    company: 'Pine & Co.',
    phone: '+1 (555) 010-4420',
    activeProjects: 1,
    outstandingAmount: 780,
    status: 'At risk',
  },
]

function money(v: number) {
  return v.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

export function ClientsListPage() {
  const navigate = useNavigate()
  const [q, setQ] = React.useState('')

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return mockClients
    return mockClients.filter((c) =>
      [c.name, c.email, c.company, c.status].join(' ').toLowerCase().includes(query),
    )
  }, [q])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Track client health, outstanding balances, and engagement."
        actions={<Button size="sm">New client</Button>}
      />

      <FilterBar
        left={<SearchInput value={q} onChange={setQ} placeholder="Search clients…" className="max-w-md w-full" />}
        right={<Button variant="secondary" size="sm">Segments</Button>}
      />

      <TableWrap>
        <Table>
          <THead>
            <TR className="hover:bg-transparent">
              <TH>Client</TH>
              <TH>Company</TH>
              <TH>Projects</TH>
              <TH className="text-right">Outstanding</TH>
              <TH>Status</TH>
              <TH className="w-10" />
            </TR>
          </THead>
          <TBody>
            {filtered.map((c) => (
              <TR key={c.id}>
                <TD className="font-medium text-white">
                  <button className="hover:underline" onClick={() => navigate(`/clients/${c.id}`)}>
                    {c.name}
                  </button>
                  <div className="text-[12px] text-white/55">{c.email}</div>
                </TD>
                <TD>{c.company}</TD>
                <TD>{c.activeProjects}</TD>
                <TD className="text-right font-medium text-white">{money(c.outstandingAmount)}</TD>
                <TD>
                  <Badge variant={c.status === 'Active' ? 'success' : c.status === 'At risk' ? 'warning' : 'muted'}>
                    {c.status}
                  </Badge>
                </TD>
                <TD className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Row actions">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => navigate(`/clients/${c.id}`)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </TableWrap>
    </div>
  )
}

