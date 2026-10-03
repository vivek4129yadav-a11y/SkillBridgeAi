import React, { useState, useEffect } from 'react';
import { GapReport } from '@/types/gap';
import { Clock, RefreshCw, Layers, CheckCircle } from 'lucide-react';

interface ReportHeaderProps {
  report: GapReport;
  onRerun: () => void;
  isRerunning: boolean;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ report, onRerun, isRerunning }) => {
  const [rerunStep, setRerunStep] = useState(0);

  useEffect(() => {
    if (isRerunning) {
      setRerunStep(1);
      const timers = [
        setTimeout(() => setRerunStep(2), 1500),
        setTimeout(() => setRerunStep(3), 3000),
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setRerunStep(0);
    }
  }, [isRerunning]);

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
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
          <div className="flex flex-wrap items-center text-sm font-medium text-gray-500 gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> Last analysed: {relativeTime(report.computed_at)}</span>
            {report.total_jobs_analyzed > 0 && (
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4"/> Based on {report.total_jobs_analyzed} jobs</span>
            )}
          </div>
        </div>
        
        <button
          onClick={onRerun}
          disabled={isRerunning}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-700 font-bold rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 border border-blue-200"
        >
          <RefreshCw className={`w-4 h-4 ${isRerunning ? 'animate-spin' : ''}`} />
          {isRerunning ? 'Analyzing...' : 'Re-run Analysis'}
        </button>
      </div>

      {isRerunning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 max-w-sm w-full text-center">
             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-6">Updating your report</h3>
             
             <div className="space-y-4 text-left font-medium">
               <div className={`flex items-center gap-3 transition-opacity duration-500 ${rerunStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                 <CheckCircle className={`w-5 h-5 ${rerunStep > 1 ? 'text-green-500' : 'text-blue-500'}`} />
                 <span className={rerunStep > 1 ? 'text-gray-900' : 'text-blue-700'}>Fetching latest job data...</span>
               </div>
               <div className={`flex items-center gap-3 transition-opacity duration-500 ${rerunStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <CheckCircle className={`w-5 h-5 ${rerunStep > 2 ? 'text-green-500' : (rerunStep === 2 ? 'text-blue-500' : 'text-gray-300')}`} />
                 <span className={rerunStep > 2 ? 'text-gray-900' : (rerunStep === 2 ? 'text-blue-700' : 'text-gray-500')}>Scoring your skill gaps...</span>
               </div>
               <div className={`flex items-center gap-3 transition-opacity duration-500 ${rerunStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="w-5 h-5 flex items-center justify-center">
                    {rerunStep === 3 ? <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                 </div>
                 <span className={rerunStep === 3 ? 'text-blue-700' : 'text-gray-500'}>Building learning roadmap...</span>
               </div>
             </div>
           </div>
        </div>
      )}
    </>
  );
};
