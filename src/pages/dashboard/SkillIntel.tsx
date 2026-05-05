import React from 'react';
import { Zap, Target, Search, ArrowUp, ArrowDown, Activity } from 'lucide-react';

const SkillIntel = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="text-indigo-400" size={32} />
            Market Skill Intelligence
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Identify trending skills and competitive talent landscapes in your sector.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity size={20} className="text-indigo-400" />
              Rising Skills in IT & Software
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'TypeScript', growth: '+45%', status: 'high' },
                { name: 'Next.js 15', growth: '+120%', status: 'high' },
                { name: 'Tailwind CSS', growth: '+28%', status: 'med' },
                { name: 'Rust', growth: '+34%', status: 'med' },
                { name: 'AI Engineering', growth: '+180%', status: 'high' },
                { name: 'PostgreSQL', growth: '+12%', status: 'low' },
              ].map((skill, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-900/40 border border-gray-800 rounded-2xl">
                  <span className="font-bold text-white">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${skill.status === 'high' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                      {skill.growth}
                    </span>
                    <ArrowUp size={14} className={skill.status === 'high' ? 'text-emerald-400' : 'text-indigo-400'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 bg-indigo-600/5 border-indigo-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Talent Availability Radar</h3>
            <p className="text-sm text-gray-400 mb-6">Competitive analysis of candidate pools in your selected regions.</p>
            <div className="space-y-4">
              {[
                { region: 'Bhopal', density: 'High', candidates: '4,200+' },
                { region: 'Indore', density: 'Medium', candidates: '2,800+' },
                { region: 'Gwalior', density: 'Low', candidates: '950+' },
              ].map((reg, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-900/60 rounded-xl border border-gray-800">
                  <div>
                    <p className="font-bold text-white">{reg.region}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{reg.candidates} Candidates</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    reg.density === 'High' ? 'bg-emerald-500/10 text-emerald-400' :
                    reg.density === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {reg.density} Density
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Target size={16} />
              Strategic Advice
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              There is a <span className="text-white font-bold">surplus of Junior React Developers</span> in Bhopal. Consider offering higher entry-level packages for <span className="text-white font-bold">DevOps and Cloud roles</span> where talent is scarce.
            </p>
            <button className="text-[10px] font-bold text-amber-400 hover:underline">Get Detailed Report →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillIntel;
