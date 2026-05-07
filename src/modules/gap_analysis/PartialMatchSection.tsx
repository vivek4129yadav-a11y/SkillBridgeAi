import React from 'react';
import { PartialMatch } from '@/types/gap';
import {  TrendingUp } from 'lucide-react';

export const PartialMatchSection: React.FC<{ partialMatches: PartialMatch[] }> = ({ partialMatches }) => {
  if (partialMatches.length === 0) return null;

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-indigo-500/5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
           <TrendingUp className="w-5 h-5 text-indigo-400" />
           Skills to Level Up ({partialMatches.length})
        </h3>
        <p className="text-sm font-medium text-muted mt-1">Close to job requirements — a small push matters.</p>
      </div>
      
      <div className="p-6 grid gap-6 text-left">
        {partialMatches.map((match, i) => {
          // Normalize 1-5 scale to percentages for visualization
          const currentPct = (match.current_level / 5) * 100;
          const targetPct = (match.required_level / 5) * 100;
          
          return (
            <div key={`${match.skill_name}-${i}`} className="text-left group">
               <div className="flex justify-between items-end mb-3">
                 <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{match.skill_name}</h4>
                 <div className="badge-indigo">
                    Gap: -{match.gap_size} level
                 </div>
               </div>
               
               <div className="relative pt-1 pb-4">
                 <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden flex">
                    {/* Current Progress */}
                    <div 
                      className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all rounded-l-full" 
                      style={{ width: `${currentPct}%` }}
                    />
                    {/* The Gap (Target minus current), styled lightly */}
                    <div 
                      className="h-full bg-amber-500/30 relative"
                      style={{ width: `${targetPct - currentPct}%` }}
                    >
                       {/* Striped pattern overlay for the gap part */}
                       <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,white_4px,white_8px)]" />
                    </div>
                 </div>
                 
                 {/* Target Marker */}
                 <div 
                    className="absolute top-0 w-1 h-4 bg-white rounded-sm transform -translate-x-1/2 shadow-glow" 
                    style={{ left: `${targetPct}%`, marginTop: '0.125rem' }} 
                    title="Required Target"
                 />
                 
                 <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-wider">
                   <span className="text-muted">You: {match.current_label}</span>
                   <span className="text-indigo-300 ml-auto" style={{ paddingRight: `${100 - targetPct}%`, marginRight: '-1rem' }}>
                      Target
                   </span>
                 </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
