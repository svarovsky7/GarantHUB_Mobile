import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, Platform, Alert } from 'react-native';
import { List, WhiteSpace, WingBlank, Toast, ActivityIndicator } from '@ant-design/react-native';
import { Button, TextInput } from '../../shared/ui';
import { AuthService } from '../../services/authService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      const message = 'Заполните все поля';
      if (Platform.OS === 'web') {
        Alert.alert('Ошибка', message);
      } else {
        Toast.fail(message, 1);
      }
      return;
    }
    
    setLoading(true);
    try {
      await AuthService.signIn(email, password);
      const successMessage = 'Вход выполнен';
      if (Platform.OS === 'web') {
        Alert.alert('Успех', successMessage);
      } else {
        Toast.success(successMessage, 1);
      }
      navigation.navigate('MainTabs');
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка входа';
      if (Platform.OS === 'web') {
        Alert.alert('Ошибка', errorMessage);
      } else {
        Toast.fail(errorMessage, 2);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

  const handleRegisterNavigate = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <WingBlank>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>G</Text>
            </View>
          </View>
          <WhiteSpace size="lg" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>GarantHUB</Text>
            <Text style={styles.subtitle}>Корпоративная система управления замечаний</Text>
          </View>
        </View>

        <WhiteSpace size="xl" />

        {Platform.OS === 'web' ? (
          <View style={styles.webForm}>
            <Text style={styles.formHeader}>Вход в систему</Text>
            <TextInput
              value={email}
              onChange={(value) => setEmail(value || '')}
              label="Email"
              placeholder="Введите email"
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
          </View>
        ) : (
          <List renderHeader={'Вход в систему'}>
            <TextInput
              value={email}
              onChange={(value) => setEmail(value || '')}
              label="Email"
              placeholder="Введите email"
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
        )}

        <WhiteSpace size="xl" />

        <Button 
          type="primary" 
          onPress={handleLogin}
          disabled={!email || !password}
        >
          Войти в систему
        </Button>

        <WhiteSpace size="lg" />

        <Button 
          type="ghost" 
          onPress={handleRegisterNavigate}
        >
          Зарегистрировать сотрудника
        </Button>

        <WhiteSpace size="xl" />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 GarantHUB</Text>
        </View>
      </WingBlank>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    opacity: 0.6,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
  webForm: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});