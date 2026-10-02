import React from 'react'
import { RotateCw, Download } from 'lucide-react'

interface ResumePageHeaderProps {
    candidateName: string
    updatedAt: string
    onReanalyze: () => void
}

export const ResumePageHeader: React.FC<ResumePageHeaderProps> = ({ 
    candidateName, 
    updatedAt, 
    onReanalyze 
}) => {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                    Analysis Live
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900">
                    {candidateName}
                </h1>
                <p className="text-sm text-slate-500 font-medium">Last updated on {updatedAt}</p>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={onReanalyze}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-sm"
                >
                    <RotateCw className="w-4 h-4" />
                    Re-analyze
                </button>
                <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all text-sm"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>
        </header>
    )
}
