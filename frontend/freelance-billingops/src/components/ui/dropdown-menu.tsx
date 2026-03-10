import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight } from 'lucide-react'

import { cn } from '@/utils/cn'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-44 overflow-hidden rounded-[calc(var(--radius)-8px)] border border-white/10 bg-[#0f1523]/95 p-1 text-white shadow-xl backdrop-blur',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[calc(var(--radius)-10px)] px-2 py-1.5 text-[13px] outline-none transition-colors focus:bg-white/8 data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
      className,
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[calc(var(--radius)-10px)] py-1.5 pl-8 pr-2 text-[13px] outline-none transition-colors focus:bg-white/8 data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('my-1 h-px bg-white/10', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-[calc(var(--radius)-10px)] px-2 py-1.5 text-[13px] outline-none focus:bg-white/8 data-[state=open]:bg-white/8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4 text-white/60" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 min-w-44 overflow-hidden rounded-[calc(var(--radius)-8px)] border border-white/10 bg-[#0f1523]/95 p-1 text-white shadow-xl backdrop-blur',
      className,
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

