import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import logger from '@/lib/logger'

const log = logger('AUTH_STORE')

interface User {
    id: string
    email: string
    user_type: string | null
    preferred_lang: string
    onboarding_done: boolean
    onboarding_step: number
}

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    setAuth: (user: User, accessToken: string, refreshToken: string) => void
    setTokens: (accessToken: string, refreshToken: string) => void
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setAuth: (user, accessToken, refreshToken) => {
                log.info('Auth set in memory')
                set({ user, accessToken, refreshToken, isAuthenticated: true })
            },

            setTokens: (accessToken, refreshToken) => {
                set({ accessToken, refreshToken })
            },

            setUser: (user) => {
                set({ user })
            },

            logout: () => {
                log.info('User logged out')
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)
