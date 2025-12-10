import { apiFetch } from './base';

export interface TickerResponse {
  code: string;
  msg: string;
  data?: Ticker[] | null;
}
export interface Ticker {
  sequence: number;
  symbol: string;
  side: string;
  size: number;
  price: string;
  bestBidSize: number;
  bestBidPrice: string;
  bestAskPrice: string;
  tradeId: string;
  bestAskSize: number;
  ts: number;
}

export async function getTickers(options?: RequestInit) {
  const response = await apiFetch<TickerResponse>('/tickers', options);
  return response.data;
}
