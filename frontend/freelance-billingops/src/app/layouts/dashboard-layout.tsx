import { Outlet, useNavigate } from 'react-router-dom'
import * as React from 'react'

import { SidebarNav } from '@/components/navigation/sidebar-nav'
import { Topbar } from '@/components/navigation/topbar'

export function DashboardLayout() {
  const [search, setSearch] = React.useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0b0f17]">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            search={search}
            onSearchChange={setSearch}
            onNewInvoice={() => navigate('/invoices/new')}
          />
          <main className="flex-1 px-4 py-6">
            <div className="mx-auto w-full max-w-[1120px]">
              <Outlet context={{ globalSearch: search }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

