import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Search, MapPin, Briefcase, Building2, Wallet, Clock, ArrowRight } from 'lucide-react'
import api from '@/lib/api'
import { Job } from '@/types'

export default function JobsPage() {
    const [stateFilter, setStateFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const { data: jobs = [], isLoading } = useQuery<Job[]>({
        queryKey: ['jobs', stateFilter, categoryFilter, searchQuery],
        queryFn: async () => {
            const params: Record<string, string> = {}
            if (stateFilter) params.state = stateFilter
            if (categoryFilter) params.category = categoryFilter
            if (searchQuery) params.query = searchQuery
            const { data } = await api.get('/jobs/', { params })
            return data.data
        },
    })

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Discover Opportunities</h1>
                    <p className="text-sm mt-2 text-gray-400 font-medium">Find the perfect role that matches your skills and location.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    {jobs.length} Jobs Available
                </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-gray-900/40 border border-gray-800 p-5 rounded-3xl backdrop-blur-md sticky top-4 z-10 shadow-xl space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Search Input */}
                    <div className="relative flex-grow group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by title, description, or company..." 
                            className="w-full bg-gray-950/50 border border-gray-800 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Group */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3">
                        <div className="relative w-full sm:w-48">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input 
                                className="w-full bg-gray-950/50 border border-gray-800 text-white pl-10 pr-3 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all text-sm placeholder:text-gray-600"
                                placeholder="State..." 
                                value={stateFilter} 
                                onChange={e => setStateFilter(e.target.value)} 
                            />
                        </div>
                        <div className="relative w-full sm:w-52">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <select 
                                className="w-full bg-gray-950/50 border border-gray-800 text-white pl-10 pr-8 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all text-sm appearance-none cursor-pointer"
                                value={categoryFilter} 
                                onChange={e => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All categories</option>
                                {['technology', 'healthcare', 'logistics', 'agriculture', 'manufacturing', 'hospitality', 'finance', 'education', 'construction', 'retail'].map(c => (
                                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl h-64 animate-pulse">
                            <div className="h-6 w-2/3 bg-gray-800 rounded-lg mb-4" />
                            <div className="h-4 w-1/3 bg-gray-800 rounded-lg mb-8" />
                            <div className="h-20 w-full bg-gray-800 rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map(job => (
                        <div 
                            key={job.id} 
                            id={`job-card-${job.id}`} 
                            className="group bg-gray-900/30 border border-gray-800/60 p-6 rounded-3xl hover:border-indigo-500/30 hover:bg-gray-900/50 transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-indigo-500/5"
                        >
                            {/* Accent Gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-all" />
                            
                            <div className="space-y-5 relative z-10">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Building2 size={14} className="text-indigo-500/70" />
                                            <span className="text-sm font-medium">{job.company}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="px-3 py-1 bg-gray-800/50 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-gray-700/50">
                                            {job.job_type?.replace('_', ' ')}
                                        </span>
                                        {job.work_mode && (
                                            <span className="text-[10px] font-semibold text-indigo-400 flex items-center gap-1">
                                                <Clock size={12} /> {job.work_mode}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
                                    <span className="flex items-center gap-1.5 bg-gray-800/30 px-2 py-1 rounded-md">
                                        <MapPin size={14} className="text-rose-500/70" /> 
                                        {job.location_city}, {job.location_state}
                                    </span>
                                    {job.salary_min && (
                                        <span className="flex items-center gap-1.5 bg-emerald-500/5 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/10 font-bold">
                                            <Wallet size={14} />
                                            ₹{(job.salary_min/1000).toFixed(0)}k - {(job.salary_max/1000).toFixed(0)}k
                                        </span>
                                    )}
                                </div>

                                <div className="bg-gray-950/40 border border-gray-800/40 p-4 rounded-2xl">
                                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                                        {job.description || "No description provided for this role. Click details to learn more about the responsibilities and requirements."}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {(job.required_skills || []).slice(0, 5).map(s => (
                                        <span key={s} className="px-2.5 py-1 bg-indigo-500/5 text-indigo-400 text-[10px] font-bold rounded-lg border border-indigo-500/10">
                                            {s}
                                        </span>
                                    ))}
                                    {job.required_skills?.length > 5 && (
                                        <span className="text-[10px] text-gray-600 font-bold self-center">+{job.required_skills.length - 5} more</span>
                                    )}
                                </div>
                            </div>

                            <button className="mt-8 w-full py-3 bg-gray-800/50 hover:bg-indigo-600 text-gray-300 hover:text-white text-xs font-bold rounded-2xl border border-gray-700 hover:border-indigo-500 transition-all flex items-center justify-center gap-2 group/btn relative z-10">
                                View Full Details
                                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                    {!isLoading && jobs.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4 bg-gray-900/20 border border-dashed border-gray-800 rounded-3xl">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-600">
                                <Search size={32} />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-300">No results found</p>
                                <p className="text-sm text-gray-600">We couldn't find any jobs matching your current filters or search query.</p>
                            </div>
                            <button 
                                onClick={() => { setSearchQuery(''); setStateFilter(''); setCategoryFilter(''); }}
                                className="text-indigo-400 text-sm font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

