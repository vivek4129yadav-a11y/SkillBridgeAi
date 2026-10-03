import { useState, useCallback } from 'react';

// A simple toast hook to satisfy the import in AssessmentPage.tsx
// Real applications would use a proper toast library like sonner or shadcn-ui
export const useToast = () => {
    const toast = useCallback(({ title, description, variant }: { title?: string; description?: string; variant?: 'default' | 'destructive' }) => {
        const type = variant === 'destructive' ? '❌' : 'ℹ️';
        console.log(`[Toast] ${type} ${title}: ${description}`);
        
        // Using alert for visibility since we don't have a toast provider setup
        // This is a temporary measure to unblock the build.
        if (variant === 'destructive') {
            alert(`${title}\n\n${description}`);
        }
    }, []);

    return { toast };
};
