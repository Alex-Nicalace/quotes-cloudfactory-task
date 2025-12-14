import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowError: { justifyContent: 'center', alignItems: 'center' },
  cellError: { color: 'red', textAlign: 'center' },
  loading: { fontSize: 20 },
});
