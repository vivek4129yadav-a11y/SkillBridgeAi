import React from 'react'
import { 
    GraduationCap, 
    Briefcase, 
    Lightbulb, 
    Info,
    TrendingUp
} from 'lucide-react'

interface Skill {
    name: string
    level: 'advanced' | 'intermediate' | 'beginner'
}

interface CareerTrajectory {
    direction: 'ascending' | 'lateral' | 'descending' | 'unclear'
    summary: string
    total_experience_months?: number
    average_tenure_months?: number
}

interface Experience {
    role: string
    company: string
    duration: string
    achievements: string[]
    responsibilities: string[]
    duration_months: number
}

interface Education {
    degree: string
    institution: string
    year: string
    is_vocational?: boolean
}

interface StructuredProfile {
    skills: Skill[]
    experiences: Experience[]
    education: Education[]
    soft_skills_inferred: string[]
    career_trajectory: CareerTrajectory
}

interface ExtractedProfileProps {
    structuredProfile: StructuredProfile
}

const ExtractedProfile: React.FC<ExtractedProfileProps> = ({ structuredProfile }) => {
    // skills is now a list of objects
    const skillsByLevel = (structuredProfile.skills || []).reduce((acc, skillObj) => {
        const level = (skillObj.level || 'intermediate').toLowerCase() as 'advanced' | 'intermediate' | 'beginner'
        const capitalizedLevel = (level.charAt(0).toUpperCase() + level.slice(1)) as 'Advanced' | 'Intermediate' | 'Beginner'
        if (!acc[capitalizedLevel]) acc[capitalizedLevel] = []
        acc[capitalizedLevel].push(skillObj.name)
        return acc
    }, {} as Record<string, string[]>)

    const levelConfig = {
        Advanced: { color: 'bg-blue-600 text-white', label: 'Advanced' },
        Intermediate: { color: 'bg-blue-100 text-blue-800', label: 'Intermediate' },
        Beginner: { color: 'bg-slate-100 text-slate-600', label: 'Beginner' }
    }

    const trajectory = structuredProfile.career_trajectory || { direction: 'unclear', summary: '' }
    const directionColors: Record<string, string> = {
        ascending: 'bg-green-50 text-green-600 border border-green-100',
        lateral: 'bg-blue-50 text-blue-600 border border-blue-100',
        descending: 'bg-orange-50 text-orange-600 border border-orange-100',
        unclear: 'bg-slate-50 text-slate-500 border border-slate-100'
    }

    return (
        <div className="space-y-12 animate-fade-in">
            {/* A: Skills Matrix */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Lightbulb className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-bold text-slate-800">Skills Matrix</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(['Advanced', 'Intermediate', 'Beginner'] as const).map((level) => (
                        <div key={level} className="space-y-3">
                            <h4 className={`text-[10px] font-bold uppercase tracking-widest ${
                                level === 'Advanced' ? 'text-blue-600' : 'text-slate-400'
                            }`}>
                                {level}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skillsByLevel[level]?.map((skill, idx) => (
                                    <span 
                                        key={idx} 
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold shadow-sm ${levelConfig[level].color}`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {(!skillsByLevel[level] || skillsByLevel[level].length === 0) && (
                                    <span className="text-xs text-slate-300 italic">None detected</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* B: Experience Timeline */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-lg font-bold text-slate-800">Experience Timeline</h3>
                    </div>
                    <div className={`flex flex-col items-end gap-1`}>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            directionColors[trajectory.direction.toLowerCase()] || directionColors.unclear
                        }`}>
                            <TrendingUp className="w-4 h-4" />
                            Path: {trajectory.direction}
                        </div>
                        {trajectory.summary && (
                            <p className="text-[10px] text-slate-400 max-w-[200px] text-right line-clamp-1 italic">
                                {trajectory.summary}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {structuredProfile.experiences.map((exp, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute -left-8 top-1.5 w-6 h-6 bg-white border-2 border-indigo-400 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
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
                                    {exp.achievements.slice(0, 2).map((a, i) => (
                                        <p key={i} className="text-[11px] text-slate-600 line-clamp-1">• {a}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* C: Education */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <GraduationCap className="w-5 h-5 text-emerald-500" />
                        <h3 className="text-lg font-bold text-slate-800">Education</h3>
                    </div>
                    <div className="space-y-4">
                        {(structuredProfile.education || []).map((edu, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-slate-900">{edu.degree}</h4>
                                        <p className="text-xs text-slate-500">{edu.institution}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">{edu.year}</span>
                                </div>
                                {edu.is_vocational && (
                                    <span className="mt-3 inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                        Vocational / ITI
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* D: Soft Skills Inferred */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Info className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-bold text-slate-800">Soft Skills Inferred</h3>
                    </div>
                    <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
                        Detected based on markers in your work descriptions and accomplishments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(structuredProfile.soft_skills_inferred || []).map((skill, idx) => (
                            <div 
                                key={idx} 
                                className="group relative flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-amber-300 hover:text-amber-700 transition-all cursor-help"
                            >
                                {skill}
                                <Info className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-400" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ExtractedProfile
