import { MapPin, Briefcase, Star } from 'lucide-react'
import { Job } from '@/types'

interface JobCardProps {
    job: Job & { affinity_score?: number }
}

export default function JobCard({ job }: JobCardProps) {
    const affinityPercent = job.affinity_score ? Math.round(job.affinity_score * 100) : null

    return (
        <div id={`job-card-${job.id}`} className="card p-5 space-y-3 hover:border-indigo-500/40 transition-all border border-transparent relative overflow-hidden group">
            {affinityPercent !== null && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500/20 text-indigo-400 border-l border-b border-indigo-500/30 rounded-bl-xl text-[10px] font-bold flex items-center gap-1.5 z-10 backdrop-blur-sm">
                    <Star size={10} className="fill-indigo-400" />
                    <span>AI MATCH: {affinityPercent}%</span>
                </div>
            )}
            
            <div className="flex items-start justify-between pr-20">
                <div>
                    <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{job.title}</h3>
                    <p className="text-sm mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>{job.company}</p>
                </div>
                <span className="badge text-[10px] capitalize shrink-0 py-0.5">{job.job_type?.replace('_', ' ')}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]" style={{ color: 'hsl(220 15% 50%)' }}>
                <span className="flex items-center gap-1 shrink-0"><MapPin size={12} /> {job.location_city}, {job.location_state}</span>
                {job.work_mode && <span className="flex items-center gap-1 shrink-0"><Briefcase size={12} /> {job.work_mode}</span>}
            </div>

            {job.salary_min && (
                <p className="text-sm font-medium" style={{ color: '#4ade80' }}>
                    ₹{job.salary_min.toLocaleString()} – ₹{(job.salary_max || 0).toLocaleString()}/month
                </p>
            )}

            <div className="flex flex-wrap gap-1.5">
                {(job.required_skills || []).slice(0, 4).map(s => (
                    <span key={s} className="badge !bg-indigo-500/10 !text-indigo-300 !border-indigo-500/20 text-[10px] border">
                        {s}
                    </span>
                ))}
            </div>

            {job.description && (
                <p className="text-[11px] line-clamp-2 leading-relaxed" style={{ color: 'hsl(220 15% 50%)' }}>
                    {job.description}
                </p>
            )}
            
            <button className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/30 transition-all mt-1 opacity-80 group-hover:opacity-100">
                Apply Now
            </button>
        </div>
    )
}
