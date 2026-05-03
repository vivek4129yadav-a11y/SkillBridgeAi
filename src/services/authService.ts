import api from '@/lib/api'

export interface UserInfo {
    id: string
    email: string
    user_type: string
    preferred_lang?: string
    onboarding_done: boolean
    is_active?: boolean
}

export const authService = {
    async login(email: string) {
        return api.post('/auth/login', { email })
    },

    async signup(email: string, role: string) {
        return api.post('/auth/signup', { email, role })
    },

    async verifyOTP(email: string, otp: string) {
        const res = await api.post('/auth/verify-otp', { email, otp })
        return res.data.data // { access_token, user }
    },

    async getMe(): Promise<UserInfo> {
        const res = await api.get('/auth/me')
        return res.data.data
    }
}
