import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useApi } from '../hooks/useApi';
import { getTickers } from '../services/apiTickers';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Котировки</Text>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Text>Получено записей: {quotes?.length}</Text>
      <Button
        title="Назад к информации"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}
