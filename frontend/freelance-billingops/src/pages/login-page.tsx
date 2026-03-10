import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReceiptText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/forms/field'
import { useAuth } from '@/app/providers/auth-provider'
import type { ApiError } from '@/services/http'

type LoginLocationState = {
  from?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as { state: LoginLocationState | null }
  const { login, refresh } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[calc(var(--radius)-6px)] bg-white/6 text-white">
          <ReceiptText className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">
            Freelance BillingOps
          </div>
          <div className="text-[13px] text-white/60">
            Sign in to your workspace
          </div>
        </div>
      </div>

      <Card className="p-5">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            setIsSubmitting(true)
            try {
              await login({ email, password })
              await refresh()
              const from = location.state?.from
              navigate(from ?? '/dashboard', { replace: true })
            } catch (e: unknown) {
              const err = e as ApiError
              setError(err.message || 'Login failed')
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <Field label="Email">
            <Input
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <Input
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error ? (
            <div className="rounded-[calc(var(--radius)-8px)] border border-red-500/20 bg-red-500/10 px-3 py-2 text-[12px] text-red-200">
              {error}
            </div>
          ) : null}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
          <div className="text-center text-[12px] text-white/50">
            Uses `POST /api/auth/login` and cookie-based session (`/api/auth/me`).
          </div>
        </form>
      </Card>
    </div>
  )
}

