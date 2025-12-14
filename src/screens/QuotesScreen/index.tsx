import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, ScrollView, View } from 'react-native';
import { t } from '../../localization';
import { RootStackParamList } from '../../navigation/types';
import QuotesTable from './components/QuotesTable';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Quotes'>;

export default function QuotesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.tableWrap}>
        <QuotesTable />
      </ScrollView>

      <Button
        title={t('BACKTO_INFO')}
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}
