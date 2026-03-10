import { apiFetch } from '@/services/http'

export type RegisterRequest = {
  fullName?: string | null
  email?: string | null
  password?: string | null
  confirmPassword?: string | null
}

export type LoginRequest = {
  email?: string | null
  password?: string | null
}

export type MeResponse = unknown

export const authService = {
  register: (body: RegisterRequest) =>
    apiFetch<void>('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: LoginRequest) =>
    apiFetch<void>('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () => apiFetch<void>('/api/auth/logout', { method: 'POST' }),

  me: () => apiFetch<MeResponse>('/api/auth/me'),
}

