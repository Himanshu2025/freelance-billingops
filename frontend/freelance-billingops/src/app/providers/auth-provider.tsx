import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { authService, type LoginRequest } from '@/services/auth'

type AuthState = {
  isLoading: boolean
  isAuthenticated: boolean
  me: unknown | null
  login: (body: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = React.createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient()

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authService.me(),
    retry: false,
    staleTime: 30_000,
  })

  const loginMutation = useMutation({
    mutationFn: (body: LoginRequest) => authService.login(body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  const value: AuthState = {
    isLoading: meQuery.isLoading,
    isAuthenticated: meQuery.isSuccess,
    me: meQuery.data ?? null,
    login: async (body) => {
      await loginMutation.mutateAsync(body)
    },
    logout: async () => {
      await logoutMutation.mutateAsync()
    },
    refresh: async () => {
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

