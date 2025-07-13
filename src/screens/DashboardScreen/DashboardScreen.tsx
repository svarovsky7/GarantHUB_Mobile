import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, ActivityIndicator, List } from 'react-native-paper';
import { WhiteSpace, WingBlank } from '../../shared/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';
import { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { AuthService } from '../../services/authService';
import { DataService } from '../../services/dataService';
import type { Profile } from '../../types/database';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = useCallback(async () => {
    try {
      await AuthService.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      navigation.navigate('Login');
    }
  }, [navigation]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const currentProfile = await AuthService.getCurrentProfile();
      if (currentProfile) {
        setProfile(currentProfile);
        const userStats = await DataService.getUserStats(currentProfile.id);
        setStats(userStats);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleLogout]);

  return (
    <ScrollView style={styles.container}>
      <WingBlank>
        <WhiteSpace size="lg" />
        
        <Card>
          <Card.Body>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeTitle}>
                Добро пожаловать, {profile?.name || 'Пользователь'}
              </Text>
              <Text style={styles.dateText}>
                Сегодня {getCurrentDate()}
              </Text>
            </View>
          </Card.Body>
        </Card>

        <WhiteSpace size="lg" />

{loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Загрузка данных...</Text>
          </View>
        ) : (
          <>
            <List.Section>
              <List.Subheader>Статистика пользователя</List.Subheader>
              <List.Item
                title="Всего замечаний"
                right={() => <Text style={styles.statNumber}>{stats?.claims?.total || 0}</Text>}
              />
              <List.Item
                title="Активные замечания"
                right={() => (
                  <Text style={[styles.statNumber, styles.activeCount]}>{stats?.claims?.active || 0}</Text>
                )}
              />
              <List.Item
                title="Закрытые замечания"
                right={() => (
                  <Text style={[styles.statNumber, styles.completedCount]}>{stats?.claims?.completed || 0}</Text>
                )}
              />
            </List.Section>

            <WhiteSpace size="lg" />

            <List.Section>
              <List.Subheader>Дефекты</List.Subheader>
              <List.Item
                title="Всего дефектов"
                right={() => <Text style={styles.statNumber}>{stats?.defects?.total || 0}</Text>}
              />
              <List.Item
                title="Критические"
                right={() => (
                  <Text style={[styles.statNumber, styles.criticalCount]}>{stats?.defects?.critical || 0}</Text>
                )}
              />
              <List.Item
                title="В работе"
                right={() => (
                  <Text style={[styles.statNumber, styles.inProgressCount]}>{stats?.defects?.inProgress || 0}</Text>
                )}
              />
              <List.Item
                title="Исправленные"
                right={() => (
                  <Text style={[styles.statNumber, styles.completedCount]}>{stats?.defects?.completed || 0}</Text>
                )}
              />
            </List.Section>
          </>
        )}

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
  welcomeContainer: {
    padding: 15,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logoutText: {
    color: '#1890ff',
    fontSize: 16,
    fontWeight: '600',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activeCount: {
    color: '#fa8c16',
  },
  completedCount: {
    color: '#52c41a',
  },
  criticalCount: {
    color: '#f5222d',
  },
  inProgressCount: {
    color: '#1890ff',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});