import { Bell, Plus, UserCircle2 } from 'lucide-react'

import { MobileNav } from '@/components/navigation/mobile-nav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/shared/search-input'

export function Topbar({
  search,
  onSearchChange,
  onNewInvoice,
}: {
  search: string
  onSearchChange: (v: string) => void
  onNewInvoice?: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0f17]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4">
        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="flex flex-1 items-center gap-3">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search invoices, clients, payments…"
            className="max-w-[520px] flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          {onNewInvoice ? (
            <Button size="sm" className="hidden gap-2 md:inline-flex" onClick={onNewInvoice}>
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          ) : null}

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="User menu">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <div className="text-[13px] font-semibold">Himanshu</div>
                <div className="text-[12px] text-white/60">himanshu@billingops.dev</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Company</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-200">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

