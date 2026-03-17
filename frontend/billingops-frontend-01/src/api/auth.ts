import type { AuthUser, LoginRequest, RegisterRequest } from '../types/auth';
import apiClient from './client';

export const login = async (data: LoginRequest): Promise<AuthUser> => {
  const res = await apiClient.post<AuthUser>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<AuthUser> => {
  const res = await apiClient.post<AuthUser>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const getMe = async (): Promise<AuthUser> => {
  const res = await apiClient.get<AuthUser>('/auth/me');
  return res.data;
};
