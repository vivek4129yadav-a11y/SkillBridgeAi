import React, { useState } from 'react';
import { StrengthItem } from '@/types/gap';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

export const StrengthsSection: React.FC<{ strengths: StrengthItem[] }> = ({ strengths }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (strengths.length === 0) return null;
  
  const displayItems = expanded ? strengths : strengths.slice(0, 4);
  const hasMore = strengths.length > 4;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
           <TrendingUp className="w-5 h-5 text-emerald-600" />
           Your Strengths ({strengths.length})
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayItems.map((s, i) => (
          <div key={`${s.skill_name}-${i}`} className="bg-white border text-left border-gray-100 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{s.skill_name}</h4>
                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  {s.proficiency_label}
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-50 text-emerald-700 font-bold leading-none shrink-0" title={`${s.job_demand_pct}% job demand`}>
                <span className="text-sm">{Math.round(s.job_demand_pct)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">{s.message}</p>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full py-3 bg-gray-50 text-gray-600 border-t border-gray-100 font-medium hover:bg-gray-100 flex items-center justify-center gap-2 transition"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="w-4 h-4"/></>
          ) : (
            <>Show All {strengths.length} Strengths <ChevronDown className="w-4 h-4"/></>
          )}
        </button>
      )}
    </div>
  );
};
