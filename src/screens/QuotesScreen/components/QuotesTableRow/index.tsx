import { TableCell, TableRow } from '../../../../components/UI/Table';
import { TickerTransform } from '../../../../stores/quotesStore/types';
import { AnimatedValue } from '../AnimatedValue';

type KeyOfTicker = keyof TickerTransform;

const COLUMNS: Array<{
  key: KeyOfTicker;
  animated?: boolean;
}> = [
  { key: 'symbol' },
  { key: 'price', animated: true },
  { key: 'bestBidPrice', animated: true },
  { key: 'bestAskPrice', animated: true },
  { key: 'bestAskSize', animated: true },
];

interface Props {
  ticker: TickerTransform;
}

export function QuotesTableRow({ ticker }: Props) {
  return (
    <TableRow>
      {COLUMNS.map(({ key, animated }) => (
        <TableCell key={key}>
          {key === 'symbol' && <TableCell>{ticker[key]}</TableCell>}
          {key !== 'symbol' && animated && (
            <AnimatedValue direction={ticker[key].direction}>
              {ticker[key].value}
            </AnimatedValue>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
