import React from 'react';
import { 
  Columns, 
  MoreHorizontal, 
  Users, 
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

const Pipeline = () => {
  const stages = [
    { id: 'applied', title: 'Applied', count: 12, color: 'bg-indigo-500' },
    { id: 'screening', title: 'Screening', count: 5, color: 'bg-amber-500' },
    { id: 'interview', title: 'Interview', count: 3, color: 'bg-purple-500' },
    { id: 'offered', title: 'Offered', count: 2, color: 'bg-emerald-500' },
    { id: 'hired', title: 'Hired', count: 1, color: 'bg-blue-500' },
  ];

  const candidates = [
    { id: 1, name: 'Rahul Sharma', role: 'Senior Electrician', stage: 'applied', score: '92%', location: 'Bhopal', date: '2d ago' },
    { id: 2, name: 'Priya Patel', role: 'Site Supervisor', stage: 'screening', score: '88%', location: 'Indore', date: '1d ago' },
    { id: 3, name: 'Amit Kumar', role: 'Junior Electrician', stage: 'applied', score: '85%', location: 'Jabalpur', date: '3h ago' },
    { id: 4, name: 'Sneha Gupta', role: 'Project Manager', stage: 'interview', score: '95%', location: 'Bhopal', date: '5h ago' },
  ];

  return (
    <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Candidate Pipeline
            <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-1 rounded-md border border-gray-700">All Jobs</span>
          </h1>
          <p className="text-gray-400 mt-1">Track and manage your candidates through the recruitment lifecycle.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                className="bg-gray-900/60 border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:border-indigo-500 outline-none transition-all w-64"
              />
           </div>
           <button className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all">
             <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar min-h-[70vh]">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <h3 className="font-bold text-white uppercase text-xs tracking-widest">{stage.title}</h3>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md border border-gray-700">{stage.count}</span>
              </div>
              <button className="text-gray-500 hover:text-white">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {candidates
                .filter((c) => c.stage === stage.id)
                .map((candidate) => (
                  <div key={candidate.id} className="bg-gray-900/40 border border-gray-800 p-4 rounded-2xl hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing group relative">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Users size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{candidate.name}</h4>
                          <p className="text-[10px] text-gray-500">{candidate.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        {candidate.score}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] text-gray-600 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {candidate.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {candidate.date}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
                      <div className="flex -space-x-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="w-5 h-5 rounded-full bg-gray-800 border border-gray-900 flex items-center justify-center text-[8px] text-gray-500 font-bold uppercase">
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                      </div>
                      <button className="text-[10px] font-bold text-gray-500 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all">
                        View Details <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* AI Tag */}
                    {parseInt(candidate.score) > 90 && (
                       <div className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-all">
                          <span className="flex items-center gap-1 text-[8px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full border border-indigo-500/20">
                            <Sparkles size={8} /> Top Match
                          </span>
                       </div>
                    )}
                  </div>
                ))}
              
              {/* Empty state or Add button */}
              <button className="w-full py-3 border border-dashed border-gray-800 rounded-2xl text-gray-600 hover:text-gray-400 hover:bg-gray-800/20 transition-all flex items-center justify-center gap-2 text-xs font-medium">
                <Plus size={14} /> Add Candidate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Pipeline;
