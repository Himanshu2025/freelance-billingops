import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from '@/app/providers/query-provider'
import { ErrorBoundary } from '@/components/feedback/error-boundary'
import { AuthProvider } from '@/app/providers/auth-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
)
