import api from '@/lib/api';

export interface OverviewStats {
  total_users: number;
  active_jobs: number;
  onboarding_rate: number;
  completion_rate: number;
}

export interface SkillGapData {
  state: string;
  city: string;
  skill_name: string;
  demand: number;
  supply: number;
  gap: number;
}

export interface TrainingOutcome {
  month: string;
  completions_count: number;
}

export interface DistrictPerformance {
  state: string;
  city: string;
  registered_count: number;
  onboarded_count: number;
  assessed_count: number;
}

export interface YouthData {
  id: string;
  full_name: string;
  state: string;
  city: string;
  onboarding_status: string;
  primary_skill: string;
  skill_level: string;
  assessment_score: number;
}

export const analyticsService = {
  getOverview: async (city?: string): Promise<OverviewStats> => {
    const url = city ? `/api/v1/analytics/overview?city=${city}` : '/api/v1/analytics/overview';
    const response = await api.get(url);
    return response.data;
  },

  getSkillGaps: async (limit = 10, city?: string): Promise<SkillGapData[]> => {
    let url = `/api/v1/analytics/skill-gaps?limit=${limit}`;
    if (city) url += `&city=${city}`;
    const response = await api.get(url);
    return response.data;
  },

  getOutcomes: async (city?: string): Promise<TrainingOutcome[]> => {
    const url = city ? `/api/v1/analytics/outcomes?city=${city}` : '/api/v1/analytics/outcomes';
    const response = await api.get(url);
    return response.data;
  },

  getRegionalPerformance: async (city?: string): Promise<DistrictPerformance[]> => {
    const url = city ? `/api/v1/analytics/funnel?city=${city}` : '/api/v1/analytics/funnel';
    const response = await api.get(url);
    return response.data;
  },

  exportCSV: async (): Promise<void> => {
    const response = await api.get('/api/v1/analytics/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'regional_skill_gaps.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  getYouthList: async (limit = 10, offset = 0): Promise<YouthData[]> => {
    const response = await api.get(`/api/v1/government/youth-list?limit=${limit}&offset=${offset}`);
    return response.data;
  }
};

