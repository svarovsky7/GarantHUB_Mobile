import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, TextInput, WhiteSpace, WingBlank } from '../../shared/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const roles = [
  { label: 'Администратор', value: 'admin' },
  { label: 'Менеджер', value: 'manager' },
  { label: 'Сотрудник', value: 'employee' },
  { label: 'Гость', value: 'guest' },
];

export function RegisterEmployeeScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string[]>(['employee']);
  const [projects, setProjects] = useState('');

  const handleCreate = useCallback(() => {
    if (!email || !password || !selectedRole[0]) {
      Alert.alert('Ошибка', 'Заполните обязательные поля');
      return;
    }

    // TODO: реализация создания сотрудника через Supabase
    Alert.alert('Успех', 'Сотрудник создан');
    navigation.goBack();
  }, [email, password, selectedRole, navigation]);

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <WingBlank>
        <WhiteSpace size="lg" />
        
        <View>
          <Text style={styles.sectionHeader}>Основная информация</Text>
          <TextInput
            value={email}
            onChange={(value) => setEmail(value || '')}
            label="Email"
            placeholder="Введите email сотрудника"
          />
          <TextInput
            value={password}
            onChange={(value) => setPassword(value || '')}
            label="Пароль"
            placeholder="Введите пароль"
            secureTextEntry
          />
        </View>

        <WhiteSpace size="lg" />

        <View>
          <Text style={styles.sectionHeader}>Роль и доступы</Text>
          <Picker
            selectedValue={selectedRole[0]}
            onValueChange={(value) => setSelectedRole([value])}
          >
            {roles.map((r) => (
              <Picker.Item key={r.value} label={r.label} value={r.value} />
            ))}
          </Picker>
          <TextInput
            value={projects}
            onChange={(value) => setProjects(value || '')}
            label="Проекты"
            placeholder="Введите проекты через запятую"
          />
        </View>

        <WhiteSpace size="xl" />

        <Button 
          type="primary" 
          onPress={handleCreate}
          disabled={!email || !password || !selectedRole[0]}
        >
          Создать сотрудника
        </Button>

        <WhiteSpace size="lg" />

        <Button 
          type="ghost" 
          onPress={() => navigation.goBack()}
        >
          Отмена
        </Button>

        <WhiteSpace size="xl" />
      </WingBlank>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});