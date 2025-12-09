import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useFetch } from '../hooks/useFetch';

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
  const { responseData, isLoading, errorMessage } = useFetch<TickerResponse>(
    'https://futures-api.poloniex.com/api/v2/tickers',
  );
  const quotes = responseData?.data;

  if (isLoading)
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
