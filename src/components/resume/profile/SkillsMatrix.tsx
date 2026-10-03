import React from 'react'
import { Lightbulb } from 'lucide-react'
import { Skill } from './types'

interface SkillsMatrixProps {
    skills: Skill[]
}

const levelConfig = {
    Advanced: { color: 'bg-blue-600 text-white', label: 'Advanced' },
    Intermediate: { color: 'bg-blue-100 text-blue-800', label: 'Intermediate' },
    Beginner: { color: 'bg-slate-100 text-slate-600', label: 'Beginner' }
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills = [] }) => {
    const skillsByLevel = skills.reduce((acc: Record<string, string[]>, skillObj: any) => {
        const skillName = typeof skillObj === 'string' ? skillObj : (skillObj?.name || '')
        if (!skillName) return acc
        const rawLevel = typeof skillObj === 'object' && skillObj?.level ? skillObj.level : 'intermediate'
        const level = String(rawLevel).toLowerCase() as 'advanced' | 'intermediate' | 'beginner'
        const capitalizedLevel = (level.charAt(0).toUpperCase() + level.slice(1)) as 'Advanced' | 'Intermediate' | 'Beginner'
        const key = ['Advanced', 'Intermediate', 'Beginner'].includes(capitalizedLevel) ? capitalizedLevel : 'Intermediate'
        if (!acc[key]) acc[key] = []
        acc[key].push(skillName)
        return acc
    }, {} as Record<string, string[]>)

    return (
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
                            {skillsByLevel[level]?.map((skill: string, idx: number) => (
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
    )
}
