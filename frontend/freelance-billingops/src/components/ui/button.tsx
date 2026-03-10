import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utils/cn'

type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'bg-white/10 text-white hover:bg-white/14 border border-white/10 shadow-sm',
  secondary:
    'bg-white/6 text-white hover:bg-white/10 border border-white/10 shadow-sm',
  ghost: 'bg-transparent text-white hover:bg-white/8',
  danger:
    'bg-red-500/12 text-red-200 hover:bg-red-500/16 border border-red-500/20',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-3.5 text-[13px]',
  lg: 'h-10 px-4 text-sm',
  icon: 'h-9 w-9',
}

export function Button({
  asChild,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[calc(var(--radius)-6px)] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f17] disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
}

