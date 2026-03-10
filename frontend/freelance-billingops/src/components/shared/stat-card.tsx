import { Card } from '@/components/ui/card'
import { cn } from '@/utils/cn'

export function StatCard({
  label,
  value,
  hint,
  className,
  trend,
}: {
  label: string
  value: string
  hint?: string
  trend?: { label: string; tone?: 'muted' | 'positive' | 'negative' }
  className?: string
}) {
  const tone =
    trend?.tone === 'positive'
      ? 'text-emerald-200'
      : trend?.tone === 'negative'
        ? 'text-red-200'
        : 'text-white/60'

  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-white/55">
            {label}
          </div>
          <div className="mt-2 text-xl font-semibold tracking-tight text-white">
            {value}
          </div>
          {hint ? <div className="mt-1 text-[13px] text-white/55">{hint}</div> : null}
        </div>
        {trend ? (
          <div className={cn('mt-0.5 text-[12px] font-medium', tone)}>
            {trend.label}
          </div>
        ) : null}
      </div>
    </Card>
  )
}

