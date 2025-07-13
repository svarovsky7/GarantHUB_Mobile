import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { DashboardScreen } from '../../screens/DashboardScreen';
import { ClaimsScreen } from '../../screens/ClaimsScreen';
import { DefectsScreen } from '../../screens/DefectsScreen';

export type TabParamList = {
  DashboardTab: undefined;
  ClaimsTab: undefined;
  DefectsTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1890ff',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#1890ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardScreen}
        options={{
          title: 'Главная',
          tabBarLabel: 'Дашборд',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="ClaimsTab" 
        component={ClaimsScreen}
        options={{
          title: 'Претензии',
          tabBarLabel: 'Претензии',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>📝</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="DefectsTab" 
        component={DefectsScreen}
        options={{
          title: 'Дефекты',
          tabBarLabel: 'Дефекты',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>⚠️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}