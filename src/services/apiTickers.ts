import * as z from 'zod';
import { ApiError } from './ApiError';
import { apiFetch } from './base';
import { TickerResponseSchema } from './schemas/apiTickers';

export async function getTickers(options?: RequestInit) {
  console.log('fetch');
  const raw = await apiFetch('/tickers', options);

  const result = TickerResponseSchema.safeParse(raw);

  if (!result.success) {
    console.error(
      'Ticker response validation error:',
      z.treeifyError(result.error),
    );

    throw new ApiError(
      JSON.stringify(z.treeifyError(result.error)),
      500,
      'ValidationError',
    );
  }

  return result.data.data;
}
