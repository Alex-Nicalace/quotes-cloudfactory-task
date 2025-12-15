import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootTabParamList } from './types';
import AboutScreen from '../screens/AboutScreen';
import QuotesScreen from '../screens/QuotesScreen';
import { t } from '../localization';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppTabNavigator() {
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
