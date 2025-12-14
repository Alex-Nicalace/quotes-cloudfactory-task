import { useEffect, useRef } from 'react';
import { Animated, TextProps } from 'react-native';
import { Direction } from '../../../../stores/quotesStore/types';

interface AnimatedValueProps extends TextProps {
  direction: Direction;
}
export function AnimatedValue({
  children,
  style,
  direction,
  ...props
}: AnimatedValueProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    if (direction === 'up') toValue = 1;
    if (direction === 'down') toValue = -1;

    Animated.timing(anim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [direction, anim]);

  const color = anim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['#ff4d4f', '#000', '#52c41a'],
  });

  return (
    <Animated.Text style={[style, { color }]} {...props}>
      {children}
    </Animated.Text>
  );
}
