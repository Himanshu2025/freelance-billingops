import { ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { StatCard } from '@/components/shared/stat-card'
import { Button } from '@/components/ui/button'

export function ClientDetailPage() {
  const navigate = useNavigate()
  const { clientId } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Back" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-white/10" />
        <div className="text-[13px] text-white/60">Clients</div>
      </div>

      <PageHeader
        title="Northwind Studio"
        description={`Client ID: ${clientId ?? 'cli_001'}`}
        actions={<Button size="sm" variant="secondary">New invoice</Button>}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="Outstanding" value="$4,250" hint="1 invoice pending" />
        <StatCard label="Active projects" value="2" hint="Retainer + sprint" />
        <StatCard label="Health" value="Good" hint="On-time payer" trend={{ label: 'Stable', tone: 'muted' }} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Contact" description="Primary billing contact." className="lg:col-span-1">
          <div className="space-y-2 text-[13px]">
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Name</div>
              <div className="text-white">Jordan Lee</div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Email</div>
              <div className="text-white">billing@northwind.studio</div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-white/60">Phone</div>
              <div className="text-white">+1 (555) 010-1200</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Billing" description="Terms and preferences." className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Terms
              </div>
              <div className="mt-1 text-[13px] text-white">Net 14</div>
            </div>
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Currency
              </div>
              <div className="mt-1 text-[13px] text-white">USD</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

