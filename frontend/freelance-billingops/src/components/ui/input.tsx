import * as React from 'react'

import { cn } from '@/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-9 w-full rounded-[calc(var(--radius)-8px)] border border-white/10 bg-white/5 px-3 text-[13px] text-white placeholder:text-white/45 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f17] disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

