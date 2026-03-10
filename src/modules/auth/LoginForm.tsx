import { useState } from 'react'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Props {
    onOTPSent: (email: string) => void
}

export default function LoginForm({ onOTPSent }: Props) {
    const [email, setEmail] = useState('')
    const { requestOTP, loading, error } = useAuth()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const ok = await requestOTP(email)
        if (ok) onOTPSent(email)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold text-white mb-1">Sign in</h2>
                <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>
                    Enter your email — we'll send a one-time code to your terminal.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(220 20% 80%)' }}>
                    Email address
                </label>
                <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'hsl(220 15% 55%)' }} />
                    <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-10"
                        placeholder="you@example.com"
                        required
                    />
                </div>
            </div>

            {error && (
                <div className="text-sm px-4 py-3 rounded-lg" style={{ background: 'hsl(0 80% 20% / 0.3)', color: '#f87171' }}>
                    {error}
                </div>
            )}

            <button id="request-otp-btn" type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                {loading ? 'Sending...' : 'Get OTP'}
            </button>
        </form>
    )
}
