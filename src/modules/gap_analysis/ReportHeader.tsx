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
      <div className="glass-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Skill Gap Analysis</h1>
          <div className="flex flex-wrap items-center text-sm font-medium text-muted gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400"/> Last analysed: {relativeTime(report.computed_at)}</span>
            {report.total_jobs_analyzed > 0 && (
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-indigo-400"/> Based on {report.total_jobs_analyzed} jobs</span>
            )}
          </div>
        </div>
        
        <button
          onClick={onRerun}
          disabled={isRerunning}
          className="btn-secondary whitespace-nowrap"
        >
          <RefreshCw className={`w-4 h-4 ${isRerunning ? 'animate-spin' : ''}`} />
          {isRerunning ? 'Analyzing...' : 'Re-run Analysis'}
        </button>
      </div>

      {isRerunning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="card p-8 max-w-sm w-full text-center glow-indigo">
             <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
             </div>
             <h3 className="text-xl font-bold text-white mb-6">Updating your report</h3>
             
             <div className="space-y-4 text-left font-medium">
               <div className={`flex items-center gap-3 transition-all duration-500 ${rerunStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                 <CheckCircle className={`w-5 h-5 ${rerunStep > 1 ? 'text-emerald-500' : 'text-indigo-500'}`} />
                 <span className={rerunStep > 1 ? 'text-white' : 'text-indigo-400'}>Fetching latest job data...</span>
               </div>
               <div className={`flex items-center gap-3 transition-all duration-500 ${rerunStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <CheckCircle className={`w-5 h-5 ${rerunStep > 2 ? 'text-emerald-500' : (rerunStep === 2 ? 'text-indigo-500' : 'text-faint')}`} />
                 <span className={rerunStep > 2 ? 'text-white' : (rerunStep === 2 ? 'text-indigo-400' : 'text-muted')}>Scoring your skill gaps...</span>
               </div>
               <div className={`flex items-center gap-3 transition-all duration-500 ${rerunStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="w-5 h-5 flex items-center justify-center">
                    {rerunStep === 3 ? <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-border" />}
                 </div>
                 <span className={rerunStep === 3 ? 'text-indigo-400' : 'text-muted'}>Building learning roadmap...</span>
               </div>
             </div>
           </div>
        </div>
      )}
    </>
  );
};
