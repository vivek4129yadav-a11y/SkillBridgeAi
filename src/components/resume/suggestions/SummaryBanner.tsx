import React, { useState } from 'react'
import { Lightbulb, Sparkles, Clipboard, Check } from 'lucide-react'

interface SummaryBannerProps {
    summary: string
}

export const SummaryBanner: React.FC<SummaryBannerProps> = ({ summary }) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
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
                    onClick={() => copyToClipboard(summary)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white/80 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm transition-all"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
            <p className="text-blue-800 leading-relaxed italic">
                "{summary}"
            </p>
        </div>
    )
}
