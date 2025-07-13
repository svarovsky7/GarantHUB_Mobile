import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterEmployeeScreen } from '../../screens/RegisterEmployeeScreen';
import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1890ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterEmployeeScreen} 
          options={{ 
            title: 'Регистрация сотрудника',
            headerBackTitle: 'Назад',
          }} 
        />
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
