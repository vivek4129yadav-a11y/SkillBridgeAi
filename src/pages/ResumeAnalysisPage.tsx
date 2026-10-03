import React, { useState, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import ResumeUpload from '@/components/resume/ResumeUpload'
import ScoreDashboard from '@/components/resume/ScoreDashboard'
import SuggestionCards from '@/components/resume/SuggestionCards'
import ExtractedProfile from '@/components/resume/ExtractedProfile'
import { ResumeLoadingState } from './resume/ResumeLoadingState'
import { ResumePageHeader } from './resume/ResumePageHeader'
import { ResumePageTabs, TabKey } from './resume/ResumePageTabs'

type AnalysisState = 'loading' | 'empty' | 'results'

const ResumeAnalysisPage: React.FC = () => {
    const [state, setState] = useState<AnalysisState>('loading')
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<TabKey>('score')
    const [isReanalyzing, setIsReanalyzing] = useState(false)

    useEffect(() => {
        fetchLatest()
    }, [])

    const fetchLatest = async () => {
        setState('loading')
        const { data: result } = await resumeAnalysisService.getLatestAnalysis()
        if (result) {
            setData(result)
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
        return <ResumeLoadingState />
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

    const formatUpdatedDate = () => {
        const rawDate = data?.updated_at || data?.created_at
        if (rawDate) {
            const d = new Date(rawDate)
            if (!isNaN(d.getTime())) {
                return d.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            }
        }
        return 'Just now'
    }

    const candidateName = data?.structured_profile?.full_name || 'Your Resume'

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 animate-fade-in">
            <ResumePageHeader 
                candidateName={candidateName} 
                updatedAt={formatUpdatedDate()} 
                onReanalyze={() => setIsReanalyzing(true)} 
            />

            <ResumePageTabs activeTab={activeTab} onChange={setActiveTab} />

            <main className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                {activeTab === 'score' && (
                    <ScoreDashboard 
                        qualityScores={data?.quality_scores || {}} 
                        targetRoles={data?.target_roles || []} 
                    />
                )}
                {activeTab === 'suggestions' && (
                    <SuggestionCards 
                        suggestions={data?.suggestions || {}} 
                    />
                )}
                {activeTab === 'profile' && (
                    <ExtractedProfile 
                        structuredProfile={data?.structured_profile || {}} 
                    />
                )}
            </main>
        </div>
    )
}

export default ResumeAnalysisPage
