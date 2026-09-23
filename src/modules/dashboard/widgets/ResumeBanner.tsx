import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';

interface ScoreBreakdownData {
    overall_score?: number;
    quality_scores?: {
        ats_compatibility?: number;
        quantification_score?: number;
        section_completeness?: number;
        readability_score?: number;
        keyword_relevance?: number;
    };
    india_flags?: string[];
}

export const ResumeBanner: React.FC = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery<ScoreBreakdownData | null>({
        queryKey: ['resume-score-breakdown'],
        queryFn: async () => {
            try {
                const res = await api.get('/resume/score-breakdown');
                return res.data || null;
            } catch {
                return null;
            }
        },
        retry: 1,
    });

    if (isLoading) return null;

    if (!data || data.overall_score === undefined || data.overall_score === null) {
        return (
            <div
                className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-95"
                style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))',
                    border: '1px solid rgba(129,140,248,0.3)',
                }}
                onClick={() => navigate('/resume-analysis')}
            >
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2.5 bg-indigo-500/20 rounded-xl shrink-0">
                        <FileText size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-white text-base">📄 Analyze Your Resume for ATS Readiness</p>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300">
                                Instant ATS
                            </span>
                        </div>
                        <p className="text-sm font-medium mt-1 text-slate-300">
                            Upload your resume for real-time ATS scoring, keyword matching, and verified skill extraction.
                        </p>
                    </div>
                </div>
                <button
                    className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition hover:opacity-90"
                    style={{ background: '#6366f1', color: 'white' }}
                >
                    Analyze Resume <ArrowRight size={16} />
                </button>
            </div>
        );
    }

    const score = data.overall_score;
    const scoreColor = score >= 75 ? '#4ade80' : score >= 50 ? '#fb923c' : '#f87171';

    return (
        <div
            className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-95"
            style={{
                background: 'linear-gradient(135deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
                border: '1px solid rgba(148,163,184,0.2)',
            }}
            onClick={() => navigate('/resume-analysis')}
        >
            <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                <div
                    className="p-2.5 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: `${scoreColor}20` }}
                >
                    <CheckCircle2 size={24} style={{ color: scoreColor }} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-base">✅ Resume ATS Score: {score}/100</p>
                        <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: `${scoreColor}25`, color: scoreColor }}
                        >
                            {score >= 75 ? 'Strong Match' : score >= 50 ? 'Needs Polish' : 'Needs Optimization'}
                        </span>
                    </div>
                    <p className="text-sm font-medium mt-1 text-slate-400">
                        {data.quality_scores
                            ? `Formatting: ${data.quality_scores.ats_compatibility || 0}% · Impact: ${data.quality_scores.quantification_score || 0}% · Sections: ${data.quality_scores.section_completeness || 0}%`
                            : 'View keyword match and bullet point improvements.'}
                    </p>
                </div>
            </div>
            <button
                className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white transition"
            >
                View Full Analysis <ArrowRight size={16} />
            </button>
        </div>
    );
};
