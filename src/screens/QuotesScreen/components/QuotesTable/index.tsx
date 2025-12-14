import { observer } from 'mobx-react-lite';
import { ActivityIndicator, Text } from 'react-native';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../../components/UI/Table';
import { t } from '../../../../localization';
import { quotesStore } from '../../../../stores/quotesStore';
import { QuotesTableRow } from '../QuotesTableRow';
import { styles } from './styles';

const HEADERS_TABLE = [
  'TABLE_SYMBOL',
  'TABLE_PRICE',
  'TABLE_BEST_BID_PRICE',
  'TABLE_BEST_ASK_PRICE',
  'TABLE_BEST_ASK_SIZE',
];

export default observer(function QuotesTable() {
  const { quotes, isLoading, errorMessage } = quotesStore;

  if (errorMessage) {
    console.error(errorMessage);
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {HEADERS_TABLE.map(h => (
            <TableCell key={h}>{t(h)}</TableCell>
          ))}
        </TableRow>
      </TableHeader>

      {isLoading && !quotes.length && (
        <TableRow style={styles.loadingWrap}>
          <ActivityIndicator size="large" />
          <Text style={styles.loading}>{t('LOADING')}</Text>
        </TableRow>
      )}

      {errorMessage && (
        <TableRow style={styles.rowError}>
          <TableCell style={styles.cellError}>{t('ERROR')}</TableCell>
        </TableRow>
      )}

      {quotes.map(q => (
        <QuotesTableRow key={q.symbol} ticker={q} />
      ))}
    </Table>
  );
});
