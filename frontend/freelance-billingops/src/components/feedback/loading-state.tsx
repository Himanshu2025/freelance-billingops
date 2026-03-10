import { Loader2 } from 'lucide-react'

import { cn } from '@/utils/cn'

export function LoadingState({
  label = 'Loading…',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] px-4 py-10 text-[13px] text-white/70',
        className,
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  )
}

