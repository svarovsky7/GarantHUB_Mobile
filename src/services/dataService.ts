import { supabase } from '../lib/supabase';
import type { ClaimSummary, DefectSummary } from '../types/database';

export class DataService {
  static async getUserClaims(userId: string): Promise<ClaimSummary[]> {
    const { data, error } = await supabase
      .from('claims_summary')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getUserDefects(userId: string): Promise<DefectSummary[]> {
    const { data, error } = await supabase
      .from('defects_summary')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getUserStats(userId: string) {
    const [claimsData, defectsData] = await Promise.all([
      this.getUserClaims(userId),
      this.getUserDefects(userId),
    ]);

    const claimsStats = {
      total: claimsData.length,
      active: claimsData.filter(c => c.status_name !== 'Закрыта' && c.status_name !== 'Отклонена').length,
      completed: claimsData.filter(c => c.status_name === 'Закрыта').length,
    };

    const defectsStats = {
      total: defectsData.length,
      critical: defectsData.filter(d => d.type_name === 'Критический').length,
      inProgress: defectsData.filter(d => d.status_name === 'В работе').length,
      completed: defectsData.filter(d => d.status_name === 'Исправлен').length,
    };

    return {
      claims: claimsStats,
      defects: defectsStats,
    };
  }
}