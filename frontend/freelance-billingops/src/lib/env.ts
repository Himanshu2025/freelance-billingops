export const env = {
  apiBaseUrl: (() => {
    const v = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''
    const fallback = 'https://freelance-billingops-1.onrender.com'
    const raw = v.trim() || fallback
    return raw.endsWith('/') ? raw.slice(0, -1) : raw
  })(),
} as const

