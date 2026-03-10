import * as React from 'react'

import { PageHeader } from '@/components/shared/page-header'
import { SectionCard } from '@/components/shared/section-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/forms/field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SettingsPage() {
  const [profile, setProfile] = React.useState({
    name: 'Himanshu Kulkarni',
    email: 'himanshu@billingops.dev',
    company: 'BillingOps',
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Profile, company defaults, and notification preferences."
        actions={<Button size="sm">Save changes</Button>}
      />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SectionCard title="Profile" description="Update your personal details.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile((s) => ({ ...s, name: e.target.value }))}
                />
              </Field>
              <Field label="Email">
                <Input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </Field>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="company">
          <SectionCard title="Company" description="Defaults used for invoices.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company name">
                <Input
                  value={profile.company}
                  onChange={(e) =>
                    setProfile((s) => ({ ...s, company: e.target.value }))
                  }
                />
              </Field>
              <Field label="Support email">
                <Input placeholder="support@company.com" />
              </Field>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="billing">
          <SectionCard title="Billing preferences" description="Tax, currency, and payment methods.">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Default currency">
                <Input defaultValue="USD" />
              </Field>
              <Field label="Default tax rate">
                <Input defaultValue="0%" />
              </Field>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SectionCard title="Notifications" description="Stay on top of due dates and payments.">
            <div className="space-y-3 text-[13px] text-white/70">
              <div className="flex items-center justify-between gap-4 rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <div className="font-medium text-white">Invoice due reminders</div>
                  <div className="text-white/55">Get notified before invoices become overdue.</div>
                </div>
                <Button size="sm" variant="secondary">Enabled</Button>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
                <div>
                  <div className="font-medium text-white">Payment received</div>
                  <div className="text-white/55">Alerts when a payment is posted.</div>
                </div>
                <Button size="sm" variant="secondary">Enabled</Button>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

