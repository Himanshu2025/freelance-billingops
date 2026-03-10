import { apiFetch } from '@/services/http'

export type InvoiceResponse = {
  id: number
  invoiceNumber?: string | null
  clientName?: string | null
  clientEmail?: string | null
  description?: string | null
  amount: number
  issueDate: string
  dueDate: string
  status?: string | null
}

export type CreateInvoiceRequest = {
  clientName?: string | null
  clientEmail?: string | null
  description?: string | null
  amount: number
  dueDate: string
  status?: string | null
}

export type UpdateInvoiceRequest = CreateInvoiceRequest

export const invoicesService = {
  list: () => apiFetch<InvoiceResponse[]>('/api/Invoices'),
  get: (id: number) => apiFetch<InvoiceResponse>(`/api/Invoices/${id}`),
  create: (body: CreateInvoiceRequest) =>
    apiFetch<InvoiceResponse>('/api/Invoices', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  update: (id: number, body: UpdateInvoiceRequest) =>
    apiFetch<InvoiceResponse>(`/api/Invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  remove: (id: number) => apiFetch<void>(`/api/Invoices/${id}`, { method: 'DELETE' }),
  pdfUrl: (id: number) => `/api/Invoices/${id}/pdf` as const,
}

