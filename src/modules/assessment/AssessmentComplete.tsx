import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, LayoutDashboard } from 'lucide-react';
import { SkillItem } from '@/types/skills';

interface AssessmentCompleteProps {
  skillsCount: number;
  skillsFound?: SkillItem[];
  assessmentSummary?: string;
}

export const AssessmentComplete: React.FC<AssessmentCompleteProps> = ({ 
  skillsCount, 
  skillsFound = [], 
  assessmentSummary 
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
        <div className="bg-violet-50 rounded-2xl p-6 mb-8 text-left border border-violet-100 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl font-serif">"</span>
          </div>
          <h4 className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-2">Your Career Snapshot</h4>
          <p className="text-gray-700 italic leading-relaxed relative z-10">"{assessmentSummary}"</p>
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
