import React from 'react';
import { Mic, Play, Settings, Users, BrainCircuit, History } from 'lucide-react';

const AIInterviewer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mic className="text-indigo-400" size={32} />
            AI Interviewer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Automate your first-round screening with our advanced AI agents.</p>
        </div>
        <button className="btn-primary">
          <Settings size={18} />
          Agent Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Active Interview Rounds</h2>
            <div className="space-y-4">
              {[
                { title: 'Senior React Developer', candidates: 12, completed: 8, status: 'Active' },
                { title: 'UX Designer', candidates: 5, completed: 5, status: 'Completed' },
                { title: 'DevOps Engineer', candidates: 8, completed: 2, status: 'In Progress' }
              ].map((round, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                      <BrainCircuit size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{round.title}</h3>
                      <p className="text-sm text-gray-500">{round.completed}/{round.candidates} Interviews Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      round.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {round.status}
                    </span>
                    <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all">
                      <Play size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Create New Agent</h3>
              <p className="text-indigo-100 text-sm mb-6">Deploy a specialized AI agent to screen candidates for specific roles.</p>
              <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all">
                Start Deployment
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Mic size={120} />
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <History size={16} />
              Recent Vetting Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <Users size={14} />
                  </div>
                  <div>
                    <p className="text-gray-300"><span className="text-white font-bold">Rahul S.</span> cleared Screening for Frontend Dev</p>
                    <p className="text-[10px] text-gray-500 mt-1">10 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewer;
