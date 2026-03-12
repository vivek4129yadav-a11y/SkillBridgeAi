import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { GapReport } from '@/types/gap';

export const useGapReport = () => {
  return useQuery({
    queryKey: ['gap-analysis', 'report'],
    queryFn: async (): Promise<GapReport> => {
      const res = await api.get('/gap-analysis/report');
      return res.data.data;
    },
    retry: false, // If no skills/jobs it throws 400
  });
};

export const useRunGapAnalysis = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<GapReport> => {
      const res = await api.post('/gap-analysis/run');
      return res.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['gap-analysis', 'report'], data);
    },
  });
};
