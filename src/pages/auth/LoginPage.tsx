import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '@/services/authService'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await authService.login(email)
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[hsl(var(--background))]">
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-[#ea580c] text-white">
                        <span className="text-xl font-bold">S</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-sm text-[hsl(var(--text-muted))]">
                        Log in to your SANKALP account
                    </p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-slate-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
