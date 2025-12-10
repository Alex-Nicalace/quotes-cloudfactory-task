import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableRow({ children, style, ...props }: ViewProps) {
  return (
    <View style={[tableStyles.row, style]} {...props}>
      {children}
    </View>
  );
}
