import React, { useState } from 'react';
import { GapItem } from '@/types/gap';
import { Target, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';

export const GapsSection: React.FC<{ gaps: GapItem[] }> = ({ gaps }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (gaps.length === 0) return null;
  
  const displayGaps = expanded ? gaps : gaps.slice(0, 5);
  const hiddenCount = gaps.length - 5;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
      <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
        <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
           <Target className="w-5 h-5 text-amber-600" />
           Skills to Develop ({gaps.length})
        </h3>
      </div>
      
      <div className="divide-y divide-gray-50 text-left">
        {displayGaps.map((gap, i) => (
          <div key={`${gap.skill_name}-${i}`} className="p-6 sm:p-8 hover:bg-amber-50/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                 <div className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-wide">
                   #{i + 1} Priority
                 </div>
                 <h4 className="text-xl font-bold text-gray-900 capitalize">{gap.skill_name}</h4>
                 <div className="text-sm font-medium text-gray-500 mt-1 capitalize">Category: {gap.category}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-5">
               <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{Math.round(gap.frequency_pct)}%</div>
                    <div className="text-xs font-medium text-gray-500">of jobs require this</div>
                  </div>
               </div>
               <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">~{gap.learnability_weeks}</div>
                    <div className="text-xs font-medium text-gray-500">weeks to learn</div>
                  </div>
               </div>
            </div>

            {gap.recommended_resources && gap.recommended_resources.length > 0 && (
               <div className="flex flex-wrap gap-2">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-7 mr-2">Resources</span>
                 {gap.recommended_resources.map((rid, idx) => (
                    <span key={rid} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-full shadow-sm">
                      📚 Option {idx + 1}
                    </span>
                 ))}
               </div>
            )}
            
          </div>
        ))}
      </div>
      
      {hiddenCount > 0 && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full py-4 bg-gray-50 text-gray-600 border-t border-gray-100 font-medium hover:bg-gray-100 transition focus:outline-none"
        >
          {expanded ? "Show Priority Gaps Only" : `Show ${hiddenCount} more gaps`}
        </button>
      )}
    </div>
  );
};
