import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest } from '../types/invoice';
import apiClient from './client';

export const getInvoices = async (): Promise<Invoice[]> => {
  const res = await apiClient.get<Invoice[]>('/invoices');
  return res.data;
};

export const getInvoice = async (id: number): Promise<Invoice> => {
  const res = await apiClient.get<Invoice>(`/invoices/${id}`);
  return res.data;
};

export const createInvoice = async (data: CreateInvoiceRequest): Promise<Invoice> => {
  const res = await apiClient.post<Invoice>('/invoices', data);
  return res.data;
};

export const updateInvoice = async (id: number, data: UpdateInvoiceRequest): Promise<Invoice> => {
  const res = await apiClient.put<Invoice>(`/invoices/${id}`, data);
  return res.data;
};

export const deleteInvoice = async (id: number): Promise<void> => {
  await apiClient.delete(`/invoices/${id}`);
};

/** Download the PDF for a given invoice */
export const downloadInvoicePdf = async (id: number): Promise<Blob> => {
  const res = await apiClient.get<Blob>(`/invoices/${id}/pdf`, { responseType: 'blob' });
  return res.data;
};
