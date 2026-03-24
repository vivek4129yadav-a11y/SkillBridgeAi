import React, { useState, useEffect } from 'react'
import { 
    BarChart3, 
    Sparkles, 
    User, 
    RotateCw,
    Download,
    ChevronLeft
} from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import ResumeUpload from '@/components/resume/ResumeUpload'
import ScoreDashboard from '@/components/resume/ScoreDashboard'
import SuggestionCards from '@/components/resume/SuggestionCards'
import ExtractedProfile from '@/components/resume/ExtractedProfile'

type AnalysisState = 'loading' | 'empty' | 'results'

const ResumeAnalysisPage: React.FC = () => {
    const [state, setState] = useState<AnalysisState>('loading')
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<'score' | 'suggestions' | 'profile'>('score')
    const [isReanalyzing, setIsReanalyzing] = useState(false)

    useEffect(() => {
        fetchLatest()
    }, [])

    const fetchLatest = async () => {
        setState('loading')
        const { data } = await resumeAnalysisService.getLatestAnalysis()
        if (data) {
            setData(data)
            setState('results')
        } else {
            setState('empty')
        }
    }

    const handleAnalysisComplete = (result: any) => {
        setData(result)
        setState('results')
        setIsReanalyzing(false)
    }

    if (state === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Loading your analysis...</p>
            </div>
        )
    }

    if (state === 'empty' || isReanalyzing) {
        return (
            <div className="container mx-auto px-4 py-8">
                {isReanalyzing && (
                    <button 
                        onClick={() => setIsReanalyzing(false)}
                        className="mb-8 text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Results
                    </button>
                )}
                <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
            </div>
        )
    }

    const tabs = [
        { id: 'score', label: 'Score Breakdown', icon: BarChart3 },
        { id: 'suggestions', label: 'AI Suggestions', icon: Sparkles },
        { id: 'profile', label: 'Extracted Profile', icon: User },
    ] as const

    const updatedAt = new Date(data.updated_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 animate-fade-in">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Analysis Live</span>
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        {data.structured_profile.full_name || 'Your Resume'}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Last updated on {updatedAt}</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsReanalyzing(true)}
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

            {/* Navigation Tabs */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit mx-auto md:mx-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            activeTab === tab.id 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <main className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                {activeTab === 'score' && <ScoreDashboard qualityScores={data.quality_scores} targetRoles={data.target_roles} />}
                {activeTab === 'suggestions' && <SuggestionCards suggestions={data.suggestions} />}
                {activeTab === 'profile' && <ExtractedProfile structuredProfile={data.structured_profile} />}
            </main>
        </div>
    )
}

export default ResumeAnalysisPage
