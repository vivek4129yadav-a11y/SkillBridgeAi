import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Search, MapPin, Briefcase } from 'lucide-react'
import api from '@/lib/api'
import { Job } from '@/types'

export default function JobsPage() {
    const [stateFilter, setStateFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')

    const { data: jobs = [], isLoading } = useQuery<Job[]>({
        queryKey: ['jobs', stateFilter, categoryFilter],
        queryFn: async () => {
            const params: Record<string, string> = {}
            if (stateFilter) params.state = stateFilter
            if (categoryFilter) params.category = categoryFilter
            const { data } = await api.get('/jobs/', { params })
            return data.data
        },
    })

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-white">Job Listings</h2>
                <p className="text-sm mt-1" style={{ color: 'hsl(220 15% 55%)' }}>Browse opportunities matched to your region and skills.</p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
                <input id="state-filter" className="input-field max-w-48" placeholder="Filter by state..." value={stateFilter} onChange={e => setStateFilter(e.target.value)} />
                <select id="category-filter" className="input-field max-w-52" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="">All categories</option>
                    {['technology', 'healthcare', 'logistics', 'agriculture', 'manufacturing', 'hospitality', 'finance', 'education', 'construction', 'retail'].map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {isLoading && <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map(job => (
                    <div key={job.id} id={`job-card-${job.id}`} className="card p-5 space-y-3 hover:border-indigo-500/40 transition-all">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-white">{job.title}</h3>
                                <p className="text-sm mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>{job.company}</p>
                            </div>
                            <span className="badge text-xs capitalize">{job.job_type?.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'hsl(220 15% 50%)' }}>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location_city}, {job.location_state}</span>
                            {job.work_mode && <span className="flex items-center gap-1"><Briefcase size={12} /> {job.work_mode}</span>}
                        </div>
                        {job.salary_min && (
                            <p className="text-sm font-medium" style={{ color: '#4ade80' }}>
                                ₹{job.salary_min.toLocaleString()} – ₹{(job.salary_max || 0).toLocaleString()}/month
                            </p>
                        )}
                        <div className="flex flex-wrap gap-1">
                            {(job.required_skills || []).slice(0, 4).map(s => <span key={s} className="badge text-xs">{s}</span>)}
                        </div>
                        {job.description && <p className="text-xs line-clamp-2" style={{ color: 'hsl(220 15% 50%)' }}>{job.description}</p>}
                    </div>
                ))}
                {!isLoading && jobs.length === 0 && (
                    <div className="col-span-2 text-center py-16 text-sm" style={{ color: 'hsl(220 15% 45%)' }}>
                        No jobs found for these filters. Try a different state or category.
                    </div>
                )}
            </div>
        </div>
    )
}
