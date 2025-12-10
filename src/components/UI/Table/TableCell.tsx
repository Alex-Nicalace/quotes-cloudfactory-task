import { Text, TextProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableCell({ children, style, ...props }: TextProps) {
  return (
    <Text style={[tableStyles.cell, style]} {...props}>
      {children}
    </Text>
  );
}
