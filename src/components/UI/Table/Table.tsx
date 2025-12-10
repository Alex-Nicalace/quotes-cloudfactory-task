import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function Table({ children, style, ...props }: ViewProps) {
  return (
    <View style={[tableStyles.table, style]} {...props}>
      {children}
    </View>
  );
}
