import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Briefcase, 
  BookOpen, 
  Zap, 
  X, 
  TrendingUp, 
  Award, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Info,
  FileText,
  ClipboardCheck,
  Activity,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

const SeekerDashboard = () => {
  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();
  const [showNudgeModal, setShowNudgeModal] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const role = user?.user_type; // 'individual_youth', 'individual_bluecollar', 'individual_informal'

  // Unified Dashboard Summary Query
  const { data: summary, isLoading, refetch } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard/summary');
      return data.data;
    }
  });
  
  // Helper for "Time Ago"
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Extract data from summary
  const completionData = summary ? { score: summary.profile_completion_pct } : null;
  const skillGaps = summary?.ai_highlight; // Backend uses ai_highlight for the punchy sentence
  const jobs = summary?.job_matches || [];
  const courses = summary?.recommended_courses || [];
  const roleSpecificData = summary?.role_specific;
  const assessmentStatus = summary?.assessment_status;

  // Nudge Logic: Show if backend says show_assessment_nudge is true and we haven't dismissed it this session
  useEffect(() => {
    if (summary?.show_assessment_nudge && !nudgeDismissed) {
      const shownThisSession = sessionStorage.getItem('nudge_shown_this_session');
      if (!shownThisSession) {
        setShowNudgeModal(true);
        sessionStorage.setItem('nudge_shown_this_session', 'true');
      }
    }
  }, [summary, nudgeDismissed]);

  const handleDismissNudge = async () => {
    setShowNudgeModal(false);
    setNudgeDismissed(true);
    try {
      await api.post('/dashboard/nudge-shown');
      refetch(); // Update backend state in local cache
    } catch (err) {
      console.error("Failed to update nudge status:", err);
    }
  };

  const getRoleLabel = () => {
    if (role === 'individual_youth') return 'Student';
    if (role === 'individual_bluecollar') return 'Blue Collar Worker';
    if (role === 'individual_informal') return 'Informal Worker';
    return 'Seeker';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header & Profile Completion */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Hello, {summary?.user?.name?.split('@')[0]}</h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-gray-400 text-sm">Role: <span className="text-indigo-400 font-medium">{summary?.primary_role || getRoleLabel()}</span></p>
            {summary?.experience_years !== undefined && (
              <span className="px-2 py-0.5 bg-gray-800 text-gray-400 text-[10px] rounded-md border border-gray-700">
                {summary.experience_years} Year{summary.experience_years !== 1 ? 's' : ''} Exp
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-2xl flex items-center gap-4 min-w-[280px]">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - (completionData?.score || 0) / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              {completionData?.score || 0}%
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Profile Completion</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Complete your profile to unlock all features.</p>
          </div>
        </div>
      </div>

      {/* Assessment Nudge Modal */}
      {showNudgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-scale-in">
            <button onClick={handleDismissNudge} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
              <Zap size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Potential</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Take our 5-minute AI Career Assessment to get 10x better job matches and personalized skill recommendations.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { handleDismissNudge(); navigate('/assessment'); }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
              >
                Start Assessment
              </button>
              <button 
                onClick={handleDismissNudge}
                className="w-full py-4 bg-transparent text-gray-500 hover:text-gray-300 text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skill Gaps & Recommendations */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Skill Gap Summary / AI Insight */}
          <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart3 size={120} />
            </div>
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Zap size={20} />
              <h2 className="text-lg font-bold text-white">AI Career Insight</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl font-medium text-gray-100 leading-relaxed italic">
                "{skillGaps || "Complete your profile to get personalized AI career insights."}"
              </p>
            </div>
          </section>

          {/* My Skills Section */}
          <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
              <Award size={20} />
              <h2 className="text-lg font-bold text-white">My Verified Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {summary?.extracted_skills?.length > 0 ? (
                summary.extracted_skills.map((skill, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all hover:scale-105 cursor-default ${
                      skill.level >= 4 ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]" :
                      skill.level >= 3 ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      skill.level >= 2 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    }`}>
                      {skill.name}
                    </span>
                    <span className="text-[9px] text-gray-500 text-center uppercase tracking-wider">{skill.proficiency}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">Upload a resume or take an assessment to see your skills here.</p>
              )}
            </div>
          </section>

          {/* Recommended Jobs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase size={22} className="text-emerald-400" />
                Recommended Jobs
              </h2>
              <button onClick={() => navigate('/jobs')} className="text-sm text-emerald-400 hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs?.length > 0 ? jobs.map((job, i) => (
                <div key={job.id || i} className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl hover:border-emerald-500/40 transition-all group relative overflow-hidden">
                  {/* Match Score Indicator */}
                  <div className="absolute top-0 right-0 p-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 ${
                      job.match_score >= 80 ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" :
                      job.match_score >= 50 ? "border-amber-500 text-amber-400 bg-amber-500/5" :
                      "border-gray-600 text-gray-400 bg-gray-600/5"
                    }`}>
                      {job.match_score || 0}
                    </div>
                  </div>

                  <div className="flex flex-col mb-3 pr-10">
                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors text-base">{job.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{job.company}</p>
                  </div>

                  <div className="bg-gray-800/30 border border-gray-700/50 p-3 rounded-xl mb-4">
                    <p className="text-[10px] text-gray-300 leading-relaxed font-medium">
                      <span className="text-emerald-400 font-bold mr-1">Why:</span>
                      {job.reason_for_match || "Matches your profile interests."}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-5">
                    <span className="flex items-center gap-1"><Globe size={12} className="text-indigo-400" /> {job.location_city || job.location_state || 'India'}</span>
                    <span className="flex items-center gap-1"><TrendingUp size={12} className="text-emerald-400" /> {job.salary_min ? `₹${job.salary_min/1000}k - ₹${job.salary_max/1000}k` : 'Negotiable'}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="w-full py-2.5 bg-indigo-600/10 hover:bg-emerald-600 text-indigo-400 hover:text-white text-xs font-bold rounded-xl border border-indigo-600/20 hover:border-emerald-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              )) : (
                <div className="col-span-2 py-12 text-center border border-dashed border-gray-800 rounded-2xl text-gray-600 italic">
                  No jobs found matching your criteria yet.
                </div>
              )}
            </div>
          </section>

          {/* Recommended Courses */}
          <section>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <BookOpen size={22} className="text-amber-400" />
              Upskill for Better Pay
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {courses?.length > 0 ? courses.map((course, i) => (
                <div key={i} className="min-w-[280px] bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden group hover:border-amber-500/40 transition-all">
                  <div className="aspect-video bg-gray-800 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="text-xs font-bold text-white">{course.provider || 'SkillBridge'}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-4 h-10 group-hover:text-amber-400 transition-colors">{course.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">{course.type || 'Course'}</span>
                      <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        Enroll Now <ChevronRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="w-full py-8 text-center text-gray-600 text-sm border border-dashed border-gray-800 rounded-2xl">
                  Take an assessment to see personalized course recommendations.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Persistent Assessment & Role Specific */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Persistent Assessment Card */}
          <section className={`bg-gradient-to-br border p-6 rounded-3xl relative overflow-hidden group transition-all ${
            summary?.quick_assessment_done 
              ? "from-emerald-600/20 to-teal-600/20 border-emerald-500/30" 
              : "from-indigo-600/20 to-purple-600/20 border-indigo-500/30"
          }`}>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className={summary?.quick_assessment_done ? "text-emerald-400" : "text-indigo-400"} />
                <h2 className="text-lg font-bold text-white">AI Assessment</h2>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {summary?.quick_assessment_done 
                  ? "Your skills are verified. Retake anytime to keep your profile updated."
                  : "Your current profile is based on basic info. Take the assessment to verify your skills."
                }
              </p>
              <button 
                onClick={() => navigate('/assessment')}
                className={`w-full py-3 text-white text-sm font-bold rounded-xl transition-all shadow-lg ${
                  summary?.quick_assessment_done
                    ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                    : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20"
                }`}
              >
                {summary?.quick_assessment_done ? "Retake Assessment" : "Start Now"}
              </button>
            </div>
            <div className="absolute -bottom-8 -right-8 text-indigo-500/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Award size={140} />
            </div>
          </section>

          {/* Role Specific Section */}
          <section className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-indigo-400" />
              <h2 className="text-lg font-bold text-white">
                {roleSpecificData?.variant === 'student' && "Career Pathways"}
                {roleSpecificData?.variant === 'blue_collar' && "Market Pulse"}
                {roleSpecificData?.variant === 'informal_worker' && "Govt Benefits"}
                {!roleSpecificData && "Regional Trends"}
              </h2>
            </div>

            <div className="space-y-4">
              {roleSpecificData?.variant === 'student' && roleSpecificData.career_pathways?.map((path, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700 hover:border-indigo-500/30 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-white">{path.title}</p>
                    <span className="text-[10px] text-indigo-400 font-bold">{path.match_pct}% Match</span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${path.match_pct}%` }} />
                  </div>
                </div>
              ))}

              {roleSpecificData?.variant === 'blue_collar' && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-center">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase mb-1">Local Demand</p>
                      <p className="text-xl font-bold text-orange-400">{roleSpecificData.trade_pulse?.demand_level || 'High'}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-800" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase mb-1">Avg Salary</p>
                      <p className="text-xl font-bold text-emerald-400">₹{roleSpecificData.trade_pulse?.avg_salary_min || '10k'}+</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-800/40 border border-gray-700">
                    <p className="text-[11px] font-bold text-white mb-2 flex items-center gap-1"><Info size={12} /> Trade Tip</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">{roleSpecificData.trade_tips}</p>
                  </div>
                </div>
              )}

              {roleSpecificData?.variant === 'informal_worker' && (
                <div className="space-y-3">
                  {roleSpecificData.govt_schemes?.map((scheme, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">{scheme.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{scheme.benefit || scheme.description}</p>
                        <button className="text-[10px] font-bold text-emerald-400 mt-2">Check Eligibility →</button>
                      </div>
                    </div>
                  ))}
                  {roleSpecificData.digital_tips && (
                     <div className="mt-4 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                        <p className="text-[11px] font-bold text-white mb-2">Digital Tips</p>
                        <ul className="space-y-2">
                          {roleSpecificData.digital_tips.map((tip, i) => (
                            <li key={i} className="text-[10px] text-gray-400 flex items-center gap-2">
                              <Globe size={10} className="text-indigo-400" /> {tip}
                            </li>
                          ))}
                        </ul>
                     </div>
                  )}
                </div>
              )}

              {!roleSpecificData && <p className="text-xs text-gray-500 text-center py-4 italic">Complete onboarding to see role-specific insights.</p>}
            </div>
          </section>

          {/* Quick Support Card */}
          <section className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl text-center">
            <h3 className="text-sm font-bold text-white mb-2">Need help?</h3>
            <p className="text-[10px] text-gray-500 mb-4">Our AI assistant is available 24/7 to help you with jobs and skills.</p>
            <button 
              onClick={() => navigate('/chat')}
              className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Globe size={14} /> Open AI Career Coach
            </button>
          </section>
          
          {/* Recent Activity Feed */}
          <section className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity size={20} className="text-indigo-400" />
                Recent Activity
              </h2>
            </div>
            
            <div className="space-y-6">
              {summary?.recent_activity?.length > 0 ? (
                summary.recent_activity.map((activity, i) => (
                  <div key={activity.id || i} className="flex gap-4 relative">
                    {/* Timeline Connector */}
                    {i !== summary.recent_activity.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-800" />
                    )}
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 ${
                      activity.activity_type === 'resume_upload' ? "bg-blue-500/10 text-blue-400" :
                      activity.activity_type === 'assessment_complete' ? "bg-emerald-500/10 text-emerald-400" :
                      "bg-gray-800 text-gray-400"
                    }`}>
                      {activity.activity_type === 'resume_upload' && <FileText size={18} />}
                      {activity.activity_type === 'assessment_complete' && <ClipboardCheck size={18} />}
                      {!['resume_upload', 'assessment_complete'].includes(activity.activity_type) && <Activity size={18} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-white">{activity.description}</p>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock size={10} /> {timeAgo(activity.created_at)}
                        </span>
                      </div>
                      {activity.metadata?.role && (
                        <p className="text-[10px] text-gray-400">Targeting: <span className="text-indigo-400">{activity.metadata.role}</span></p>
                      )}
                      {activity.metadata?.score !== undefined && (
                        <p className="text-[10px] text-gray-400">Result: <span className="text-emerald-400">{activity.metadata.score}%</span></p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-gray-600 italic">No recent activity found.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
