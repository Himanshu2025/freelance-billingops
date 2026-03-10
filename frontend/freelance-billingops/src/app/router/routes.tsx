import type { RouteObject } from 'react-router-dom'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { DashboardLayout } from '@/app/layouts/dashboard-layout'
import { RequireAuth } from '@/app/router/require-auth'
import { LoginPage } from '@/pages/login-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { InvoicesListPage } from '@/pages/invoices-list-page'
import { InvoiceDetailPage } from '@/pages/invoice-detail-page'
import { InvoiceUpsertPage } from '@/pages/invoice-upsert-page'
import { ClientsListPage } from '@/pages/clients-list-page'
import { ClientDetailPage } from '@/pages/client-detail-page'
import { PaymentsPage } from '@/pages/payments-page'
import { ReportsPage } from '@/pages/reports-page'
import { SettingsPage } from '@/pages/settings-page'
import { NotFoundPage } from '@/pages/not-found-page'

export const routes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'invoices', element: <InvoicesListPage /> },
          { path: 'invoices/new', element: <InvoiceUpsertPage mode="create" /> },
          { path: 'invoices/:invoiceId', element: <InvoiceDetailPage /> },
          {
            path: 'invoices/:invoiceId/edit',
            element: <InvoiceUpsertPage mode="edit" />,
          },
          { path: 'clients', element: <ClientsListPage /> },
          { path: 'clients/:clientId', element: <ClientDetailPage /> },
          { path: 'payments', element: <PaymentsPage /> },
          { path: 'reports', element: <ReportsPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]

