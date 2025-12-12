import * as z from 'zod';

export const TickerSchema = z.object({
  sequence: z.number(),
  symbol: z.string(),
  side: z.string(),
  size: z.number(),
  price: z.string(),
  bestBidSize: z.number(),
  bestBidPrice: z.string(),
  bestAskPrice: z.string(),
  tradeId: z.string(),
  bestAskSize: z.number(),
  ts: z.number(),
});

export const TickerResponseSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.array(TickerSchema).nullable().optional(),
});

export type Ticker = z.infer<typeof TickerSchema>;
export type TickerResponse = z.infer<typeof TickerResponseSchema>;
