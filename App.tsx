/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import AboutScreen from './src/screens/AboutScreen';
import QuotesScreen from './src/screens/QuotesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="About">
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'О приложении' }}
        />

        <Stack.Screen
          name="Quotes"
          component={QuotesScreen}
          options={{ title: 'Котировки' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
