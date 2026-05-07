import React, { useState } from 'react';
import { GapItem } from '@/types/gap';
import { Target, ExternalLink, GraduationCap, Briefcase } from 'lucide-react';

export const GapsSection: React.FC<{ gaps: GapItem[] }> = ({ gaps }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (gaps.length === 0) return null;
  
  const displayGaps = expanded ? gaps : gaps.slice(0, 5);
  const hiddenCount = gaps.length - 5;

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-amber-500/5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
           <Target className="w-5 h-5 text-amber-400" />
           Skills to Develop ({gaps.length})
        </h3>
      </div>
      
      <div className="divide-y divide-border text-left">
        {displayGaps.map((gap, i) => (
          <div key={`${gap.skill_name}-${i}`} className="p-6 sm:p-8 hover:bg-white/5 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                 <div className="badge-rose mb-2">
                   #{i + 1} Priority
                 </div>
                 <h4 className="text-xl font-bold text-white capitalize group-hover:text-amber-400 transition-colors">{gap.skill_name}</h4>
                 <div className="text-sm font-medium text-muted mt-1 capitalize">Category: {gap.category}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-5">
               <div className="card-elevated p-3 flex items-start gap-3 border-border/50">
                  <Briefcase className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-lg font-bold text-white">{Math.round(gap.frequency_pct)}%</div>
                    <div className="text-xs font-medium text-muted">of jobs require this</div>
                  </div>
               </div>
               <div className="card-elevated p-3 flex items-start gap-3 border-border/50">
                  <GraduationCap className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-lg font-bold text-white">~{gap.learnability_weeks}</div>
                    <div className="text-xs font-medium text-muted">weeks to learn</div>
                  </div>
               </div>
            </div>

            {gap.recommended_resources && gap.recommended_resources.length > 0 && (
               <div className="flex flex-wrap items-center gap-2">
                 <span className="text-[10px] font-bold text-faint uppercase tracking-widest mr-2">Resources</span>
                 {gap.recommended_resources.map((rid, idx) => (
                    <span key={rid} className="badge bg-surface hover:bg-surface-elevated transition-colors cursor-default">
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
          className="w-full py-4 bg-surface-elevated text-muted font-semibold hover:bg-surface-hover hover:text-white transition-all border-t border-border"
        >
          {expanded ? "Show Priority Gaps Only" : `Show ${hiddenCount} more gaps`}
        </button>
      )}
    </div>
  );
};
