import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        const status = error?.status as number | undefined
        if (status && status >= 400 && status < 500) return false
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 15_000,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

