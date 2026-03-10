import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Zap, BarChart3, Briefcase, CheckCircle2 } from 'lucide-react'
import api from '@/lib/api'
import { DashboardData } from '@/types'

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
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
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

            {/* CTA Banners */}
            {!data.quick_assessment_done && (
                <div id="assessment-banner" className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(234,88,12,0.1))', border: '1px solid rgba(251,146,60,0.3)' }}
                    onClick={() => navigate('/coming-soon')}>
                    <div className="flex items-center gap-3">
                        <Zap size={20} style={{ color: '#fb923c' }} />
                        <div>
                            <p className="font-semibold text-white text-sm">Complete your Quick Assessment</p>
                            <p className="text-xs" style={{ color: 'hsl(220 15% 60%)' }}>Takes 5 minutes — improves your job matches significantly.</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(251,146,60,0.2)', color: '#fb923c' }}>Start →</span>
                </div>
            )}

            {!data.gap_analysis_done && (
                <div id="gap-analysis-banner" className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}
                    onClick={() => navigate('/coming-soon')}>
                    <div className="flex items-center gap-3">
                        <BarChart3 size={20} style={{ color: '#818cf8' }} />
                        <div>
                            <p className="font-semibold text-white text-sm">Run Your Skill Gap Analysis</p>
                            <p className="text-xs" style={{ color: 'hsl(220 15% 60%)' }}>Find exactly what skills you need for your target roles.</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>Analyze →</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <p className="text-xs mt-3" style={{ color: 'hsl(220 15% 55%)' }}>
                            {data.profile_completion_pct < 100 ? 'Complete your profile for better matches' : 'Profile complete!'}
                        </p>
                    </div>
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
                </div>

                {/* Career Interests */}
                <div className="card p-6">
                    <p className="text-sm font-medium mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Career Paths</p>
                    <div id="career-paths" className="flex flex-wrap gap-2">
                        {data.career_interests.length > 0
                            ? data.career_interests.map(interest => (
                                <span key={interest} className="badge capitalize">{interest}</span>
                            ))
                            : <p className="text-xs" style={{ color: 'hsl(220 15% 45%)' }}>Set your preferences to see paths.</p>
                        }
                    </div>
                    {data.location.state && (
                        <p className="text-xs mt-4" style={{ color: 'hsl(220 15% 45%)' }}>📍 {data.location.city}, {data.location.state}</p>
                    )}
                </div>
            </div>

            {/* Job Matches */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                    <Briefcase size={18} className="inline mr-2" style={{ color: '#818cf8' }} />
                    Top Job Matches
                </h3>
                <div id="job-matches" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.job_matches.length > 0 ? data.job_matches.map((job, i) => (
                        <div key={job.id || i} className="card p-5 space-y-3 hover:border-indigo-500/40 transition-all">
                            <div>
                                <p className="font-semibold text-white text-sm">{job.title}</p>
                                <p className="text-xs mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>{job.company}</p>
                            </div>
                            {job.location_city && <p className="text-xs" style={{ color: 'hsl(220 15% 50%)' }}>📍 {job.location_city}</p>}
                            {job.salary_min && (
                                <p className="text-xs font-medium" style={{ color: '#4ade80' }}>
                                    ₹{job.salary_min?.toLocaleString()} – ₹{job.salary_max?.toLocaleString()}/mo
                                </p>
                            )}
                            {(job.required_skills || []).slice(0, 3).map(s => (
                                <span key={s} className="badge mr-1 text-xs" style={{ fontSize: '10px' }}>{s}</span>
                            ))}
                            <button onClick={() => navigate('/jobs')} className="btn-ghost w-full text-xs mt-2">View Job →</button>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center py-8 text-sm" style={{ color: 'hsl(220 15% 45%)' }}>
                            Complete onboarding to see personalized job matches.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
