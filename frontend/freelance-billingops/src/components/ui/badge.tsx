import { cn } from '@/utils/cn'

type BadgeVariant =
  | 'default'
  | 'muted'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/8 text-white border-white/10',
  muted: 'bg-white/6 text-white/70 border-white/10',
  accent:
    'bg-[color:color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-[color:color-mix(in_oklab,var(--color-accent)_80%,white)] border-[color:color-mix(in_oklab,var(--color-accent)_25%,transparent)]',
  success: 'bg-emerald-500/12 text-emerald-200 border-emerald-500/20',
  warning: 'bg-amber-500/12 text-amber-200 border-amber-500/20',
  danger: 'bg-red-500/12 text-red-200 border-red-500/20',
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}

