import React from 'react';
import { useGapReport } from '@/hooks/useGapAnalysis';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Search, RefreshCw, Layers } from 'lucide-react';
import { useSkillProfile } from '@/hooks/useSkills';

export const GapAnalysisBanner: React.FC = () => {
    const { data: report, isLoading: isReportLoading, error: reportError } = useGapReport();
    const { data: profile, isLoading: isProfileLoading } = useSkillProfile();
    const navigate = useNavigate();

    if (isReportLoading || isProfileLoading) return null;

    const hasSkills = profile && profile.skills && profile.skills.length > 0;
    const isNoSkillsError = reportError && (reportError as any)?.response?.data?.detail?.error_code === 'GAP_ANALYSIS_NO_SKILLS';

    // No skills yet
    if (!hasSkills || isNoSkillsError) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl transition-all"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2 bg-blue-100/50 rounded-xl shrink-0"><Search size={24} style={{ color: '#2563eb' }} /></div>
                    <div>
                        <p className="font-bold text-blue-900 text-base">🔍 Run Your Gap Analysis</p>
                        <p className="text-sm font-medium mt-1 text-blue-800/80">Complete your assessment or upload a resume first.</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button onClick={() => navigate('/assessment')} className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                        Take Assessment
                    </button>
                    <button onClick={() => navigate('/profile')} className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-4 py-2 bg-white text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 transition">
                        Upload Resume
                    </button>
                </div>
            </div>
        );
    }

    // Has skills, no report yet (or some other error)
    if (!report && hasSkills && !reportError) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl transition-all hover:bg-blue-50/50"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}
                onClick={() => navigate('/gap-analysis')}>
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2 bg-blue-100/50 rounded-xl shrink-0"><BarChart3 size={24} style={{ color: '#2563eb' }} /></div>
                    <div>
                        <p className="font-bold text-blue-900 text-base">🔍 Discover Your Skill Gaps</p>
                        <p className="text-sm font-medium mt-1 text-blue-800/80">See exactly what skills to learn for jobs in your area.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2" style={{ background: '#2563eb', color: 'white' }}>
                    Run Analysis →
                </button>
            </div>
        );
    }

    if (report && report.is_stale) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-95 ring-2 ring-blue-400 ring-offset-2 ring-offset-blue-50 animate-pulse"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.1))', border: '1px solid rgba(59,130,246,0.3)' }}
                onClick={() => navigate('/gap-analysis')}>
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2 bg-blue-100/50 rounded-xl shrink-0"><RefreshCw size={24} style={{ color: '#2563eb' }} /></div>
                    <div>
                        <p className="font-bold text-blue-900 text-base">🔄 Refresh Your Gap Analysis</p>
                        <p className="text-sm font-medium mt-1 text-blue-800/80">Your profile has changed. Get updated recommendations.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2" style={{ background: '#2563eb', color: 'white' }}>
                    Refresh →
                </button>
            </div>
        );
    }

    if (report && !report.is_stale) {
        const relativeTime = (dateStr: string) => {
            const d = new Date(dateStr);
            const now = new Date();
            const diffHours = Math.round((now.getTime() - d.getTime()) / (1000 * 60 * 60));
            if (diffHours < 1) return 'Just now';
            if (diffHours === 1) return '1 hour ago';
            if (diffHours < 24) return `${diffHours} hours ago`;
            return `${Math.floor(diffHours / 24)} days ago`;
        };

        return (
             <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 rounded-xl cursor-pointer transition-all hover:bg-gray-100"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                onClick={() => navigate('/gap-analysis')}>
                <div className="flex items-center gap-3 mb-3 sm:mb-0 w-full sm:w-auto">
                    <div className="p-1.5 bg-gray-200 rounded-lg shrink-0"><Layers size={18} style={{ color: '#475569' }} /></div>
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">📊 View Your Gap Analysis</p>
                      <p className="text-xs font-medium mt-0.5 text-gray-500">Last run: {relativeTime(report.computed_at)}</p>
                    </div>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-xs font-bold px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                    View →
                </button>
            </div>
        );
    }

    return null;
};
