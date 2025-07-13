import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Card, ActivityIndicator, List } from 'react-native-paper';
import { WhiteSpace, WingBlank } from '../../shared/ui';
import { useEffect, useState } from 'react';
import { AuthService } from '../../services/authService';
import { DataService } from '../../services/dataService';
import type { ClaimSummary } from '../../types/database';

export function ClaimsScreen() {
  const [claims, setClaims] = useState<ClaimSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      setLoading(true);
      const profile = await AuthService.getCurrentProfile();
      if (profile) {
        const userClaims = await DataService.getUserClaims(profile.id);
        setClaims(userClaims);
      }
    } catch (error) {
      console.error('Error loading claims:', error);
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
            <Text style={styles.loadingText}>Загрузка претензий...</Text>
          </View>
        ) : (
          <List.Section>
            <List.Subheader>Мои претензии</List.Subheader>
            {claims.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>У вас пока нет претензий</Text>
              </View>
            ) : (
              claims.map((claim, index) => (
                <List.Item
                  key={claim.id || index}
                  title={() => (
                    <View>
                      <Text style={styles.claimTitle}>{claim.claim_no ? `Претензия №${claim.claim_no}` : 'Без номера'}</Text>
                      <Text style={styles.claimDescription} numberOfLines={2}>{claim.description || 'Нет описания'}</Text>
                      <Text style={styles.claimDate}>{formatDate(claim.created_at)}</Text>
                    </View>
                  )}
                  right={() => (
                    <Text
                      style={[
                        styles.statusBadge,
                        { backgroundColor: `${getStatusColor(claim.status_color)}20`, color: getStatusColor(claim.status_color) }
                      ]}
                    >
                      {claim.status_name || 'Неизвестно'}
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
            <Card.Title title="Статистика претензий" />
            <Card.Content>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{claims.length}</Text>
                  <Text style={styles.statLabel}>Всего</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.activeColor]}>
                    {claims.filter(c => c.status_name !== 'Закрыта' && c.status_name !== 'Отклонена').length}
                  </Text>
                  <Text style={styles.statLabel}>Активные</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, styles.completedColor]}>
                    {claims.filter(c => c.status_name === 'Закрыта').length}
                  </Text>
                  <Text style={styles.statLabel}>Закрытые</Text>
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
  claimTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  claimDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  claimDate: {
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
  newStatus: {
    backgroundColor: '#fff2e8',
    color: '#fa8c16',
  },
  inProgressStatus: {
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
  },
  completedStatus: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
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
  activeColor: {
    color: '#fa8c16',
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