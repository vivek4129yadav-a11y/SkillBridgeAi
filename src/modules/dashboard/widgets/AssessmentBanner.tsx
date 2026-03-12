import React from 'react';
import { useAssessmentStatus } from '@/hooks/useAssessment';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, PlayCircle, RefreshCw } from 'lucide-react';

export const AssessmentBanner: React.FC = () => {
    const { data: status, isLoading } = useAssessmentStatus();
    const navigate = useNavigate();

    if (isLoading || !status) return null;

    if (!status.has_completed && !status.has_incomplete) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-95"
                style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(234,88,12,0.1))', border: '1px solid rgba(251,146,60,0.3)' }}
                onClick={() => navigate('/assessment')}>
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2 bg-orange-100/50 rounded-xl shrink-0"><ClipboardList size={24} style={{ color: '#ea580c' }} /></div>
                    <div>
                        <p className="font-bold text-orange-900 text-base">📋 Take Your Skill Assessment</p>
                        <p className="text-sm font-medium mt-1 text-orange-800/80">Answer ~10 questions so we can map your skills accurately.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2" style={{ background: '#ea580c', color: 'white' }}>
                    Start Assessment →
                </button>
            </div>
        );
    }

    if (status.has_incomplete) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-5 rounded-2xl cursor-pointer transition-all hover:opacity-95 ring-2 ring-orange-400 ring-offset-2 ring-offset-orange-50 animate-pulse"
                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,88,12,0.1))', border: '1px solid rgba(234,88,12,0.3)' }}
                onClick={() => navigate('/assessment')}>
                <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                    <div className="p-2 bg-orange-100/50 rounded-xl shrink-0"><PlayCircle size={24} style={{ color: '#ea580c' }} /></div>
                    <div>
                        <p className="font-bold text-orange-900 text-base">⏸️ Continue Your Assessment</p>
                        <p className="text-sm font-medium mt-1 text-orange-800/80">You have an incomplete assessment.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-sm font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2" style={{ background: '#ea580c', color: 'white' }}>
                    Continue →
                </button>
            </div>
        );
    }

    if (status.has_completed && status.can_retake) {
        return (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between p-4 rounded-xl cursor-pointer transition-all hover:bg-gray-100"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                onClick={() => navigate('/assessment')}>
                <div className="flex items-center gap-3 mb-3 sm:mb-0 w-full sm:w-auto">
                    <div className="p-1.5 bg-gray-200 rounded-lg shrink-0"><RefreshCw size={18} style={{ color: '#475569' }} /></div>
                    <p className="font-semibold text-gray-700 text-sm">✅ Assessment Complete · Retake Available</p>
                </div>
                <button className="whitespace-nowrap w-full sm:w-auto text-xs font-bold px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Retake →
                </button>
            </div>
        );
    }

    return null; // Completed + no retakes
};
