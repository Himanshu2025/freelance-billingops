import { apiFetch } from '@/services/http'

export const healthService = {
  // Hits an existing endpoint just to validate base URL + CORS/cookies.
  ping: () => apiFetch<unknown>('/api/auth/me'),
}

