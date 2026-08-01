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

export const useRestartAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<any> => {
      const res = await api.post('/assessment/restart');
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['assessment', 'latest'] });
    },
  });
}

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { session_id: string; answer: string }): Promise<AssessmentSession> => {
      const res = await api.post('/assessment/answer', data);
      return res.data.data;
    },
    onSuccess: (data) => {
      if (data.is_complete) {
        queryClient.invalidateQueries({ queryKey: ['assessment', 'status'] });
        queryClient.invalidateQueries({ queryKey: ['assessment', 'latest'] });
      }
    },
  });
};

export const useLatestAssessment = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['assessment', 'latest'],
    queryFn: async (): Promise<AssessmentSession | null> => {
      const res = await api.get('/assessment/latest');
      return res.data.data;
    },
    enabled,
  });
};

