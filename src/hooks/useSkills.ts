import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { SkillSummary, UserSkillProfile } from '@/types/skills';

export const useSkillSummary = () => {
  return useQuery({
    queryKey: ['skills', 'summary'],
    queryFn: async (): Promise<SkillSummary> => {
      const res = await api.get('/skills/me/summary');
      return res.data.data;
    },
  });
};

export const useSkillProfile = () => {
  return useQuery({
    queryKey: ['skills', 'profile'],
    queryFn: async (): Promise<UserSkillProfile> => {
      const res = await api.get('/skills/me');
      return res.data.data;
    },
  });
};
