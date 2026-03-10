import { NavLink } from 'react-router-dom'
import { Menu, ReceiptText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { primaryNav } from '@/lib/nav'
import { cn } from '@/utils/cn'

export function MobileNav() {
  return (
    <Sheet>
      <Button variant="ghost" size="icon" asChild>
        <SheetTrigger aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
      </Button>
      <SheetContent side="left" className="w-[min(320px,calc(100vw-24px))]">
        <SheetHeader className="border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-[calc(var(--radius)-6px)] bg-white/6 text-white">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <SheetTitle>Freelance BillingOps</SheetTitle>
              <div className="text-[11px] text-white/55">Operations dashboard</div>
            </div>
          </div>
        </SheetHeader>
        <div className="p-3">
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

