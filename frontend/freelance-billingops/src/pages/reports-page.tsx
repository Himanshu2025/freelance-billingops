import { ArrowUpRight } from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const reports = [
  { title: 'Revenue (30d)', metric: '$12,980', dateRange: 'Last 30 days' },
  { title: 'Outstanding', metric: '$7,430', dateRange: 'Current' },
  { title: 'Average time to pay', metric: '9.4 days', dateRange: 'Last 90 days' },
]

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="High-signal metrics for invoicing and cashflow."
        actions={<Button size="sm" variant="secondary">Create report</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <SectionCard
            key={r.title}
            title={r.title}
            description={r.dateRange}
            actions={
              <Badge variant="muted" className="gap-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                View
              </Badge>
            }
          >
            <div className="text-2xl font-semibold tracking-tight text-white">
              {r.metric}
            </div>
            <div className="mt-1 text-[13px] text-white/60">
              API-ready. This card will map to backend report endpoints.
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}

