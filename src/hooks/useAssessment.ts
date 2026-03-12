import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { AssessmentStatus, AssessmentSession, AssessmentHistoryItem } from '@/types/assessment';

export const useAssessmentStatus = () => {
  return useQuery({
    queryKey: ['assessment', 'status'],
    queryFn: async (): Promise<AssessmentStatus> => {
      const res = await api.get('/assessment/status');
      return res.data.data;
    },
  });
};

export const useAssessmentHistory = () => {
  return useQuery({
    queryKey: ['assessment', 'history'],
    queryFn: async (): Promise<AssessmentHistoryItem[]> => {
      const res = await api.get('/assessment/history');
      return res.data.data;
    },
  });
};

export const useStartAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<AssessmentSession> => {
      const res = await api.post('/assessment/start');
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment', 'status'] });
    },
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: async (data: { session_id: string; answer: string }): Promise<AssessmentSession> => {
      const res = await api.post('/assessment/answer', data);
      return res.data.data;
    },
  });
};
