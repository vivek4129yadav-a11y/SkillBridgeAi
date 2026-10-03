import React, { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import { BulletImprovementResult } from './BulletImprovementResult'

const BulletImprover: React.FC = () => {
    const [bullet, setBullet] = useState('')
    const [targetRoles, setTargetRoles] = useState<string[]>([])
    const [roleInput, setRoleInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleImprove = async () => {
        if (!bullet.trim()) return
        
        setLoading(true)
        setResult(null)
        setError(null)
        
        const { data, error } = await resumeAnalysisService.improveBullet(bullet, targetRoles)
        
        if (data) {
            setResult(data)
        } else {
            setError(error?.message || 'Failed to improve bullet. Daily limit reached?')
        }
        setLoading(false)
    }

    return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-800">Point-Endpoint Improver</h3>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paste weak bullet point</label>
                    <textarea 
                        value={bullet}
                        onChange={(e) => setBullet(e.target.value)}
                        placeholder="e.g. Responsible for managing the sales team and checking inventory."
                        className="w-full h-24 p-4 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Roles (Optional, comma-separated)</label>
                        <input 
                            type="text" 
                            value={roleInput}
                            onChange={(e) => {
                                setRoleInput(e.target.value)
                                setTargetRoles(e.target.value.split(',').map(r => r.trim()).filter(Boolean))
                            }}
                            placeholder="e.g. Shift Supervisor, Manager"
                            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>
                    <button 
                        onClick={handleImprove}
                        disabled={loading || !bullet.trim()}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md disabled:opacity-50 transition-all flex items-center gap-2 whitespace-nowrap h-[42px]"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        Improve
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 animate-shake">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-xs font-medium">{error}</p>
                </div>
            )}

            {result && (
                <BulletImprovementResult 
                    original={result.original}
                    improved={result.improved}
                    reason={result.reason}
                />
            )}

            <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium text-center">
                    Uses Llama 3 for achievement-oriented refinement. 
                    <span className="text-slate-500 ml-1">Daily limits apply.</span>
                </p>
            </div>
        </div>
    )
}

export default BulletImprover
