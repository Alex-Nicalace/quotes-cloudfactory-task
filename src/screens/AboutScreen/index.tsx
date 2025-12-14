import React from 'react';
import { Text, View } from 'react-native';
import { t } from '../../localization';
import { styles } from './styles';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('APP_ABOUT')}</Text>
    </View>
  );
}
