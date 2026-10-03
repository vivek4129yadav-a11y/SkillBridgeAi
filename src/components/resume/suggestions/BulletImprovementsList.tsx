import React, { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { BulletImprovement } from './types'

interface BulletImprovementsListProps {
    bulletImprovements: BulletImprovement[]
}

export const BulletImprovementsList: React.FC<BulletImprovementsListProps> = ({ bulletImprovements }) => {
    const [expandedBullets, setExpandedBullets] = useState<number[]>([])

    const toggleBullet = (idx: number) => {
        setExpandedBullets(prev => 
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Impactful Improvements
            </h3>
            {bulletImprovements.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400 italic">
                    Your bullet points already follow strong action-oriented standards!
                </div>
            ) : (
                <div className="space-y-3">
                    {bulletImprovements.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <button 
                                onClick={() => toggleBullet(idx)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="text-sm font-medium text-slate-700 truncate pr-4">
                                    {item.original}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedBullets.includes(idx) ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedBullets.includes(idx) && (
                                <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Before</p>
                                        <p className="text-sm text-slate-500 line-through decoration-red-300 bg-red-50/30 p-2 rounded">{item.original}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-green-500 uppercase tracking-wider">Better</p>
                                        <p className="text-sm text-slate-800 bg-green-50/50 p-2 rounded border border-green-100">{item.improved}</p>
                                    </div>
                                    <p className="text-xs text-slate-400 italic">
                                        <strong>Why:</strong> {item.reason}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
