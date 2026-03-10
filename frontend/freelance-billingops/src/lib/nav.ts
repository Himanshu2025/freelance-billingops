import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type NavItem = {
  label: string
  to: string
  icon: ComponentType<{ className?: string }>
}

export const primaryNav: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Invoices', to: '/invoices', icon: FileText },
  { label: 'Clients', to: '/clients', icon: Users },
  { label: 'Payments', to: '/payments', icon: CreditCard },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
  { label: 'Settings', to: '/settings', icon: Settings },
]

