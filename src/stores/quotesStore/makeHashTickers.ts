import { Ticker } from '../../services/schemas/apiTickers';
import { Direction, HashTickers, TransformValueFn } from './types';

export function makeHashTickers(
  tickers: Ticker[],
  prevHashTickers: HashTickers,
): HashTickers {
  return tickers.reduce((acc, ticker) => {
    const transformValue: TransformValueFn = name => {
      return {
        value: ticker[name],
        direction: getDirection(
          ticker[name],
          prevHashTickers[ticker.symbol]?.[name]?.value,
        ),
      };
    };

    acc[ticker.symbol] = {
      price: transformValue('price'),
      bestBidPrice: transformValue('bestBidPrice'),
      bestAskPrice: transformValue('bestAskPrice'),
      bestAskSize: transformValue('bestAskSize'),
    };

    return acc;
  }, {} as HashTickers);
}
function getDirection(
  value: number | string,
  prevValue: number | string | undefined,
): Direction {
  if (prevValue === undefined) {
    return 'none';
  }

  const valueNumber = Number(value);
  const prevValueNumber = Number(prevValue);

  if (Number.isNaN(valueNumber) || Number.isNaN(prevValueNumber)) {
    return 'none';
  }

  if (valueNumber > prevValueNumber) {
    return 'up';
  }
  if (valueNumber < prevValueNumber) {
    return 'down';
  }
  return 'none';
}
