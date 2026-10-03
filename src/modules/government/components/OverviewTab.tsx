import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Users, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import { OverviewStats, SkillGapData } from '@/services/analyticsService';
import { StatCard } from './StatCard';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface OverviewTabProps {
  stats: OverviewStats | null;
  skillGaps: SkillGapData[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ stats, skillGaps }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Registered Candidates" value={stats?.total_users?.toLocaleString() || "0"} change={12.4} icon={Users} colorClass="bg-indigo-500" />
        <StatCard title="Assessment Completion" value={`${stats?.completion_rate?.toFixed(1) || "0"}%`} change={5.2} icon={CheckCircle} colorClass="bg-emerald-500" />
        <StatCard title="Placement Ready" value={`${stats?.onboarding_rate?.toFixed(1) || "0"}%`} change={-2.1} icon={BookOpen} colorClass="bg-amber-500" />
        <StatCard title="Active Job Links" value={stats?.active_jobs?.toLocaleString() || "0"} change={19.5} icon={TrendingUp} colorClass="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Skill Demand vs Supply</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center text-slate-400">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2" /> Demand
              </div>
              <div className="flex items-center text-slate-400">
                <div className="w-3 h-3 bg-slate-700 rounded-full mr-2" /> Supply
              </div>
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="skill_name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'}}
                  itemStyle={{color: '#f8fafc'}}
                />
                <Bar dataKey="demand" fill="#6366f1" name="Demand" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="supply" fill="#334155" name="Supply" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-8">High Growth Sectors</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillGaps.slice(0, 5).map(g => ({ name: g.skill_name, value: g.demand }))}
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {skillGaps.slice(0, 5).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {skillGaps.slice(0, 3).map((g, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="text-slate-300">{g.skill_name}</span>
                </div>
                <span className="font-semibold text-white">{g.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
