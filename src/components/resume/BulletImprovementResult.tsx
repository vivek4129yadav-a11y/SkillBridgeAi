import React, { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'

interface BulletImprovementResultProps {
    original: string
    improved: string
    reason: string
}

export const BulletImprovementResult: React.FC<BulletImprovementResultProps> = ({
    original,
    improved,
    reason
}) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(improved)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Original</p>
                <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-500 italic border border-slate-200">
                    {original}
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Polished Result</p>
                    <button 
                        type="button"
                        onClick={copyToClipboard}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    </button>
                </div>
                <div className="p-3 bg-white rounded-lg text-xs font-bold text-slate-800 border-2 border-indigo-100 shadow-sm relative group">
                    {improved}
                </div>
            </div>
            <div className="md:col-span-2">
                <p className="text-[10px] text-slate-400 italic">
                    <strong>AI Note:</strong> {reason}
                </p>
            </div>
        </div>
    )
}
