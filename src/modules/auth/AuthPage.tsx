import { useState } from 'react'
import LoginForm from './LoginForm'
import OTPVerifyForm from './OTPVerifyForm'
import DemoLoginBar from '@/components/auth/DemoLoginBar'

export default function AuthPage() {
    const [step, setStep] = useState<'login' | 'verify'>('login')
    const [email, setEmail] = useState('')

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, hsl(240, 20%, 8%) 0%, hsl(250, 30%, 12%) 50%, hsl(240, 20%, 8%) 100%)' }}>
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#6366f1' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#8b5cf6' }} />

            <div className="relative z-10 w-full max-w-md animate-slide-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">SkillBridge AI</h1>
                    <p className="mt-2 text-sm" style={{ color: 'hsl(220 15% 55%)' }}>
                        AI-powered career guidance for India's workforce
                    </p>
                </div>

                <div className="card p-8">
                    {step === 'login' ? (
                        <LoginForm onOTPSent={(email) => { setEmail(email); setStep('verify') }} />
                    ) : (
                        <OTPVerifyForm email={email} onBack={() => setStep('login')} />
                    )}
                    <DemoLoginBar />
                </div>
            </div>
        </div>
    )
}
