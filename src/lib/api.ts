import axios from 'axios'
import { useAuthStore } from '@/store/authStore'
import logger from './logger'
import { toast } from '@/store/toastStore'

const log = logger('API')

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
})

// Attach access token to every request
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`
    }
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
                const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
                const { data } = await axios.post(
                    `${baseURL}/auth/refresh`,
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
        
        // Global error handling for everything else
        let errorMessage = err.response?.data?.message || 
                             err.response?.data?.detail?.message || 
                             err.message || 
                             'An unexpected error occurred'
        
        let errorCode = err.response?.data?.error_code || 
                          err.response?.data?.detail?.error_code || 
                          (err.response?.status ? `STATUS_${err.response.status}` : 'ERROR')

        // Handle FastAPI validation errors (422)
        if (err.response?.status === 422 && err.response.data?.detail) {
            const details = err.response.data.detail
            if (Array.isArray(details)) {
                errorMessage = details.map((d: any) => `${d.loc.join('.')}: ${d.msg}`).join(' | ')
                errorCode = 'VALIDATION_ERROR'
            }
        }

        toast({
            title: errorCode,
            description: errorMessage,
            variant: 'destructive'
        })

        return Promise.reject(err)
    }
)

export default api
