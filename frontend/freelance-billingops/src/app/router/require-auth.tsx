import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoadingState } from '@/components/feedback/loading-state'
import { useAuth } from '@/app/providers/auth-provider'

export function RequireAuth() {
  const { isLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingState label="Checking session…" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

