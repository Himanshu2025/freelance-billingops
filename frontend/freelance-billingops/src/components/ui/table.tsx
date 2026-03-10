import { cn } from '@/utils/cn'

export function TableWrap({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white/[0.03]',
        className,
      )}
      {...props}
    />
  )
}

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn('w-full border-collapse text-left', className)}
      {...props}
    />
  )
}

export function THead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-white/[0.03]', className)} {...props} />
}

export function TH({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/55',
        className,
      )}
      {...props}
    />
  )
}

export function TBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('', className)} {...props} />
}

export function TR({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-t border-white/8 hover:bg-white/[0.03]',
        className,
      )}
      {...props}
    />
  )
}

export function TD({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3 text-[13px] text-white/85', className)}
      {...props}
    />
  )
}

