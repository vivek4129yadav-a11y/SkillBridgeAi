import React from 'react'
import { Briefcase, TrendingUp } from 'lucide-react'
import { Experience, CareerTrajectory } from './types'

interface ExperienceTimelineProps {
    experiences: Experience[]
    trajectory?: CareerTrajectory
}

const directionColors: Record<string, string> = {
    ascending: 'bg-green-50 text-green-600 border border-green-100',
    lateral: 'bg-blue-50 text-blue-600 border border-blue-100',
    descending: 'bg-orange-50 text-orange-600 border border-orange-100',
    unclear: 'bg-slate-50 text-slate-500 border border-slate-100'
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ 
    experiences = [], 
    trajectory = { direction: 'unclear', summary: '' } 
}) => {
    const normTrajectory = (typeof trajectory === 'object' && trajectory !== null)
        ? {
            direction: String(trajectory.direction || 'unclear').toLowerCase(),
            summary: trajectory.summary || '',
        }
        : {
            direction: 'unclear',
            summary: typeof trajectory === 'string' ? trajectory : '',
        }

    const items = experiences.map((exp: any) => ({
        role: exp?.role || 'Professional Role',
        company: exp?.company || 'Organization',
        duration: exp?.duration || (exp?.duration_months ? `${exp.duration_months} months` : 'Completed'),
        achievements: Array.isArray(exp?.achievements) ? exp.achievements : [],
        responsibilities: Array.isArray(exp?.responsibilities) ? exp.responsibilities : [],
    }))

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg font-bold text-slate-800">Experience Timeline</h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        directionColors[normTrajectory.direction] || directionColors.unclear
                    }`}>
                        <TrendingUp className="w-4 h-4" />
                        Path: {normTrajectory.direction}
                    </div>
                    {normTrajectory.summary && (
                        <p className="text-[10px] text-slate-400 max-w-[200px] text-right line-clamp-1 italic">
                            {normTrajectory.summary}
                        </p>
                    )}
                </div>
            </div>
            
            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {items.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No formal work experiences detected.</p>
                ) : (
                    items.map((exp, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-8 top-1.5 w-6 h-6 bg-white border-2 border-indigo-400 rounded-full group-hover:bg-indigo-400 transition-colors" />
                            <div className="space-y-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                    <h4 className="font-bold text-slate-900">{exp.role}</h4>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{exp.duration}</span>
                                </div>
                                <p className="text-sm font-medium text-indigo-600">{exp.company}</p>
                                
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Impact</span>
                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                        <div 
                                            className="h-full bg-indigo-500" 
                                            style={{ width: `${(exp.achievements.length / (exp.achievements.length + exp.responsibilities.length || 1)) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-500">
                                        {exp.achievements.length} Achievements
                                    </span>
                                </div>
                                
                                <div className="mt-2 space-y-1">
                                    {exp.achievements.slice(0, 2).map((a: string, i: number) => (
                                        <p key={i} className="text-[11px] text-slate-600 line-clamp-1">• {a}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
