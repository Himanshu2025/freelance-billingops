import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice } from '../api/invoices';
import type { CreateInvoiceRequest, UpdateInvoiceRequest } from '../types/invoice';

export const useInvoices = () =>
  useQuery({ queryKey: ['invoices'], queryFn: getInvoices });

export const useInvoice = (id: number) =>
  useQuery({ queryKey: ['invoices', id], queryFn: () => getInvoice(id), enabled: id > 0 });

export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvoiceRequest) => createInvoice(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['invoices'] }),
  });
};

export const useUpdateInvoice = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateInvoiceRequest) => updateInvoice(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['invoices'] }),
  });
};

export const useDeleteInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteInvoice(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['invoices'] }),
  });
};
