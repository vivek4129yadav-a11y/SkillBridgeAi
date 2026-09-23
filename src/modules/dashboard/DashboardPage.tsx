import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Zap, BarChart3, Brain } from 'lucide-react'
import api from '@/lib/api'
import { DashboardData } from '@/types'
import ResumeScoreWidget from '@/components/resume/ResumeScoreWidget'
import RecommendationsWidget from './widgets/RecommendationsWidget'
import CareerIdentityCard from './widgets/CareerIdentityCard'
import SkillGapWidget from './widgets/SkillGapWidget'
import { AssessmentBanner } from './widgets/AssessmentBanner'
import { GapAnalysisBanner } from './widgets/GapAnalysisBanner'

function useDashboard() {
    return useQuery<DashboardData>({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const { data } = await api.get('/dashboard/summary')
            return data.data
        },
    })
}

export default function DashboardPage() {
    const { data, isLoading } = useDashboard()
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-10 w-64 bg-white/5 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
                </div>
                <div className="h-48 bg-white/5 rounded-2xl" />
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome */}
            <div>
                <h2 className="text-2xl font-bold text-white">Welcome back, {data.user.name?.split(' ')[0] || 'there'} 👋</h2>
                <p className="text-sm mt-1" style={{ color: 'hsl(220 15% 55%)' }}>Here's your career snapshot.</p>
            </div>

            {/* Dynamic CTA Banners */}
            <div className="space-y-4">
                <AssessmentBanner />
                <GapAnalysisBanner />
            </div>

            {/* Row 1: Career Identity + Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Career Identity — spans 2 cols */}
                <div className="md:col-span-2">
                    <CareerIdentityCard />
                </div>

                {/* Profile Completion */}
                <div className="card p-6">
                    <p className="text-sm font-medium mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Profile Completion</p>
                    <div id="profile-completion" className="flex flex-col items-center">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(222 30% 18%)" strokeWidth="10" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="10"
                                    strokeDasharray={`${2 * Math.PI * 40}`}
                                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - data.profile_completion_pct / 100)}`}
                                    className="transition-all duration-1000" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">{data.profile_completion_pct}%</span>
                            </div>
                        </div>
                        <p className="text-xs mt-3 text-center" style={{ color: 'hsl(220 15% 55%)' }}>
                            {data.profile_completion_pct < 100 ? 'Complete your profile for better matches' : 'Profile complete!'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Row 2: Skill Gap + Skills + Career Paths */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Skill Gap widget */}
                <div className="md:col-span-2">
                    <SkillGapWidget />
                </div>

                {/* Extracted Skills */}
                <div className="card p-6">
                    <p className="text-sm font-medium mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Skills Found</p>
                    <div id="skills-extracted" className="flex flex-wrap gap-2">
                        {data.extracted_skills.length > 0
                            ? data.extracted_skills.map(skill => (
                                <span key={skill} className="badge" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>{skill}</span>
                            ))
                            : <p className="text-xs" style={{ color: 'hsl(220 15% 45%)' }}>Complete the assessment to extract skills.</p>
                        }
                    </div>
                    {data.career_interests.length > 0 && (
                        <>
                            <p className="text-sm font-medium mb-2 mt-4" style={{ color: 'hsl(220 15% 55%)' }}>Career Paths</p>
                            <div id="career-paths" className="flex flex-wrap gap-2">
                                {data.career_interests.map(interest => (
                                    <span key={interest} className="badge capitalize">{interest}</span>
                                ))}
                            </div>
                        </>
                    )}
                    {data.location.state && (
                        <p className="text-xs mt-4" style={{ color: 'hsl(220 15% 45%)' }}>📍 {data.location.city}, {data.location.state}</p>
                    )}
                </div>
            </div>

            {/* Resume Analysis Widget */}
            <ResumeScoreWidget />

            {/* AI Recommendations */}
            <RecommendationsWidget />
        </div>
    )
}
