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
        <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left border border-gray-100 shadow-inner">
          <p className="text-gray-700 italic">"{assessmentSummary}"</p>
        </div>
      )}
      
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <Link 
          to="/gap-analysis" 
          className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-200"
        >
          View Your Gap Analysis <ChevronRight className="w-5 h-5" />
        </Link>
        
        <Link 
          to="/dashboard" 
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 font-medium py-2 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
        </Link>
      </div>
    </div>
  );
};
