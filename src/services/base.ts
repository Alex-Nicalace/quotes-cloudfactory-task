import { ApiError } from './ApiError';

const API_URL = 'https://futures-api.poloniex.com/api/v2';

export async function apiFetch<T>(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new ApiError(errorMessage, response.status, response.statusText);
  }

  const data: T = await response.json();
  return data;
}
