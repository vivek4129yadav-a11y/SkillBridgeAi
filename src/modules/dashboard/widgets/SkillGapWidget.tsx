/**
 * SkillGapWidget — Shows skill gap data as circular progress rings.
 * Uses the gap analysis data from /gap-analysis/ endpoint.
 */
import { useQuery } from '@tanstack/react-query'
import { BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'

interface GapItem {
    skill: string
    current_level: number    // 0–100
    required_level: number   // 0–100
    gap_pct: number          // positive = gap, negative = surplus
    priority: 'high' | 'medium' | 'low'
}

interface GapAnalysis {
    target_role: string
    overall_readiness_pct: number
    gaps: GapItem[]
}

function useGapAnalysis() {
    return useQuery<GapAnalysis>({
        queryKey: ['gap-analysis-summary'],
        queryFn: async () => {
            const { data } = await api.get('/gap-analysis/')
            return data.data
        },
        retry: 1,
    })
}

const PRIORITY_COLORS: Record<string, string> = {
    high: '#f87171',
    medium: '#fb923c',
    low: '#4ade80',
}

function CircularProgress({ pct, color }: { pct: number; color: string }) {
    const r = 18
    const circumference = 2 * Math.PI * r
    const offset = circumference * (1 - Math.min(pct, 100) / 100)
    return (
        <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
            <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-700"
            />
        </svg>
    )
}

export default function SkillGapWidget() {
    const { data, isLoading, isError } = useGapAnalysis()
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="card p-6 animate-pulse space-y-3">
                <div className="h-5 w-40 bg-white/5 rounded" />
                <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl" />)}
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="card p-6 border-dashed border-white/10 bg-transparent text-center space-y-2 cursor-pointer hover:border-indigo-500/30 transition-colors"
                onClick={() => navigate('/gap-analysis')}>
                <BarChart3 size={28} className="mx-auto text-indigo-400 opacity-40" />
                <p className="text-sm font-medium text-white/50">No gap analysis yet</p>
                <p className="text-xs text-indigo-400 hover:underline">Run gap analysis →</p>
            </div>
        )
    }

    const topGaps = (data.gaps || []).filter(g => g.gap_pct > 0).slice(0, 6)
    const readiness = Math.round(data.overall_readiness_pct ?? 0)

    return (
        <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-orange-400" />
                    <p className="text-sm font-medium" style={{ color: 'hsl(220 15% 55%)' }}>Skill Gap</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'hsl(220 15% 50%)' }}>Readiness</span>
                    <span className="text-sm font-bold text-white">{readiness}%</span>
                </div>
            </div>

            {/* Overall readiness bar */}
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                        width: `${readiness}%`,
                        background: readiness > 70
                            ? 'linear-gradient(90deg, #4ade80, #22c55e)'
                            : readiness > 40
                            ? 'linear-gradient(90deg, #fb923c, #f97316)'
                            : 'linear-gradient(90deg, #f87171, #ef4444)',
                    }}
                />
            </div>

            {topGaps.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {topGaps.map(gap => {
                        const currentPct = Math.round(gap.current_level)
                        const color = PRIORITY_COLORS[gap.priority] ?? '#fb923c'
                        return (
                            <div key={gap.skill} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'hsl(222 47% 11%)' }}>
                                <div className="relative flex-shrink-0">
                                    <CircularProgress pct={currentPct} color={color} />
                                    <div className="absolute inset-0 flex items-center justify-center rotate-90">
                                        <span className="text-[9px] font-bold text-white">{currentPct}%</span>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-white truncate">{gap.skill}</p>
                                    <p className="text-[10px]" style={{ color }}>{gap.priority} priority</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
