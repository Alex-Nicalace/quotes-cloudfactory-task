import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { t } from './src/localization';
import { RootTabParamList } from './src/navigation/types';
import AboutScreen from './src/screens/AboutScreen';
import QuotesScreen from './src/screens/QuotesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="About"
        screenOptions={{ tabBarIcon: () => null }}
      >
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ title: t('SCREEN_ABOUT'), tabBarLabel: t('SCREEN_ABOUT') }}
        />

        <Tab.Screen
          name="Quotes"
          component={QuotesScreen}
          options={{
            title: t('SCREEN_QUOTES'),
            tabBarLabel: t('SCREEN_QUOTES'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
