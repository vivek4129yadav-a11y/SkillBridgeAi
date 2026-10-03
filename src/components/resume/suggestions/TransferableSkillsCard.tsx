import React from 'react'

interface TransferableSkillsCardProps {
    transferableSkills: string[]
}

export const TransferableSkillsCard: React.FC<TransferableSkillsCardProps> = ({ transferableSkills = [] }) => {
    if (!transferableSkills || transferableSkills.length === 0) return null

    return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-amber-900 mb-3">Hidden Strengths Found</h3>
            <div className="flex flex-wrap gap-2">
                {transferableSkills.map((skill, idx) => (
                    <span 
                        key={idx} 
                        className="px-3 py-1.5 bg-white text-amber-700 text-xs font-bold rounded-lg border border-amber-200 shadow-sm capitalize"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}
