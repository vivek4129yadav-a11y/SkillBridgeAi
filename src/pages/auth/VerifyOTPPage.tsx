import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const setAuth = useAuthStore(s => s.setAuth)

    const email = searchParams.get('email')

    useEffect(() => {
        if (!email) {
            navigate('/login')
        }
    }, [email, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length !== 6) {
            setError('Please enter a 6-digit OTP')
            return
        }
        setLoading(true)
        setError('')
        try {
            const { access_token, refresh_token } = await authService.verifyOTP(email!, otp)
            
            // Set tokens in store so api interceptor works
            useAuthStore.getState().setTokens(access_token, refresh_token)

            // Fetch full user info to know where to redirect
            const userInfo = await authService.getMe()
            
            // Update store
            setAuth({
                id: userInfo.id,
                email: userInfo.email,
                user_type: userInfo.user_type,
                preferred_lang: userInfo.preferred_lang || 'en',
                onboarding_done: userInfo.onboarding_done,
                onboarding_step: 0 // No longer used in DB
            }, access_token, refresh_token)

            // Redirect logic
            if (!userInfo.onboarding_done) {
                // Map snake_case roles from backend to kebab-case routes
                const roleRouteMap: Record<string, string> = {
                    'student': 'student',
                    'individual_youth': 'student',
                    'blue_collar': 'blue-collar',
                    'individual_bluecollar': 'blue-collar',
                    'blue-collar': 'blue-collar',
                    'informal_worker': 'informal-worker',
                    'individual_informal': 'informal-worker',
                    'informal-worker': 'informal-worker',
                    'employer': 'employer',
                    'org_employer': 'employer',
                    'ngo': 'ngo',
                    'org_ngo': 'ngo',
                    'government': 'government',
                    'org_govt': 'government'
                }
                const route = roleRouteMap[userInfo.user_type] || userInfo.user_type
                navigate(`/onboarding/${route}`)
            } else {
                navigate('/dashboard')
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid OTP. Please check and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, hsl(240, 20%, 8%) 0%, hsl(250, 30%, 12%) 50%, hsl(240, 20%, 8%) 100%)' }}>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#6366f1' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#8b5cf6' }} />

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        <span className="text-2xl">🔑</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Verify OTP</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        We've sent a 6-digit code to <span className="text-white font-medium">{email}</span>
                    </p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-4 text-slate-300 text-center">Enter Verification Code</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                className="input-field text-center text-2xl tracking-[0.5em] font-bold"
                                placeholder="000000"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-sm text-slate-400 w-full text-center hover:text-white"
                        >
                            Use a different email
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
