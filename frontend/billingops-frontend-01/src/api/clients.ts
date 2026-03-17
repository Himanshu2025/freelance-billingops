import type { Client, CreateClientRequest } from '../types/client';
import axios from 'axios';
import apiClient from './client';

const CLIENTS_STORAGE_KEY = 'billingops_clients';

const readLocalClients = (): Client[] => {
  try {
    const raw = localStorage.getItem(CLIENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Client[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalClients = (clients: Client[]) => {
  localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
};

const shouldUseFallback = (error: unknown) => {
  if (!axios.isAxiosError(error)) return false;
  const status = error.response?.status;
  return status === 404 || !error.response;
};

const normalizeClient = (input: Partial<Client> & { name: string; email: string }): Client => ({
  id:
    input.id ??
    (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : String(Date.now())),
  name: input.name,
  email: input.email,
  phone: input.phone,
  company: input.company,
  address: input.address,
  createdAt: input.createdAt ?? new Date().toISOString(),
});

export const getClients = async (): Promise<Client[]> => {
  try {
    const res = await apiClient.get<Client[]>('/clients');
    const clients = res.data.map((c) => normalizeClient(c));
    writeLocalClients(clients);
    return clients;
  } catch (error) {
    if (shouldUseFallback(error)) {
      return readLocalClients();
    }
    throw error;
  }
};

export const getClient = async (id: string): Promise<Client> => {
  try {
    const res = await apiClient.get<Client>(`/clients/${id}`);
    return normalizeClient(res.data);
  } catch (error) {
    if (shouldUseFallback(error)) {
      const found = readLocalClients().find((client) => client.id === id);
      if (found) return found;
    }
    throw error;
  }
};

export const createClient = async (data: CreateClientRequest): Promise<Client> => {
  try {
    const res = await apiClient.post<Client>('/clients', data);
    const created = normalizeClient(res.data);
    const locals = readLocalClients();
    const withoutDuplicate = locals.filter((client) => client.id !== created.id);
    writeLocalClients([created, ...withoutDuplicate]);
    return created;
  } catch (error) {
    if (shouldUseFallback(error)) {
      const created = normalizeClient(data);
      const locals = readLocalClients();
      writeLocalClients([created, ...locals]);
      return created;
    }
    throw error;
  }
};

export const updateClient = async (id: string, data: Partial<CreateClientRequest>): Promise<Client> => {
  try {
    const res = await apiClient.put<Client>(`/clients/${id}`, data);
    const updated = normalizeClient(res.data);
    const locals = readLocalClients().map((client) => (client.id === id ? updated : client));
    writeLocalClients(locals);
    return updated;
  } catch (error) {
    if (shouldUseFallback(error)) {
      const locals = readLocalClients();
      const index = locals.findIndex((client) => client.id === id);
      if (index === -1) {
        throw new Error('Client not found');
      }
      const updated = normalizeClient({ ...locals[index], ...data });
      locals[index] = updated;
      writeLocalClients(locals);
      return updated;
    }
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/clients/${id}`);
  } catch (error) {
    if (!shouldUseFallback(error)) {
      throw error;
    }
  }

  const locals = readLocalClients().filter((client) => client.id !== id);
  writeLocalClients(locals);
};
