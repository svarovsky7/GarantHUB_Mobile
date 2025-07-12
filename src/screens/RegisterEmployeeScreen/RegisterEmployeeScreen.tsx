import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, WhiteSpace, WingBlank, Toast, Picker } from '@ant-design/react-native';
import { Button, TextInput } from '../../shared/ui';
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
      Toast.fail('Заполните обязательные поля', 1);
      return;
    }

    // TODO: реализация создания сотрудника через Supabase
    Toast.success('Сотрудник создан', 1);
    navigation.goBack();
  }, [email, password, selectedRole, navigation]);

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <WingBlank>
        <WhiteSpace size="lg" />
        
        <List renderHeader={'Основная информация'}>
          <TextInput
            value={email}
            onChange={(value) => setEmail(value || '')}
            label="Email"
            placeholder="Введите email сотрудника"
            type="email-address"
            clear
          />
          <TextInput
            value={password}
            onChange={(value) => setPassword(value || '')}
            label="Пароль"
            placeholder="Введите пароль"
            secureTextEntry
            clear
          />
        </List>

        <WhiteSpace size="lg" />

        <List renderHeader={'Роль и доступы'}>
          <Picker
            data={roles}
            value={selectedRole}
            cols={1}
            onChange={(value) => setSelectedRole(value as string[])}
          >
            <List.Item arrow="horizontal">Роль</List.Item>
          </Picker>
          <TextInput
            value={projects}
            onChange={(value) => setProjects(value || '')}
            label="Проекты"
            placeholder="Введите проекты через запятую"
            clear
          />
        </List>

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
});