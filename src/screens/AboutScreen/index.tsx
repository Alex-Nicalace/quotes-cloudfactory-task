import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { t } from '../../localization';
import { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('APP_ABOUT')}</Text>

      <Button
        title={t('GOTO_QUOTES')}
        onPress={() => navigation.navigate('Quotes')}
      />
    </View>
  );
}
