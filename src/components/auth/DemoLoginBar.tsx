/**
 * DemoLoginBar — Quick-login bar for hackathon judges.
 * Shows below the main auth form only when NODE_ENV !== 'production'
 * (or when VITE_DEMO_MODE=true is set).
 */
import { useState } from 'react'
import { Loader2, UserCheck } from 'lucide-react'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

const PERSONAS = [
    { id: 'ramesh', label: 'Ramesh', desc: 'Rural Tech Aspirant', emoji: '👨‍💻' },
    { id: 'priya', label: 'Priya', desc: 'Healthcare Pro', emoji: '👩‍⚕️' },
    { id: 'officer', label: 'Officer', desc: 'Govt. Evaluator', emoji: '🏛️' },
]

interface DemoLoginBarProps {
    onLogin?: () => void
}

export default function DemoLoginBar({ onLogin }: DemoLoginBarProps) {
    const [loading, setLoading] = useState<string | null>(null)
    const [error, setError] = useState('')
    const setAuth = useAuthStore(s => s.setAuth)
    const navigate = useNavigate()

    if (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== 'true') return null

    async function loginAs(persona: string) {
        setLoading(persona)
        setError('')
        try {
            const { data } = await api.post('/api/demo/login', { persona })
            setAuth(data.data.access_token, { email: data.data.label, id: persona })
            onLogin?.()
            navigate('/dashboard')
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Demo login failed')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="mt-8">
            <div className="relative flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: 'hsl(222 30% 22%)' }} />
                <span className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <UserCheck size={10} /> Demo Mode
                </span>
                <div className="flex-1 h-px" style={{ background: 'hsl(222 30% 22%)' }} />
            </div>

            <p className="text-center text-xs mb-3" style={{ color: 'hsl(220 15% 50%)' }}>
                Judge / Demo Access — skip OTP
            </p>

            <div className="grid grid-cols-3 gap-2">
                {PERSONAS.map(p => (
                    <button
                        key={p.id}
                        id={`demo-login-${p.id}`}
                        onClick={() => loginAs(p.id)}
                        disabled={!!loading}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        style={{ background: 'hsl(222 47% 12%)', border: '1px solid hsl(222 30% 20%)' }}
                    >
                        {loading === p.id
                            ? <Loader2 size={18} className="animate-spin text-indigo-400" />
                            : <span className="text-lg">{p.emoji}</span>
                        }
                        <span className="text-xs font-medium text-white">{p.label}</span>
                        <span className="text-[10px]" style={{ color: 'hsl(220 15% 50%)' }}>{p.desc}</span>
                    </button>
                ))}
            </div>

            {error && <p className="text-xs text-red-400 text-center mt-2">{error}</p>}
        </div>
    )
}
