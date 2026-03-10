import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] px-5 py-10 text-center',
        className,
      )}
    >
      <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-white/70">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold text-white">{title}</div>
      {description ? (
        <div className="max-w-md text-[13px] text-white/60">{description}</div>
      ) : null}
      {onRetry ? (
        <div className="mt-2">
          <Button size="sm" variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  )
}

