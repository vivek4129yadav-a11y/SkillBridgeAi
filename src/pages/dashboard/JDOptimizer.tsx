import React from 'react';
import { FileCheck, Wand2, Sparkles, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const JDOptimizer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileCheck className="text-amber-400" size={32} />
            JD Optimizer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Use AI to craft high-conversion job descriptions that attract top talent.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 size={20} className="text-indigo-400" />
              Optimize New Description
            </h2>
            <textarea 
              className="w-full h-64 bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              placeholder="Paste your current job description or requirements here..."
            ></textarea>
            <div className="mt-6 flex justify-between items-center">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-indigo-600" />
                  SEO Optimization
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-800 bg-gray-900 text-indigo-600" />
                  Bias Check
                </label>
              </div>
              <button className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                <Sparkles size={18} />
                Optimize with AI
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle size={16} />
              Real-time Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400 font-bold uppercase">Reach Score</span>
                  <span className="text-sm font-bold text-white">45/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[45%]"></div>
                </div>
                <p className="text-[10px] text-rose-400 mt-2">Critical: Missing key industry keywords like 'TypeScript' or 'Cloud Native'.</p>
              </div>

              <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400 font-bold uppercase">Clarity Score</span>
                  <span className="text-sm font-bold text-white">82/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[82%]"></div>
                </div>
                <p className="text-[10px] text-emerald-400 mt-2">Good: Job responsibilities are clearly defined.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4">Saved Templates</h3>
            <div className="space-y-3">
              {['Frontend Developer', 'Trade Apprentice', 'Delivery Associate'].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-xl transition-all group cursor-pointer">
                  <span className="text-sm text-gray-300 group-hover:text-white transition-all">{t}</span>
                  <ArrowRight size={14} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDOptimizer;
