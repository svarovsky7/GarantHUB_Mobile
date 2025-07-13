import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card, ActivityIndicator, List } from 'react-native-paper';
import { WhiteSpace, WingBlank } from '../../shared/ui';
import { useEffect, useState } from 'react';
import { AuthService } from '../../services/authService';
import { DataService } from '../../services/dataService';
import type { DefectSummary } from '../../types/database';

export function DefectsScreen() {
  const [defects, setDefects] = useState<DefectSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDefects();
  }, []);

  const loadDefects = async () => {
    try {
      setLoading(true);
      const profile = await AuthService.getCurrentProfile();
      if (profile) {
        const userDefects = await DataService.getUserDefects(profile.id);
        setDefects(userDefects);
      }
    } catch (error) {
      console.error('Error loading defects:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStatusColor = (statusColor: string | null) => {
    return statusColor || '#666';
  };
  return (
    <ScrollView style={styles.container}>
      <WingBlank>
        <WhiteSpace size="lg" />
        
{loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Загрузка дефектов...</Text>
          </View>
        ) : (
          <List.Section>
            <List.Subheader>Мои дефекты</List.Subheader>
            {defects.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>У вас пока нет дефектов</Text>
              </View>
            ) : (
              defects.map((defect, index) => (
                <List.Item
                  key={defect.id || index}
                  title={() => (
                    <View>
                      <Text style={styles.defectTitle}>{defect.description || 'Нет описания'}</Text>
                      {defect.unit_name && (
                        <Text style={styles.defectUnit}>
                          {defect.unit_name} {defect.unit_building && `(${defect.unit_building})`}
                        </Text>
                      )}
                      <Text style={styles.defectDate}>{formatDate(defect.created_at)}</Text>
                    </View>
                  )}
                  right={() => (
                    <Text
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(defect.status_color)}20`, color: getStatusColor(defect.status_color) }
                      ]}
                    >
                      {defect.status_name || 'Неизвестно'}
                    </Text>
                  )}
                />
              ))
            )}
          </List.Section>
        )}

        <WhiteSpace size="lg" />

        {!loading && (
          <Card>
            <Card.Title title="Статистика дефектов" />
            <Card.Content>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{defects.length}</Text>
                  <Text style={styles.statLabel}>Всего</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.criticalColor]}>
                    {defects.filter(d => d.type_name === 'Критический').length}
                  </Text>
                  <Text style={styles.statLabel}>Критические</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.inProgressColor]}>
                    {defects.filter(d => d.status_name === 'В работе').length}
                  </Text>
                  <Text style={styles.statLabel}>В работе</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.completedColor]}>
                    {defects.filter(d => d.status_name === 'Исправлен').length}
                  </Text>
                  <Text style={styles.statLabel}>Исправлены</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
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
  defectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  defectUnit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  defectDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  criticalStatus: {
    backgroundColor: '#fff1f0',
    color: '#f5222d',
  },
  inProgressStatus: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
  },
  minorStatus: {
    backgroundColor: '#f9f0ff',
    color: '#722ed1',
  },
  completedStatus: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  criticalColor: {
    color: '#f5222d',
  },
  inProgressColor: {
    color: '#1890ff',
  },
  completedColor: {
    color: '#52c41a',
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
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});