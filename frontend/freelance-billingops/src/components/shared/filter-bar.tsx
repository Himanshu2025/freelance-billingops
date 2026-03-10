import * as React from 'react'
import { SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export function FilterBar({
  left,
  right,
  className,
}: {
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {left}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        {right}
      </div>
    </div>
  )
}

