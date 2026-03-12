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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-left overflow-hidden">
      <div className="bg-gray-900 px-6 py-5">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
           <Map className="w-5 h-5 text-gray-300" />
           Your {totalWeeks}-Week Plan
        </h3>
        <p className="text-gray-400 text-sm mt-1 font-medium">A practical, step-by-step learning journey.</p>
      </div>

      <div className="p-6 relative">
         <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gray-100 hidden sm:block" />
         
         <div className="space-y-8 relative z-10">
           {roadmap.map((week, idx) => (
             <div key={week.week} className="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                <div className="shrink-0 flex items-center gap-4 sm:flex-col">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {week.week}
                  </div>
                  <div className="sm:hidden font-bold text-gray-900">Week {week.week}</div>
                </div>
                
                <div className="bg-white border text-left border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex-1 relative overflow-hidden group-hover:border-blue-100">
                   <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-blue-400 to-emerald-400 opacity-50" />
                   
                   <div className="inline-block bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md mb-3 capitalize">
                     {week.focus_skill}
                   </div>
                   
                   <h4 className="text-lg font-bold text-gray-900 mb-2">{week.goal}</h4>
                   <p className="text-gray-600 font-medium mb-4 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-50">
                     {week.action}
                   </p>
                   
                   {week.resource_id && week.resource_url && (
                     <a 
                       href={week.resource_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm font-bold rounded-lg transition mb-4"
                     >
                       📚 {week.resource_name || 'Learning Resource'} <ExternalLink className="w-3.5 h-3.5" />
                     </a>
                   )}
                   
                   <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg font-medium">
                     <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                     Outcome: {week.milestone}
                   </div>
                </div>
             </div>
           ))}
         </div>
      </div>

      {motivationalNote && (
        <div className="bg-gray-50 p-6 border-t border-gray-100">
           <div className="max-w-sm mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
             <p className="text-gray-600 italic font-medium leading-relaxed">
               "{motivationalNote}"
             </p>
           </div>
        </div>
      )}
    </div>
  );
};
