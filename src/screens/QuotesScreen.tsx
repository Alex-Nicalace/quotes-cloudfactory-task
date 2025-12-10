import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useApi } from '../hooks/useApi';
import { getTickers } from '../services/apiTickers';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../components/UI/Table';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 20,
  },
  rowError: { justifyContent: 'center', alignItems: 'center' },
  cellError: { color: 'red', textAlign: 'center' },
});

type Props = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

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

export default function QuotesScreen({ navigation }: Props) {
  const [apiState, fetchData] = useApi(getTickers);
  const { data: quotes, isLoading, errorMessage } = apiState;

  useEffect(
    function load() {
      const controller = new AbortController();
      fetchData()({ signal: controller.signal });

      const id = setInterval(
        () => fetchData()({ signal: controller.signal }),
        5000,
      );

      return () => {
        controller.abort();
        clearInterval(id);
      };
    },
    [fetchData],
  );

  if (isLoading && !quotes)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {quotes && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>symbol</TableCell>
              <TableCell>price</TableCell>
              <TableCell>bestBidPrice</TableCell>
              <TableCell>bestAskPrice</TableCell>
              <TableCell>bestAskSize</TableCell>
            </TableRow>
          </TableHeader>

          {errorMessage && (
            <TableRow style={styles.rowError}>
              <TableCell style={styles.cellError}>{errorMessage}</TableCell>
            </TableRow>
          )}
          {quotes.map(q => (
            <TableRow key={q.symbol}>
              <TableCell>{q.symbol}</TableCell>
              <TableCell>{q.price}</TableCell>
              <TableCell>{q.bestBidPrice}</TableCell>
              <TableCell>{q.bestAskPrice}</TableCell>
              <TableCell>{q.bestAskSize}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
      <Button
        title="Назад к информации"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}
