import { create } from 'zustand'

interface OnboardingState {
    currentStep: number
    completedSteps: number[]
    email: string
    setStep: (step: number) => void
    markCompleted: (step: number) => void
    setEmail: (email: string) => void
    reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    currentStep: 1,
    completedSteps: [],
    email: '',

    setStep: (step) => set({ currentStep: step }),
    markCompleted: (step) => set((s) => ({
        completedSteps: [...new Set([...s.completedSteps, step])],
    })),
    setEmail: (email) => set({ email }),
    reset: () => set({ currentStep: 1, completedSteps: [], email: '' }),
}))
