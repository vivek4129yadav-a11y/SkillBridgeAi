import { useCallback } from 'react';
import { toast as globalToast, ToastVariant } from '@/store/toastStore';

export const useToast = () => {
    const toast = useCallback(({ title, description, variant }: { title?: string; description?: string; variant?: ToastVariant }) => {
        globalToast({ title, description, variant });
    }, []);

    return { toast };
};
