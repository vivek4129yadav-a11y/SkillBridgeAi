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
}

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    setTokens: (access: string, refresh: string) => void
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

            setTokens: (accessToken, refreshToken) => {
                log.info('Tokens stored')
                set({ accessToken, refreshToken, isAuthenticated: true })
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
            name: 'skillbridge-auth',
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
