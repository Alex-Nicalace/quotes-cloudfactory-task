import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../components/UI/Table';
import { useApi } from '../hooks/useApi';
import { RootStackParamList } from '../navigation/types';
import { getTickers } from '../services/apiTickers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rowError: { justifyContent: 'center', alignItems: 'center' },
  cellError: { color: 'red', textAlign: 'center' },
  loading: { fontSize: 20 },
  tableWrap: { width: '100%', marginBottom: 20 },
});

type Props = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

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
        <ActivityIndicator size="large" />
        <Text style={styles.loading}>Loading...</Text>
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
              <TableCell>symbol</TableCell>
              <TableCell>price</TableCell>
              <TableCell>bestBidPrice</TableCell>
              <TableCell>bestAskPrice</TableCell>
              <TableCell>bestAskSize</TableCell>
            </TableRow>
          </TableHeader>

          {errorMessage && (
            <TableRow style={styles.rowError}>
              <TableCell style={styles.cellError}>ошибка</TableCell>
            </TableRow>
          )}
          {(quotes || []).map(q => (
            <TableRow key={q.symbol}>
              <TableCell>{q.symbol}</TableCell>
              <TableCell>{q.price}</TableCell>
              <TableCell>{q.bestBidPrice}</TableCell>
              <TableCell>{q.bestAskPrice}</TableCell>
              <TableCell>{q.bestAskSize}</TableCell>
            </TableRow>
          ))}
        </Table>
      </ScrollView>

      <Button
        title="Назад к информации"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}
