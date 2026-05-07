import React, { useState } from 'react';
import { StrengthItem } from '@/types/gap';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

export const StrengthsSection: React.FC<{ strengths: StrengthItem[] }> = ({ strengths }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (strengths.length === 0) return null;
  
  const displayItems = expanded ? strengths : strengths.slice(0, 4);
  const hasMore = strengths.length > 4;

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-emerald-500/5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
           <TrendingUp className="w-5 h-5 text-emerald-400" />
           Your Strengths ({strengths.length})
        </h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayItems.map((s, i) => (
          <div key={`${s.skill_name}-${i}`} className="card-elevated p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{s.skill_name}</h4>
                <div className="badge-emerald">
                  {s.proficiency_label}
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-bold leading-none shrink-0" title={`${s.job_demand_pct}% job demand`}>
                <span className="text-sm">{Math.round(s.job_demand_pct)}%</span>
              </div>
            </div>
            <p className="text-sm text-muted font-medium leading-relaxed">{s.message}</p>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="w-full py-3 bg-surface-elevated text-muted font-semibold hover:bg-surface-hover hover:text-white flex items-center justify-center gap-2 transition-all border-t border-border"
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
