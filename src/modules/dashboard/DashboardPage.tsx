import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Zap, BarChart3, Briefcase, CheckCircle2, Sparkles, TrendingUp, BookOpen, Lightbulb, Globe, Award, ChevronRight, Clock } from 'lucide-react'
import api from '@/lib/api'
import { DashboardData } from '@/types'
import ResumeScoreWidget from '@/components/resume/ResumeScoreWidget'
import { useAuthStore } from '@/store/authStore'
import { SEEKER_ROLES, isSeeker } from '@/constants/roles'

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
    const user = useAuthStore(s => s.user)
    const isSeekerRole = isSeeker(user?.user_type)
    console.log('[DASHBOARD] User Role:', user?.user_type, 'Is Seeker:', isSeekerRole)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            {/* Welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Welcome back, {data.user.name?.split(' ')[0] || 'there'} 👋</h2>
                    <p className="text-sm mt-1" style={{ color: 'hsl(220 15% 55%)' }}>Here's what's happening with your career today.</p>
                </div>
                {data.ai_highlight && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <Sparkles size={16} className="text-indigo-400 animate-pulse" />
                        <span className="text-xs font-medium text-indigo-300 italic">"{data.ai_highlight}"</span>
                    </div>
                )}
            </div>

            {/* CTA Banners */}
            {isSeekerRole && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!data.quick_assessment_done && (
                        <div id="assessment-banner" className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
                            style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(234,88,12,0.1))', border: '1px solid rgba(251,146,60,0.3)' }}
                            onClick={() => navigate('/assessment')}>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Complete your Quick Assessment</p>
                                    <p className="text-xs" style={{ color: 'hsl(220 15% 60%)' }}>Takes 5 minutes — improves your job matches significantly.</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-orange-400" />
                        </div>
                    )}

                    {!data.gap_analysis_done && (
                        <div id="gap-analysis-banner" className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
                            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}
                            onClick={() => navigate('/gap-analysis')}>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Run Your Skill Gap Analysis</p>
                                    <p className="text-xs" style={{ color: 'hsl(220 15% 60%)' }}>Find exactly what skills you need for your target roles.</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-indigo-400" />
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Completion */}
                <div className="card p-6 flex flex-col justify-between">
                    <div>
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
                        </div>
                    </div>
                    <p className="text-xs mt-3 text-center" style={{ color: 'hsl(220 15% 55%)' }}>
                        {data.profile_completion_pct < 100 ? 'Complete your profile for better matches' : 'Profile complete!'}
                    </p>
                </div>

                {/* Extracted Skills */}
                <div className="card p-6">
                    <p className="text-sm font-medium mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Identified Skills</p>
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
                        <div className="flex items-center gap-1.5 mt-auto pt-4">
                            <Globe size={14} style={{ color: 'hsl(220 15% 45%)' }} />
                            <p className="text-xs font-medium" style={{ color: 'hsl(220 15% 45%)' }}>{data.location.city}, {data.location.state}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Role-Specific Content */}
            {data.role_specific && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                    {data.role_specific.variant === 'student' && (
                        <>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-indigo-400" />
                                    Career Pathways
                                </h3>
                                <div className="space-y-4">
                                    {data.role_specific.career_pathways?.map((path: any, i: number) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-300 font-medium">{path.title}</span>
                                                <span className="text-indigo-400">{path.match_pct}% Match</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${path.match_pct}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Award size={18} className="text-indigo-400" />
                                    Competitive Exams for You
                                </h3>
                                <div className="space-y-3">
                                    {data.role_specific.competitive_exams?.length ? data.role_specific.competitive_exams.map((exam: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                                            <div>
                                                <p className="text-xs font-semibold text-white">{exam.title || exam.name}</p>
                                                <p className="text-[10px] text-gray-500">{exam.category || 'National Level'}</p>
                                            </div>
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">View Date</span>
                                        </div>
                                    )) : (
                                        <p className="text-xs text-gray-500 text-center py-4">No exams scheduled currently.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {data.role_specific.variant === 'blue_collar' && (
                        <>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <TrendingUp size={18} className="text-orange-400" />
                                    Market Pulse ({data.location.state})
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Job Demand</p>
                                        <p className="text-lg font-bold text-orange-400">{data.role_specific.trade_pulse?.demand_level || 'High'}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Avg. Salary</p>
                                        <p className="text-lg font-bold text-emerald-400">₹{data.role_specific.trade_pulse?.avg_salary_min?.toLocaleString()}+</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-dashed border-gray-800 flex gap-3">
                                    <Lightbulb size={16} className="text-orange-400 shrink-0" />
                                    <p className="text-[11px] text-gray-400 leading-relaxed"><span className="text-orange-300 font-medium">Pro Tip:</span> {data.role_specific.trade_tips}</p>
                                </div>
                            </div>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Award size={18} className="text-orange-400" />
                                    Trade Apprenticeships
                                </h3>
                                <div className="space-y-3">
                                    {data.role_specific.apprenticeships?.length ? data.role_specific.apprenticeships.map((job: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                                            <div>
                                                <p className="text-xs font-semibold text-white">{job.title}</p>
                                                <p className="text-[10px] text-gray-500">{job.company}</p>
                                            </div>
                                            <span className="text-[10px] font-medium text-orange-400">Apply →</span>
                                        </div>
                                    )) : (
                                        <p className="text-xs text-gray-500 text-center py-4">Searching for apprenticeship opportunities...</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {data.role_specific.variant === 'informal_worker' && (
                        <>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Lightbulb size={18} className="text-emerald-400" />
                                    Micro-Business Ideas
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {data.role_specific.micro_biz_ideas?.map((idea: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <p className="text-xs text-gray-300">{idea}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card p-6">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                    <Globe size={18} className="text-emerald-400" />
                                    Digital Skills for You
                                </h3>
                                <div className="space-y-3">
                                    {data.role_specific.digital_tips?.map((tip: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                                            <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                                            <p className="text-xs text-gray-400 leading-relaxed">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Resume Analysis Widget (Full Width) */}
            {isSeekerRole && (
                <div className="w-full">
                    <ResumeScoreWidget />
                </div>
            )}

            {/* Job Matches */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Briefcase size={20} className="text-indigo-400" />
                        Top Job Matches
                    </h3>
                    <button onClick={() => navigate('/jobs')} className="text-xs font-medium text-indigo-400 hover:text-indigo-300">View All</button>
                </div>
                <div id="job-matches" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.job_matches.length > 0 ? data.job_matches.map((job, i) => (
                        <div key={job.id || i} className="card p-5 group hover:border-indigo-500/40 transition-all flex flex-col justify-between min-h-[180px]">
                            <div>
                                <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors">{job.title}</p>
                                <p className="text-[11px] mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>{job.company}</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {(job.required_skills || []).slice(0, 2).map(s => (
                                        <span key={s} className="badge text-[10px] py-0.5 px-2 bg-gray-800 border-none">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between">
                                {job.salary_min ? (
                                    <p className="text-[11px] font-bold text-emerald-400">
                                        ₹{job.salary_min >= 1000 ? `${(job.salary_min/1000).toFixed(1)}k` : job.salary_min}/mo
                                    </p>
                                ) : <div />}
                                <span className="text-[11px] text-gray-500">📍 {job.location_city || 'Remote'}</span>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-3 text-center py-12 rounded-2xl bg-gray-900/30 border border-dashed border-gray-800">
                            <Briefcase size={32} className="mx-auto text-gray-700 mb-3" />
                            <p className="text-sm text-gray-500">Complete onboarding to see personalized job matches.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommended Training */}
            {data.recommended_courses && data.recommended_courses.length > 0 && (
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <BookOpen size={20} className="text-indigo-400" />
                            Recommended Training
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.recommended_courses.map((course: any, i: number) => (
                            <div key={i} className="card overflow-hidden group cursor-pointer hover:border-indigo-500/30 transition-all">
                                <div className="aspect-video w-full bg-gray-800 relative">
                                    {course.thumbnail_url ? (
                                        <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                                            <BookOpen size={24} className="text-gray-700" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider">
                                        {course.level || 'Beginner'}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs font-bold text-white line-clamp-2 leading-tight h-8 mb-2">{course.title}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={10} className="text-gray-500" />
                                            <span className="text-[10px] text-gray-500">{course.duration || '4 Weeks'}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-indigo-400">{course.provider || 'Coursera'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
