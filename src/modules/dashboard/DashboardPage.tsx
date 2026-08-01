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

                    {data.gap_analysis_done && data.gap_analysis_stale && (
                        <div id="gap-stale-banner" className="flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
                            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(185,28,28,0.1))', border: '1px solid rgba(239,68,68,0.3)' }}
                            onClick={() => navigate('/gap-analysis?rerun=true')}>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Gap Analysis is Outdated</p>
                                    <p className="text-xs" style={{ color: 'hsl(220 15% 60%)' }}>Your skills have changed since your last report. Recalculate now.</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-red-400" />
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
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-sm font-medium" style={{ color: 'hsl(220 15% 55%)' }}>Identified Skills</p>
                        {data.last_assessment_at && (
                            <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                <Clock size={10} />
                                {new Date(data.last_assessment_at).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <div id="skills-extracted" className="flex flex-wrap gap-2">
                        {data.extracted_skills.length > 0
                            ? data.extracted_skills.map(skill => (
                                <div key={skill.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" 
                                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                                    <span className="text-xs font-semibold text-indigo-200">{skill.name}</span>
                                    <span className="w-1 h-1 rounded-full bg-indigo-500/40" />
                                    <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider">{skill.proficiency}</span>
                                </div>
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
                    <button 
                        onClick={() => navigate('/jobs')} 
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/5 hover:bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/10 hover:border-indigo-500/20"
                    >
                        View All
                    </button>
                </div>
                <div id="job-matches" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.job_matches.length > 0 ? data.job_matches.map((job, i) => {
                        const j = job as any;
                        return (
                            <div key={job.id || i} className="card p-4 group hover:border-indigo-500/40 transition-all flex flex-col justify-between relative">
                                <div>
                                    {/* Header Row: Title & Match Score */}
                                    <div className="flex justify-between items-start gap-4 mb-1.5">
                                        <div className="flex-1">
                                            <p className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors line-clamp-1">{job.title}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{job.company}</p>
                                        </div>
                                        {j.match_score !== undefined && (
                                            <div className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center text-[10px] font-black border shrink-0 ${
                                                j.match_score >= 80 ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                                                j.match_score >= 50 ? "border-amber-500/30 text-amber-400 bg-amber-500/10" :
                                                "border-gray-700 text-gray-400 bg-gray-800"
                                            }`} title="Match Score">
                                                <span className="text-[8px] text-gray-500 font-medium -mb-0.5 leading-none">FIT</span>
                                                <span className="leading-tight">{j.match_score}%</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Metadata line (tags) */}
                                    <div className="flex flex-wrap gap-1 mb-2.5">
                                        {job.job_type && (
                                            <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[8px] font-extrabold rounded uppercase tracking-wider">
                                                {job.job_type.replace('_', ' ')}
                                            </span>
                                        )}
                                        {job.work_mode && (
                                            <span className="px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[8px] font-extrabold rounded uppercase tracking-wider">
                                                {job.work_mode}
                                            </span>
                                        )}
                                        {job.experience_min !== undefined && (
                                            <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[8px] font-extrabold rounded uppercase tracking-wider">
                                                {job.experience_min === 0 ? 'Entry Level' : `${job.experience_min}+ Yrs Exp`}
                                            </span>
                                        )}
                                    </div>

                                    {/* Skill Tags */}
                                    {job.required_skills && job.required_skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-2.5">
                                            {job.required_skills.slice(0, 3).map((skill, sIdx) => (
                                                <span key={sIdx} className="px-1.5 py-0.5 bg-gray-800/80 text-gray-355 border border-gray-700/60 rounded text-[8px] font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                            {job.required_skills.length > 3 && (
                                                <span className="px-1 py-0.5 text-gray-500 text-[8px] font-medium">
                                                    +{job.required_skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Match Reason Banner */}
                                    <div className="bg-gray-800/30 border border-gray-800 p-2.5 rounded-lg mb-3">
                                        <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                                            <span className="text-emerald-400 font-bold mr-1">Match Reason:</span>
                                            {j.reason_for_match || "Matches your profile interests."}
                                        </p>
                                    </div>
                                </div>

                                {/* Location, Salary and Details CTA */}
                                <div className="pt-2.5 border-t border-gray-800/50 flex items-center justify-between">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">📍 {job.location_city || 'Remote'}</span>
                                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                                            ₹ {job.salary_min ? `${(job.salary_min/1000).toFixed(0)}k - ${job.salary_max ? `${(job.salary_max/1000).toFixed(0)}k` : ''}` : 'Negotiable'}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/jobs/${job.id}`)}
                                        className="px-3 py-1.5 bg-indigo-600/10 hover:bg-emerald-600 text-indigo-400 hover:text-white text-[10px] font-bold rounded-lg border border-indigo-600/20 hover:border-emerald-600 transition-all shrink-0"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    }) : (
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
                            Upskill for Better Pay
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.recommended_courses.map((course: any, i: number) => (
                            <div key={i} className="card p-4 rounded-xl flex flex-col justify-between hover:border-indigo-500/40 transition-all group relative min-h-[170px]">
                                <div>
                                    {/* Top Row: Provider & Category Badges */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] font-black rounded">
                                            {course.provider || 'SkillBridge'}
                                        </span>
                                        <span className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                                            {course.category || 'Vocational'}
                                        </span>
                                    </div>

                                    {/* Course Title */}
                                    <h3 className="text-xs font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-indigo-300 transition-colors min-h-[32px]">
                                        {course.title || course.name}
                                    </h3>

                                    {/* Skill Tags */}
                                    {course.skill_tags && course.skill_tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {course.skill_tags.slice(0, 2).map((tag: string, tIdx: number) => (
                                                <span key={tIdx} className="px-1.5 py-0.5 bg-gray-800/60 text-gray-400 text-[8px] font-medium rounded">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Stats & CTA */}
                                <div className="pt-2.5 border-t border-gray-800/80 flex items-center justify-between mt-auto">
                                    <div className="flex flex-col gap-0.5 text-[9px] text-gray-500 font-medium">
                                        {course.duration_weeks && (
                                            <span>⏱ {course.duration_weeks} Weeks</span>
                                        )}
                                        <span>
                                            📶 {course.difficulty_level === 1 ? 'Beginner' : course.difficulty_level === 2 ? 'Intermediate' : course.difficulty_level >= 3 ? 'Advanced' : 'All Levels'}
                                            {course.language && ` • ${course.language === 'hi' ? 'Hindi' : 'English'}`}
                                        </span>
                                    </div>

                                    <a 
                                        href={course.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 bg-indigo-500/5 px-2.5 py-1.5 rounded-lg border border-indigo-500/10 hover:border-indigo-500/20 hover:bg-indigo-500/10 transition-all shrink-0"
                                    >
                                        Enroll <ChevronRight size={10} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
