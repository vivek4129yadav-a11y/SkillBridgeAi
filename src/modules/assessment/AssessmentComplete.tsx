import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, LayoutDashboard, Loader2 } from 'lucide-react';
import { SkillItem } from '@/types/skills';
import ReactMarkdown from 'react-markdown';

interface AssessmentCompleteProps {
  skillsCount: number;
  skillsFound?: SkillItem[];
  assessmentSummary?: string;
  canRetake?: boolean;
  onRetake?: () => void;
  isRetaking?: boolean;
  retakesRemaining?: number;
}

export const AssessmentComplete: React.FC<AssessmentCompleteProps> = ({ 
  skillsCount, 
  skillsFound = [], 
  assessmentSummary,
  canRetake,
  onRetake,
  isRetaking,
  retakesRemaining = 0
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center animate-in zoom-in-95 duration-500">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
          <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10 bg-white rounded-full" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
      <p className="text-gray-500 mb-8 font-medium">We found {skillsCount} skills in your profile</p>
      
      {skillsFound.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skillsFound.map((sk, idx) => (
            <div 
              key={`${sk.skill_name}-${idx}`} 
              className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {sk.skill_name} <span className="text-blue-400 mx-1">•</span> {sk.proficiency_label}
            </div>
          ))}
        </div>
      )}

      {assessmentSummary && (
        <div className="bg-violet-50/50 rounded-2xl p-6 sm:p-8 mb-8 text-left border border-violet-100/80 shadow-inner relative overflow-hidden max-w-3xl mx-auto">
          <h4 className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-violet-100 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            Detailed Career Assessment Report
          </h4>
          <div className="report-markdown text-gray-700 leading-relaxed text-sm space-y-4">
            <ReactMarkdown>{assessmentSummary}</ReactMarkdown>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-left mb-2">
          <h4 className="text-sm font-bold text-blue-900 mb-1">What's Next?</h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            Your skills are now synchronized. We've updated your <strong>Gap Analysis</strong> to show exactly where you stand against your target roles and what's missing.
          </p>
        </div>

        <Link 
          to="/gap-analysis" 
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          Explore Gap Analysis <ChevronRight className="w-5 h-5" />
        </Link>

        {canRetake && onRetake && (
          <button
            onClick={onRetake}
            disabled={isRetaking}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white text-gray-700 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            {isRetaking ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Retake Assessment
          </button>
        )}

        {canRetake && retakesRemaining > 0 && (
          <div className="text-xs text-gray-500 font-medium -mt-2">
            {retakesRemaining} retake(s) remaining.
          </div>
        )}
        
        <Link 
          to="/dashboard" 
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-violet-600 font-semibold py-2 transition-colors text-sm"
        >
          <LayoutDashboard className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

