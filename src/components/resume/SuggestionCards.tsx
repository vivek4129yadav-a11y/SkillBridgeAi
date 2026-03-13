import React, { useState } from 'react'
import { 
    Clipboard, 
    Check, 
    ChevronDown, 
    Lightbulb, 
    AlertTriangle,
    Sparkles
} from 'lucide-react'
import BulletImprover from './BulletImprover'

interface BulletImprovement {
    original: string
    improved: string
    reason: string
}

interface Suggestions {
    summary_generated: string
    bullet_improvements: BulletImprovement[]
    skills_to_add: string[]
    skills_to_reframe: Record<string, string>
    india_specific_flags: string[]
    transferable_skills_detected: string[]
}

interface SuggestionCardsProps {
    suggestions: Suggestions
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ suggestions }) => {
    const [copied, setCopied] = useState(false)
    const [expandedBullets, setExpandedBullets] = useState<number[]>([])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const toggleBullet = (idx: number) => {
        setExpandedBullets(prev => 
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* A: Professional Summary */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-16 h-16 text-blue-600" />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Professional Summary
                    </h3>
                    <button 
                        onClick={() => copyToClipboard(suggestions.summary_generated)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white/80 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm transition-all"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>
                <p className="text-blue-800 leading-relaxed italic">
                    "{suggestions.summary_generated}"
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* B: Bullet Improvements */}
                <div className="space-y-4">
                    <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        Impactful Improvements
                    </h3>
                    <div className="space-y-3">
                        {suggestions.bullet_improvements.map((item, idx) => (
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
                </div>

                <div className="space-y-6">
                    {/* C: India Specific Flags */}
                    {suggestions.india_specific_flags.length > 0 && (
                        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-5 h-5" />
                                India-First Optimization
                            </h3>
                            <ul className="space-y-2">
                                {suggestions.india_specific_flags.map((flag, idx) => (
                                    <li key={idx} className="text-xs text-orange-800 flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                                        {flag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* D: Better Ways to Say It */}
                    {Object.keys(suggestions.skills_to_reframe).length > 0 && (
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Stronger Phrasing</h3>
                            <div className="overflow-hidden border border-slate-100 rounded-lg">
                                <table className="w-full text-xs">
                                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Your Term</th>
                                            <th className="px-4 py-3 text-left">The Pro Version</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {Object.entries(suggestions.skills_to_reframe).map(([weak, strong], idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-4 py-3 text-slate-500 italic">{weak}</td>
                                                <td className="px-4 py-3 font-semibold text-blue-600">{strong}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* E: Hidden Strengths (Transferable) */}
                    {suggestions.transferable_skills_detected.length > 0 && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-amber-900 mb-3">Hidden Strengths Found</h3>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.transferable_skills_detected.map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-white text-amber-700 text-xs font-bold rounded-lg border border-amber-200 shadow-sm capitalize">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* F: Interactive Tool */}
                    <div className="pt-4">
                        <BulletImprover />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCards
