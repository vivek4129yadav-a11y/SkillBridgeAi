import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Plus, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Search, 
  MapPin, 
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Filter
} from 'lucide-react';
import api from '@/lib/api';
import { queryClient } from '@/lib/queryClient';
import { 
  BarChart, 
  Activity, 
  CheckCircle, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  ShieldCheck,
  Target
} from 'lucide-react';

const EmployerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queries
  const { data: jobPostings, isLoading: jobsLoading } = useQuery({
    queryKey: ['my-postings'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/jobs/my-postings');
        return data.data;
      } catch (err) {
        return []; // Fallback to empty
      }
    }
  });

  const { data: talentMatches, isLoading: talentLoading } = useQuery({
    queryKey: ['talent-matches'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/talent/matches');
        return data.data;
      } catch (err) {
        return []; // Fallback to empty
      }
    }
  });

  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get('title'),
      company: formData.get('company'),
      location: formData.get('location'),
      location_state: formData.get('location_state'),
      type: formData.get('type'),
      salary: formData.get('salary'),
      category: formData.get('category'),
      description: formData.get('description'),
    };

    try {
      await api.post('/jobs', jobData);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['my-postings'] });
    } catch (err) {
      console.error('Failed to post job:', err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Employer Hub</h1>
          <p className="text-gray-400 mt-1">Manage your postings and discover top talent.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Post New Job
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Postings', value: jobPostings?.length || 0, icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Total Applicants', value: '1,284', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'AI Screened', value: '842', icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Hiring Velocity', value: '+24%', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4 hover:border-white/20 transition-all cursor-default">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Postings + Funnel */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hiring Funnel */}
          <div className="glass-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BarChart size={22} className="text-indigo-400" />
                Recruitment Funnel
              </h2>
              <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Real-time Analysis</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Sourced', value: '1,284', color: 'bg-indigo-500', pct: '100%' },
                { label: 'Matched', value: '412', color: 'bg-purple-500', pct: '32%' },
                { label: 'Screened', value: '156', color: 'bg-amber-500', pct: '12%' },
                { label: 'Hired', value: '12', color: 'bg-emerald-500', pct: '1%' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="h-24 bg-gray-900/40 rounded-2xl border border-gray-800 p-4 flex flex-col justify-end overflow-hidden group">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 ${item.color} opacity-10 transition-all duration-1000`} 
                      style={{ height: item.pct }}
                    />
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <div className="absolute top-4 right-4 text-[10px] font-black text-gray-700">{item.pct}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <LayoutDashboard size={22} className="text-indigo-400" />
              Active Job Postings
            </h2>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white">
                <Filter size={18} />
              </button>
              <button className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 hover:text-white">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {jobsLoading ? (
              [1, 2].map(i => <div key={i} className="h-32 bg-gray-900/40 animate-pulse rounded-2xl border border-gray-800" />)
            ) : jobPostings?.length > 0 ? (
              jobPostings.map((job, i) => (
                <div key={job.id || i} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{job.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location || 'Bhopal, MP'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> Posted 2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-white">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-4">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Applicants</p>
                        <p className="text-sm font-bold text-white">{job.applicants_count || 12}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Status</p>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Active</span>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      Manage Applications <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center border border-dashed border-gray-800 rounded-3xl">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-700">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-gray-400 font-bold">No active postings</h3>
                <p className="text-gray-600 text-sm mt-1 mb-6">Post your first job to start finding talent.</p>
                <button 
                   onClick={() => setIsModalOpen(true)}
                   className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all"
                >
                  Create Posting
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Intelligence + Talent */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Activity Feed */}
          <div className="glass-card p-6">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-6">
              <Activity size={18} className="text-rose-400" />
              AI Agent Activity
            </h2>
            <div className="space-y-6">
              {[
                { type: 'match', text: 'AI matched 4 new candidates for Electrician role', time: '2m ago' },
                { type: 'screen', text: 'Interview completed for Senior Developer', time: '14m ago' },
                { type: 'jd', text: 'JD Optimized for Marketing Intern', time: '1h ago' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i < 2 && <div className="absolute left-2 top-6 bottom-[-16px] w-[2px] bg-gray-800" />}
                  <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 z-10 ${
                    act.type === 'match' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' :
                    act.type === 'screen' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="text-xs text-gray-300 leading-relaxed">{act.text}</p>
                    <p className="text-[10px] text-gray-600 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={20} className="text-amber-400" />
              Top AI Matches
            </h2>
            <button className="text-[10px] font-bold text-indigo-400 hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {talentLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-28 bg-gray-900/40 animate-pulse rounded-2xl border border-gray-800" />)
            ) : talentMatches?.length > 0 ? (
              talentMatches.map((person, i) => (
                <div key={person.id || i} className="glass-card p-5 hover:border-indigo-500/40 transition-all group relative overflow-hidden">
                  <div className="flex gap-4 relative z-10">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-800 rounded-2xl flex-shrink-0 border border-gray-700 overflow-hidden group-hover:border-indigo-500/50 transition-all">
                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-800 to-gray-900">
                          <Users size={24} />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center text-[8px] text-white font-bold">
                        <Zap size={8} fill="white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-all">{person.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">{person.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                            {person.match}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(person.top_skills || []).map((s, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 bg-gray-900/80 text-gray-400 rounded-md border border-gray-800 group-hover:border-indigo-500/20 transition-all">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action overlay on hover */}
                  <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))
            ) : (
              <div className="p-12 text-center glass-card border-dashed">
                <Target size={32} className="mx-auto text-gray-700 mb-4 opacity-20" />
                <p className="text-gray-500 text-xs italic">Awaiting new job postings to start AI matchmaking.</p>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                AI Agent Booster
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Your AI agents are currently screening at 80% capacity. Enable 'Turbo Mode' to source from premium partner networks.
              </p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                Enable Turbo Mode
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-all duration-700">
              <Zap size={140} />
            </div>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2">Create New Job Posting</h2>
            <p className="text-gray-400 mb-8">Fill in the details to find the best matching talent.</p>
            
            <form className="space-y-6" onSubmit={handlePostSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Job Title</label>
                  <input name="title" type="text" className="input-field" placeholder="e.g. Senior Electrician" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Company Name</label>
                  <input name="company" type="text" className="input-field" placeholder="e.g. Acme Corp" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">City</label>
                  <input name="location" type="text" className="input-field" placeholder="e.g. Bhopal" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">State</label>
                  <select name="location_state" className="input-field" required>
                    <option value="madhya_pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="tamil_nadu">Tamil Nadu</option>
                    <option value="uttar_pradesh">Uttar Pradesh</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Employment Type</label>
                  <select name="type" className="input-field">
                    <option value="full_time">Full-time</option>
                    <option value="part_time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="gig">Gig / Freelance</option>
                    <option value="apprenticeship">Apprenticeship</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Monthly Salary (INR)</label>
                  <input name="salary" type="text" className="input-field" placeholder="e.g. 25,000 - 35,000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Job Category</label>
                  <select name="category" className="input-field">
                    <option value="IT & Software">IT & Software</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Construction">Construction</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Logistics">Logistics</option>
                    <option value="General">General / Others</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Requirements & Description</label>
                <textarea name="description" rows={4} className="input-field resize-none h-32" placeholder="What are you looking for in a candidate?"></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={isPosting}
                  className="flex-grow py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  {isPosting ? 'Publishing...' : 'Publish Posting'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal X icon for the modal
const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default EmployerDashboard;
