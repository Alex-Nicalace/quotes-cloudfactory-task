import { Text, TextProps } from 'react-native';
import { tableStyles } from './tableStyles';

export function TableCell({ children, ...props }: TextProps) {
  return (
    <Text style={tableStyles.cell} {...props}>
      {children}
    </Text>
  );
}
