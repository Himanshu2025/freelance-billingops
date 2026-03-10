import { cn } from '@/utils/cn'

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('text-[12px] font-medium text-white/70', className)}
      {...props}
    />
  )
}

export function HelpText({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-[12px] text-white/50', className)} {...props} />
  )
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between gap-4">
        <Label>{label}</Label>
        {hint ? <HelpText className="text-right">{hint}</HelpText> : null}
      </div>
      {children}
    </div>
  )
}

