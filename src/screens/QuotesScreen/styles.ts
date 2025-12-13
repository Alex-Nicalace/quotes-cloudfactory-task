import { StyleSheet } from 'react-native';

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
  up: { color: 'green' },
  down: { color: 'red' },
  none: { color: 'black' },
});
