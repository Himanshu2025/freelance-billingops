import { env } from '@/lib/env'

export type ApiError = {
  status: number
  message: string
  details?: unknown
}

async function parseJsonSafe(res: Response) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiFetch<T>(
  path: `/${string}`,
  init?: RequestInit & { query?: Record<string, string | number | boolean | undefined> },
) {
  const url = new URL(`${env.apiBaseUrl}${path}`)
  const query = init?.query
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined) continue
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    // Important for cookie-based auth sessions (your backend has /login, /me, /logout).
    credentials: 'include',
  })

  if (!res.ok) {
    const details = await parseJsonSafe(res)
    const message =
      typeof details === 'string'
        ? details
        : (details as any)?.title ??
          (details as any)?.message ??
          res.statusText ??
          'Request failed'
    const err: ApiError = { status: res.status, message, details }
    throw err
  }

  // 204 / empty body
  if (res.status === 204) return null as T

  return (await res.json()) as T
}

