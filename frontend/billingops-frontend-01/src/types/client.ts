export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  createdAt: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
}
