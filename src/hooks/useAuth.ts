import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useOnboardingStore } from '@/store/onboardingStore'
import logger from '@/lib/logger'

const log = logger('AUTH')

export function useAuth() {
    const { setTokens, setUser, logout } = useAuthStore()
    const { setEmail } = useOnboardingStore()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function requestOTP(email: string): Promise<boolean> {
        setLoading(true)
        setError(null)
        try {
            await api.post('/auth/request-otp', { email })
            setEmail(email)
            log.info('OTP requested for', email)
            return true
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to send OTP'
            setError(msg)
            return false
        } finally {
            setLoading(false)
        }
    }

    async function verifyOTP(email: string, otp: string): Promise<boolean> {
        setLoading(true)
        setError(null)
        try {
            const { data } = await api.post('/auth/verify-otp', { email, otp })
            const { access_token, refresh_token, user } = data.data
            setTokens(access_token, refresh_token)
            setUser(user)
            log.info('OTP verified, user logged in')
            navigate(user.onboarding_done ? '/dashboard' : '/onboarding')
            return true
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Invalid OTP'
            setError(msg)
            return false
        } finally {
            setLoading(false)
        }
    }

    function handleLogout() {
        logout()
        navigate('/auth')
    }

    return { requestOTP, verifyOTP, logout: handleLogout, loading, error }
}
