/**
 * CareerIdentityCard — Shows the AI-generated career identity snapshot.
 * Uses /recommendations/career-identity endpoint.
 */
import { useQuery } from '@tanstack/react-query'
import { Brain, TrendingUp, Sparkles } from 'lucide-react'
import api from '@/lib/api'

interface CareerIdentity {
    archetype: string
    summary: string
    strengths: string[]
    recommended_paths: string[]
    confidence_score: number
}

function useCareerIdentity() {
    return useQuery<CareerIdentity>({
        queryKey: ['career-identity'],
        queryFn: async () => {
            const { data } = await api.get('/recommendations/career-identity')
            return data.data
        },
        retry: 1,
    })
}

export default function CareerIdentityCard() {
    const { data, isLoading, isError } = useCareerIdentity()

    if (isLoading) {
        return (
            <div className="card p-6 animate-pulse space-y-3">
                <div className="h-5 w-40 bg-white/5 rounded" />
                <div className="h-16 bg-white/5 rounded-lg" />
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="h-6 w-20 bg-white/5 rounded-full" />)}
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="card p-6 border-dashed border-white/10 bg-transparent text-center space-y-2">
                <Brain size={28} className="mx-auto text-indigo-400 opacity-40" />
                <p className="text-sm font-medium text-white/50">Career identity not yet generated</p>
                <p className="text-xs" style={{ color: 'hsl(220 15% 40%)' }}>Complete your assessment to unlock your AI career archetype.</p>
            </div>
        )
    }

    const confidence = Math.round((data.confidence_score ?? 0.7) * 100)

    return (
        <div
            className="card p-6 relative overflow-hidden"
            style={{ borderColor: 'rgba(99,102,241,0.3)', background: 'linear-gradient(135deg, hsl(222 47% 13%), hsl(230 50% 15%))' }}
        >
            {/* Glow accent */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4 relative">
                <div className="flex items-center gap-2">
                    <Brain size={18} className="text-indigo-400" />
                    <p className="text-sm font-medium" style={{ color: 'hsl(220 15% 55%)' }}>Career Identity</p>
                </div>
                <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}
                >
                    <Sparkles size={10} /> AI
                </span>
            </div>

            <div className="relative space-y-3">
                <div>
                    <p className="text-lg font-bold text-white">{data.archetype || 'Emerging Professional'}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{ width: `${confidence}%`, background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
                            />
                        </div>
                        <span className="text-xs text-indigo-300 font-medium">{confidence}% confidence</span>
                    </div>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'hsl(220 15% 70%)' }}>{data.summary}</p>

                {data.strengths?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {data.strengths.slice(0, 4).map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                                {s}
                            </span>
                        ))}
                    </div>
                )}

                {data.recommended_paths?.length > 0 && (
                    <div className="pt-1">
                        <p className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: 'hsl(220 15% 50%)' }}>
                            <TrendingUp size={11} /> Recommended Paths
                        </p>
                        <div className="flex flex-col gap-1">
                            {data.recommended_paths.slice(0, 3).map(path => (
                                <p key={path} className="text-xs text-white/70">→ {path}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
