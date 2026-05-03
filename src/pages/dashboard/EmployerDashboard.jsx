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
      location: formData.get('location'),
      type: formData.get('type'),
      salary: formData.get('salary'),
      description: formData.get('description'),
    };

    try {
      await api.post('/jobs', jobData);
      setIsModalOpen(false);
      // In a real app, we'd refetch postings here
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Postings', value: jobPostings?.length || 0, icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Total Applicants', value: '48', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Avg. Match Score', value: '82%', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Job Postings */}
        <div className="lg:col-span-8 space-y-6">
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

        {/* Right: Talent Matches */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users size={22} className="text-emerald-400" />
            AI Talent Matches
          </h2>

          <div className="space-y-4">
            {talentLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-900/40 animate-pulse rounded-2xl border border-gray-800" />)
            ) : talentMatches?.length > 0 ? (
              talentMatches.map((person, i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 p-4 rounded-2xl hover:border-emerald-500/30 transition-all flex gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex-shrink-0 border border-gray-700 overflow-hidden">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <Users size={24} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{person.name || "Candidate " + (i+1)}</h4>
                      <span className="text-[10px] text-emerald-400 font-bold">{person.match_score || "94"}%</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{person.current_role || "Skilled Electrician"}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(person.skills || ["Wiring", "Safety", "Maintenance"]).map((s, idx) => (
                        <span key={idx} className="text-[8px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded-md border border-gray-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-gray-900/20 border border-dashed border-gray-800 rounded-3xl">
                <p className="text-gray-600 text-xs italic">Matches will appear once you have active job postings.</p>
              </div>
            )}
          </div>

          {/* Integration Card */}
          <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/30 p-6 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400" />
                Verified Talent Only
              </h3>
              <p className="text-[10px] text-gray-300 leading-relaxed mb-4">
                All candidates in our top-tier pool have completed AI skill assessments and trade verifications.
              </p>
              <button className="text-[10px] font-bold text-amber-400 hover:underline">Learn about our vetting process →</button>
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
                  <input name="title" type="text" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Senior Electrician" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Location</label>
                  <input name="location" type="text" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Bhopal, MP" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Employment Type</label>
                  <select name="type" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Monthly Salary (INR)</label>
                  <input name="salary" type="text" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" placeholder="e.g. 25,000 - 35,000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Requirements & Description</label>
                <textarea name="description" rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all resize-none" placeholder="What are you looking for in a candidate?"></textarea>
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
