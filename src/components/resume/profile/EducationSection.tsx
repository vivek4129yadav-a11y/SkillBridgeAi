import React from 'react'
import { GraduationCap } from 'lucide-react'
import { Education } from './types'

interface EducationSectionProps {
    education: Education[]
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education = [] }) => {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-800">Education</h3>
            </div>
            <div className="space-y-4">
                {education.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No education history detected.</p>
                ) : (
                    education.map((edu, idx) => (
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
                    ))
                )}
            </div>
        </section>
    )
}
