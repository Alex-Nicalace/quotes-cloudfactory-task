import { View, ViewProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableHeader({ children, style, ...props }: ViewProps) {
  return (
    <View style={[tableStyles.header, style]} {...props}>
      {children}
    </View>
  );
}
