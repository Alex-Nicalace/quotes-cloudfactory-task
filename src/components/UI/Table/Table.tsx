import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function Table({ children, ...props }: ViewProps) {
  return (
    <View style={tableStyles.table} {...props}>
      {children}
    </View>
  );
}
