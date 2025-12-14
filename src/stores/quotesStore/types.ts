import { quotesStore } from '.';
import { Ticker } from '../../services/schemas/apiTickers';

export type Direction = 'up' | 'down' | 'none';

export type Field<T> = {
  value: T;
  direction: Direction;
};

export type TransformToFields<T extends object> = {
  [K in keyof T]: Field<T[K]>;
};

export type HashTicker = TransformToFields<Omit<Ticker, 'symbol'>>;

export type HashTickers = Record<string, HashTicker>;

export type TransformValueFn = <T extends keyof HashTicker>(
  name: T,
) => Field<HashTicker[T]['value']>;

export type TickerTransform = (typeof quotesStore.quotes)[0];
