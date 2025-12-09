import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>О приложении</Text>

      <Button
        title="Перейти к котировкам"
        onPress={() => navigation.navigate('Quotes')}
      />
    </View>
  );
}
