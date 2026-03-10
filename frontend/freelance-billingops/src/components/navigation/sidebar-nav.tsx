import { NavLink } from 'react-router-dom'
import { ReceiptText } from 'lucide-react'

import { primaryNav } from '@/lib/nav'
import { cn } from '@/utils/cn'

export function SidebarNav() {
  return (
    <aside className="hidden h-full w-64 flex-col border-r border-white/10 bg-[#0b0f17] md:flex">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-[calc(var(--radius)-6px)] bg-white/6 text-white">
          <ReceiptText className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-white">
            Freelance BillingOps
          </div>
          <div className="text-[11px] text-white/55">Operations dashboard</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-3">
        <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/45">
          Workspace
        </div>
        <div className="space-y-1">
          {primaryNav.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-2 rounded-[calc(var(--radius)-8px)] px-2.5 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/6 hover:text-white',
                    isActive && 'bg-white/8 text-white',
                  )
                }
              >
                <Icon className="h-4 w-4 text-white/55 group-hover:text-white/80" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>

      <div className="p-3">
        <div className="rounded-[calc(var(--radius)-6px)] border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[13px] font-semibold text-white">Tip</div>
          <div className="mt-1 text-[12px] text-white/60">
            Keep invoices consistent—templates reduce late payments.
          </div>
        </div>
      </div>
    </aside>
  )
}

