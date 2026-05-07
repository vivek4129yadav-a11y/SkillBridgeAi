import React from 'react';
import { RoadmapWeek } from '@/types/gap';
import { Map, ExternalLink, CheckCircle2 } from 'lucide-react';

interface RoadmapProps {
  roadmap: RoadmapWeek[];
  motivationalNote: string;
  totalWeeks: number;
}

export const RoadmapSection: React.FC<RoadmapProps> = ({ roadmap, motivationalNote, totalWeeks }) => {
  return (
    <div className="card text-left overflow-hidden">
      <div className="bg-surface-elevated px-6 py-5 border-b border-border">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
           <Map className="w-5 h-5 text-indigo-400" />
           Your {totalWeeks}-Week Plan
        </h3>
        <p className="text-muted text-sm mt-1 font-medium">A practical, step-by-step learning journey.</p>
      </div>

      <div className="p-6 relative">
         <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-border hidden sm:block" />
         
         <div className="space-y-8 relative z-10">
           {roadmap.map((week, idx) => (
             <div key={week.week} className="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                <div className="shrink-0 flex items-center gap-4 sm:flex-col">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {week.week}
                  </div>
                  <div className="sm:hidden font-bold text-white">Week {week.week}</div>
                </div>
                
                <div className="card-elevated p-5 flex-1 relative overflow-hidden group-hover:border-indigo-500/30 transition-all">
                   <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-emerald-500 opacity-30" />
                   
                   <div className="badge-indigo mb-3">
                     {week.focus_skill}
                   </div>
                   
                   <h4 className="text-lg font-bold text-white mb-2">{week.goal}</h4>
                   <p className="text-muted font-medium mb-4 leading-relaxed bg-surface/50 p-3 rounded-lg border border-border/50">
                     {week.action}
                   </p>
                   
                   {week.resource_id && week.resource_url && (
                     <a 
                       href={week.resource_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border text-indigo-400 hover:text-white hover:bg-indigo-500/10 text-sm font-bold rounded-lg transition-all mb-4"
                     >
                       📚 {week.resource_name || 'Learning Resource'} <ExternalLink className="w-3.5 h-3.5" />
                     </a>
                   )}
                   
                   <div className="flex items-start gap-2 text-sm text-emerald-400 bg-emerald-500/5 p-3 rounded-lg font-medium border border-emerald-500/10">
                     <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                     <span><span className="font-bold">Outcome:</span> {week.milestone}</span>
                   </div>
                </div>
             </div>
           ))}
         </div>
      </div>

      {motivationalNote && (
        <div className="p-6 border-t border-border bg-surface-elevated/50">
           <div className="max-w-sm mx-auto card-elevated p-4 text-center border-indigo-500/20">
             <p className="text-muted italic font-medium leading-relaxed">
               "{motivationalNote}"
             </p>
           </div>
        </div>
      )}
    </div>
  );
};
