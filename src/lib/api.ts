import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import logger from './logger'

const log = logger('API')

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
})

// Attach access token to every request
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Auto-refresh on 401
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config

        if (err.response?.status === 401 && !original._retry) {
            original._retry = true
            const refreshToken = useAuthStore.getState().refreshToken

            if (!refreshToken) {
                useAuthStore.getState().logout()
                window.location.href = '/login'
                return Promise.reject(err)
            }

            try {
                log.info('Access token expired, refreshing...')
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    { refresh_token: refreshToken }
                )
                const newToken = data.data.access_token
                useAuthStore.getState().setTokens(newToken, data.data.refresh_token)
                original.headers.Authorization = `Bearer ${newToken}`
                return api(original)
            } catch {
                useAuthStore.getState().logout()
                window.location.href = '/login'
                return Promise.reject(err)
            }
        }

        return Promise.reject(err)
    }
)

export default api
