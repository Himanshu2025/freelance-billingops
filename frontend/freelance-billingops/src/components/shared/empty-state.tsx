import { cn } from '@/utils/cn'

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] px-5 py-10 text-center',
        className,
      )}
    >
      {icon ? (
        <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-white/70">
          {icon}
        </div>
      ) : null}
      <div className="text-sm font-semibold text-white">{title}</div>
      {description ? (
        <div className="max-w-md text-[13px] text-white/60">{description}</div>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}

