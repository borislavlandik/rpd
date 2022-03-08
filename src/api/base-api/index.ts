import { useAxios, UseAxiosReturn } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';

export const baseAPIInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useBaseAPI<T>(url: string, config?: AxiosRequestConfig): UseAxiosReturn<T> {
  return config ? useAxios<T>(url, config, baseAPIInstance) : useAxios<T>(url, baseAPIInstance);
}
