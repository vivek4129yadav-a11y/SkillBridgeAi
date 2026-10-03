import { useQuery } from '@tanstack/react-query'
import { BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { CircularProgress } from './CircularProgress'

interface GapItem {
    skill: string
    current_level: number
    required_level: number
    gap_pct: number
    priority: 'high' | 'medium' | 'low'
}

interface GapAnalysis {
    target_role: string
    overall_readiness_pct: number
    gaps: GapItem[]
}

const PRIORITY_COLORS: Record<string, string> = {
    high: '#f87171',
    medium: '#fb923c',
    low: '#4ade80',
}

export default function SkillGapWidget() {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useQuery<GapAnalysis>({
        queryKey: ['gap-analysis-summary'],
        queryFn: async () => {
            const { data: res } = await api.get('/gap-analysis/report')
            return res.data
        },
        retry: 1,
    })

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
            <div 
                className="card p-6 border-dashed border-white/10 bg-transparent text-center space-y-2 cursor-pointer hover:border-indigo-500/30 transition-colors"
                onClick={() => navigate('/gap-analysis')}
            >
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
