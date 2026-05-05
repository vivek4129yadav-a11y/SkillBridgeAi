import React from 'react';
import { TrendingUp, BarChart3, PieChart, Users, Target, ArrowUpRight } from 'lucide-react';

const HiringInsights = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="text-amber-400" size={32} />
            Hiring Insights
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Data-driven analysis of your recruitment performance and market trends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Time to Hire</h2>
          <div className="h-64 flex items-end gap-2 px-4">
            {[45, 60, 35, 75, 55, 40, 65].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-indigo-500/20 border border-indigo-500/30 rounded-t-lg transition-all hover:bg-indigo-500/40"
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-gray-500">M{i+1}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Average</p>
              <p className="text-xl font-bold text-white">18 Days</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Best</p>
              <p className="text-xl font-bold text-emerald-400">12 Days</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Industry</p>
              <p className="text-xl font-bold text-gray-400">24 Days</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Applicant Quality Score</h2>
          <div className="space-y-6">
            {[
              { label: 'Technical Skills', value: 85, color: 'bg-emerald-500' },
              { label: 'Experience Match', value: 72, color: 'bg-indigo-500' },
              { label: 'Cultural Fit', value: 94, color: 'bg-purple-500' },
              { label: 'Communication', value: 68, color: 'bg-amber-500' },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">{s.label}</span>
                  <span className="text-sm font-bold text-white">{s.value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.value}%`, backgroundColor: `var(--tw-bg-opacity, 1)` }}>
                    <div className={`h-full ${s.color}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringInsights;
