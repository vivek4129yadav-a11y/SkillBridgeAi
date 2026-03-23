import { useQuery } from '@tanstack/react-query'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'
import { Job } from '@/types'
import JobCard from '../../jobs/components/JobCard'

export default function RecommendationsWidget() {
    const { data: recommendations = [], isLoading } = useQuery<(Job & { affinity_score: number })[]>({
        queryKey: ['job-recommendations'],
        queryFn: async () => {
            const { data } = await api.get('/recommendations/')
            return data.data
        },
    })

    if (isLoading) {
        return (
            <div className="card p-6 space-y-4 animate-pulse">
                <div className="h-6 w-48 bg-white/5 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white/5 rounded-xl border border-white/10" />)}
                </div>
            </div>
        )
    }

    if (recommendations.length === 0) {
        return (
            <div className="card p-8 text-center space-y-4 border-dashed border-white/10 bg-transparent">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-400">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">No recommendations yet</h3>
                    <p className="text-sm text-balance max-w-md mx-auto mt-1" style={{ color: 'hsl(220 15% 55%)' }}>
                        Update your career profile or upload a fresh resume to help our AI find the best matches for you.
                    </p>
                </div>
                <Link to="/profile" className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium hover:underline">
                    Complete your profile <ArrowRight size={14} />
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-400" />
                    <h2 className="text-lg font-bold text-white">Recommended for You</h2>
                </div>
                <Link to="/jobs" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors">
                    View all jobs <ArrowRight size={12} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.slice(0, 3).map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}
