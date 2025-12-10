import { StyleSheet } from 'react-native';

export const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },

  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },

  cell: {
    flex: 1,
    paddingHorizontal: 6,
    fontSize: 14,
  },
});
