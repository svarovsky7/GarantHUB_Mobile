import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { RegisterEmployeeScreen } from '@/screens/RegisterEmployeeScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Вход' }} />
        <Stack.Screen name="Register" component={RegisterEmployeeScreen} options={{ title: 'Регистрация' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
