import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { quotesStore } from '../../stores/quotesStore';
import QuotesTable from './components/QuotesTable';
import { styles } from './styles';

function focusEffect() {
  quotesStore.startLoadingTimer();

  return () => {
    quotesStore.stopLoadingTimer();
  };
}

export default function QuotesScreen() {
  useFocusEffect(focusEffect);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tableWrap}>
        <QuotesTable />
      </ScrollView>
    </View>
  );
}
