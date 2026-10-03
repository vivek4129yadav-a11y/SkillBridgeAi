import React from 'react'
import { Info } from 'lucide-react'

interface SoftSkillsSectionProps {
    softSkills: string[]
}

export const SoftSkillsSection: React.FC<SoftSkillsSectionProps> = ({ softSkills = [] }) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-800">Soft Skills Inferred</h3>
            </div>
            <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
                Detected based on markers in your work descriptions and accomplishments.
            </p>
            <div className="flex flex-wrap gap-2">
                {softSkills.length === 0 ? (
                    <span className="text-xs text-slate-300 italic">None detected</span>
                ) : (
                    softSkills.map((skill, idx) => (
                        <div 
                            key={idx} 
                            className="group relative flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-amber-300 hover:text-amber-700 transition-all cursor-help"
                        >
                            {skill}
                            <Info className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-400" />
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
