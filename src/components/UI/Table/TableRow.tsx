import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableRow({ children, ...props }: ViewProps) {
  return (
    <View style={tableStyles.row} {...props}>
      {children}
    </View>
  );
}
