import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from '@/shared/ui';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterEmployeeScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [projects, setProjects] = useState('');

  const handleCreate = useCallback(() => {
    // TODO: реализация создания сотрудника через Supabase
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Регистрация</Text>
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
      <TextInput
        label="Роль"
        value={role}
        onChangeText={setRole}
        style={styles.input}
      />
      <TextInput
        label="Проекты (через запятую)"
        value={projects}
        onChangeText={setProjects}
        style={styles.input}
      />
      <Button onPress={handleCreate} style={styles.button}>
        Создать сотрудника
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
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
});
