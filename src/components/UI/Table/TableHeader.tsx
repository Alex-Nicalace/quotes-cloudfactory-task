import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableHeader({ children, ...props }: ViewProps) {
  return (
    <View style={tableStyles.header} {...props}>
      {children}
    </View>
  );
}
