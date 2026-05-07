import { create } from 'zustand'

export type ToastVariant = 'default' | 'destructive' | 'success'

export interface Toast {
    id: string
    title?: string
    description?: string
    variant?: ToastVariant
}

interface ToastStore {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9)
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id }],
        }))

        // Auto-remove after 5 seconds
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }))
        }, 5000)
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}))

// Helper function to use outside of components (e.g. in axios interceptors)
export const toast = (toast: Omit<Toast, 'id'>) => {
    useToastStore.getState().addToast(toast)
}
