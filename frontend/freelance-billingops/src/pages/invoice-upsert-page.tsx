import * as React from 'react'
import { ChevronLeft, Save, Send } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, HelpText } from '@/components/forms/field'

export function InvoiceUpsertPage({ mode }: { mode: 'create' | 'edit' }) {
  const navigate = useNavigate()
  const { invoiceId } = useParams()

  const [form, setForm] = React.useState({
    invoiceNumber: mode === 'edit' ? 'INV-1032' : 'INV-1033',
    clientName: mode === 'edit' ? 'Northwind Studio' : '',
    issueDate: '2026-03-10',
    dueDate: '2026-03-24',
    tax: '0',
  })

  const title = mode === 'create' ? 'New invoice' : 'Edit invoice'
  const description =
    mode === 'create'
      ? 'Draft a new invoice using your standard structure.'
      : `Update details for ${invoiceId ?? 'this invoice'}.`

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
        title={title}
        description={description}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save draft
            </Button>
            <Button size="sm" className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Invoice details"
          description="Number, dates, and client information."
          className="lg:col-span-2"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Invoice number" hint="Editable">
              <Input
                value={form.invoiceNumber}
                onChange={(e) =>
                  setForm((s) => ({ ...s, invoiceNumber: e.target.value }))
                }
              />
            </Field>
            <Field label="Client name">
              <Input
                placeholder="Acme Ventures"
                value={form.clientName}
                onChange={(e) =>
                  setForm((s) => ({ ...s, clientName: e.target.value }))
                }
              />
            </Field>
            <Field label="Issue date">
              <Input
                type="date"
                value={form.issueDate}
                onChange={(e) => setForm((s) => ({ ...s, issueDate: e.target.value }))}
              />
            </Field>
            <Field label="Due date" hint="Net terms">
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((s) => ({ ...s, dueDate: e.target.value }))}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Totals" description="Calculated from line items.">
          <div className="space-y-3">
            <Field label="Tax (USD)">
              <Input
                inputMode="decimal"
                value={form.tax}
                onChange={(e) => setForm((s) => ({ ...s, tax: e.target.value }))}
              />
            </Field>
            <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
                Preview
              </div>
              <div className="mt-2 space-y-1 text-[13px]">
                <div className="flex items-center justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Tax</span>
                  <span>${Number(form.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between font-medium text-white">
                  <span>Total</span>
                  <span>${Number(form.tax || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <HelpText>
              Line items and calculations will be wired up to backend models next.
            </HelpText>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Line items" description="Add billable work, quantities, and rates.">
        <div className="rounded-[calc(var(--radius)-6px)] border border-dashed border-white/15 bg-white/[0.02] p-4 text-[13px] text-white/60">
          Line items editor coming next (inline table + drawer for advanced fields).
        </div>
      </SectionCard>
    </div>
  )
}

