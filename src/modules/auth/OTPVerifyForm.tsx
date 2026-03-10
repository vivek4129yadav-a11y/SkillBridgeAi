import { useState, useRef } from 'react'
import { KeyRound, Loader2, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Props {
    email: string
    onBack: () => void
}

export default function OTPVerifyForm({ email, onBack }: Props) {
    const [otp, setOTP] = useState('')
    const { verifyOTP, loading, error } = useAuth()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        await verifyOTP(email, otp)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold text-white mb-1">Enter OTP</h2>
                <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>
                    A 6-digit code was printed to the server terminal for <strong className="text-white">{email}</strong>.
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(220 20% 80%)' }}>
                    One-time password
                </label>
                <div className="relative">
                    <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'hsl(220 15% 55%)' }} />
                    <input
                        id="otp-input"
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value.replace(/\D/g, ''))}
                        className="input-field pl-10 font-mono tracking-widest text-lg"
                        placeholder="• • • • • •"
                        required
                    />
                </div>
            </div>

            {error && (
                <div className="text-sm px-4 py-3 rounded-lg" style={{ background: 'hsl(0 80% 20% / 0.3)', color: '#f87171' }}>
                    {error}
                </div>
            )}

            <button id="verify-otp-btn" type="submit" className="btn-primary w-full" disabled={loading || otp.length !== 6}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : <KeyRound size={18} />}
                {loading ? 'Verifying...' : 'Verify & Sign in'}
            </button>

            <button type="button" onClick={onBack} className="btn-ghost w-full">
                <ArrowLeft size={16} /> Back to email
            </button>
        </form>
    )
}
