import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/utils/cn'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'right' | 'left'
  }
>(({ className, children, side = 'right', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 h-[calc(100vh-24px)] w-[min(420px,calc(100vw-24px))] rounded-[var(--radius)] border border-white/10 bg-[#0f1523] text-white shadow-2xl',
        side === 'right'
          ? 'right-3 top-3'
          : 'left-3 top-3',
        className,
      )}
      {...props}
    >
      <div className="absolute right-3 top-3">
        <DialogPrimitive.Close
          className="inline-flex h-8 w-8 items-center justify-center rounded-[calc(var(--radius)-8px)] text-white/70 hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f17]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </div>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pr-12', className)} {...props} />
}

export function SheetTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  )
}

export function SheetDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <DialogPrimitive.Description
      className={cn('mt-1 text-[13px] text-white/60', className)}
      {...props}
    />
  )
}

export function SheetBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pb-5', className)} {...props} />
}

