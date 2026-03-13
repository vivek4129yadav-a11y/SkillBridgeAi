import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Sparkles, ChevronRight, ArrowRight } from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import ScoreRing from './ScoreRing'

const ResumeScoreWidget: React.FC = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchScores = async () => {
            const { data } = await resumeAnalysisService.getScoreBreakdown()
            if (data) setData(data)
            setLoading(false)
        }
        fetchScores()
    }, [])

    if (loading) {
        return (
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-6 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
                <div className="flex justify-center py-4">
                    <div className="w-20 h-20 rounded-full bg-slate-100"></div>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 h-full flex flex-col justify-between hover:border-blue-200 transition-colors group">
                <div>
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Resume Score</h3>
                    <p className="text-sm text-slate-500">Analyze your resume to see how you rank against peers.</p>
                </div>
                <Link 
                    to="/resume-analysis" 
                    className="mt-6 flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-2xl transition-all"
                >
                    Get Analysis
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 h-full flex flex-col hover:shadow-lg hover:shadow-slate-200/50 transition-all">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Resume Health</h3>
                <Link to="/resume-analysis" className="text-blue-600 hover:text-blue-800">
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="flex items-center gap-6">
                <ScoreRing 
                    score={data.overall_score} 
                    label="" 
                    size="sm" 
                />
                <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Insights</span>
                        </div>
                        <div className="space-y-1.5">
                            {data.india_flags?.slice(0, 2).map((flag: string, idx: number) => (
                                <p key={idx} className="text-[10px] text-slate-600 font-medium line-clamp-1 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-orange-400"></span>
                                    {flag}
                                </p>
                            ))}
                            {(!data.india_flags || data.india_flags.length === 0) && (
                                <p className="text-[10px] text-green-600 font-bold">✨ Profile looks solid!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Link 
                to="/resume-analysis" 
                className="mt-auto pt-6 text-xs font-bold text-blue-600 flex items-center gap-1 group"
            >
                View full breakdown
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    )
}

export default ResumeScoreWidget
