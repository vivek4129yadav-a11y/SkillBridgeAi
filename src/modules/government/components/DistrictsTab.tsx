import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';
import { DistrictPerformance, TrainingOutcome } from '@/services/analyticsService';

interface DistrictsTabProps {
  outcomes: any[];
  filteredDistricts: DistrictPerformance[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DistrictsTab: React.FC<DistrictsTabProps> = ({
  outcomes,
  filteredDistricts,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="space-y-8">
      {/* Outcome Trend Chart */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-8">National Training Outcomes Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={outcomes}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b'}} />
              <Area type="monotone" dataKey="completions_count" stroke="#6366f1" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* List Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">District Funnel Analysis</h3>
            <p className="text-sm text-slate-500 mt-1">Conversion tracking from registration to assessment</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search by city or state..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50">
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Region</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Registered</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Onboarded</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Assessed</th>
                <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredDistricts.length > 0 ? filteredDistricts.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{row.city}</span>
                      <span className="text-xs text-slate-500">{row.state}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-right font-mono">{row.registered_count}</td>
                  <td className="px-8 py-5 text-slate-400 text-right font-mono">{row.onboarded_count}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      {row.assessed_count}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-sm font-bold text-indigo-400">
                        {((row.assessed_count / (row.registered_count || 1)) * 100).toFixed(1)}%
                      </span>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
                          style={{ width: `${Math.min((row.assessed_count / (row.registered_count || 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-slate-700" />
                      <p>No regional data matches your search query.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
