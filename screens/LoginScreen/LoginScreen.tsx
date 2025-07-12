import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from '@/shared/ui';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    // TODO: реализация авторизации через Supabase
  }, []);

  const handleRegisterNavigate = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Вход</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button onPress={handleLogin} style={styles.button}>Войти</Button>
      <Button onPress={handleRegisterNavigate} style={styles.link}>
        Зарегистрировать сотрудника
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  link: {
    marginTop: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
});
