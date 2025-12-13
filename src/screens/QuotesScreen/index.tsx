import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/UI/Table';
import { t } from '../../localization';
import { RootStackParamList } from '../../navigation/types';
import { quotesStore } from '../../stores/quotesStore';
import { styles } from './styles';

const HEADERS_TABLE = [
  'TABLE_SYMBOL',
  'TABLE_PRICE',
  'TABLE_BEST_BID_PRICE',
  'TABLE_BEST_ASK_PRICE',
  'TABLE_BEST_ASK_SIZE',
];

type Props = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

export default observer(function QuotesScreen({ navigation }: Props) {
  useEffect(() => {
    quotesStore.startLoadingTimer();

    return () => quotesStore.stopLoadingTimer();
  }, []);

  const { quotes, isLoading, errorMessage } = quotesStore;

  if (isLoading && !quotes.length)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loading}>{t('LOADING')}</Text>
      </View>
    );

  if (errorMessage) {
    console.error(errorMessage);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tableWrap}>
        <Table>
          <TableHeader>
            <TableRow>
              {HEADERS_TABLE.map(h => (
                <TableCell key={h}>{t(h)}</TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {errorMessage && (
            <TableRow style={styles.rowError}>
              <TableCell style={styles.cellError}>{t('ERROR')}</TableCell>
            </TableRow>
          )}
          {quotes.map(q => (
            <TableRow key={q.symbol}>
              <TableCell>{q.symbol}</TableCell>
              <TableCell style={styles[q.price.direction]}>
                {q.price.value}
              </TableCell>
              <TableCell style={styles[q.bestBidPrice.direction]}>
                {q.bestBidPrice.value}
              </TableCell>
              <TableCell style={styles[q.bestAskPrice.direction]}>
                {q.bestAskPrice.value}
              </TableCell>
              <TableCell style={styles[q.bestAskSize.direction]}>
                {q.bestAskSize.value}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </ScrollView>

      <Button
        title={t('BACKTO_INFO')}
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
});
