import * as z from 'zod';

export const TickerSchema = z.object({
  symbol: z.string(),
  price: z.string(),
  bestBidPrice: z.string(),
  bestAskPrice: z.string(),
  bestAskSize: z.number(),
});

export const TickerResponseSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.array(TickerSchema).nullable().optional(),
});

export type Ticker = z.infer<typeof TickerSchema>;
export type TickerResponse = z.infer<typeof TickerResponseSchema>;
