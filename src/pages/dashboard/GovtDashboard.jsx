import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, 
  PieChart, 
  Map, 
  Globe, 
  TrendingUp, 
  Briefcase, 
  Users, 
  AlertTriangle,
  FileText,
  ChevronRight,
  Filter,
  Download,
  Calendar,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import api from '@/lib/api';

const GovtDashboard = () => {
  // Queries
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['govt-analytics'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/govt/analytics');
        return data.data;
      } catch (err) {
        return null;
      }
    }
  });

  const { data: placements, isLoading: placementsLoading } = useQuery({
    queryKey: ['govt-placements'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/govt/placements');
        return data.data;
      } catch (err) {
        return [];
      }
    }
  });

  const { data: skillGaps, isLoading: gapsLoading } = useQuery({
    queryKey: ['govt-skill-gaps'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/govt/skill-gaps');
        return data.data;
      } catch (err) {
        return [];
      }
    }
  });

  const { data: summary } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/dashboard/summary');
        return data.data;
      } catch (err) {
        return null;
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Hello, {summary?.profile?.full_name?.split(' ')[0] || 'Official'}
          </h1>
          <p className="text-gray-400 mt-1">Strategic oversight of regional employment and skilling trends.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm text-gray-400">
            <Calendar size={18} className="mr-2" />
            Last 30 Days
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all">
            <Download size={18} />
            Policy Brief
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Enrolled', value: analytics?.total_users || '4.2M', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '+12%' },
          { label: 'Placement Rate', value: analytics?.placement_rate || '68%', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+5%' },
          { label: 'Skill Gap Index', value: analytics?.gap_index || '0.42', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '-2%' },
          { label: 'Revenue Impact', value: analytics?.revenue || '₹120Cr', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10', trend: '+8%' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 relative overflow-hidden group hover:border-white/20 transition-all cursor-default">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</p>
            <div className="flex items-end gap-3 mt-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className={`text-[10px] font-bold mb-1 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Regional Analytics & Placements */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Placement Stats Chart Placeholder */}
          <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 size={22} className="text-indigo-400" />
                Monthly Placement Trends
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-800 text-[10px] text-white rounded-md border border-gray-700">District View</button>
                <button className="px-3 py-1 bg-indigo-600 text-[10px] text-white rounded-md">State View</button>
              </div>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[45, 60, 55, 80, 75, 90, 85, 100, 95, 110, 105, 120].map((h, i) => (
                <div key={i} className="flex-grow flex flex-col items-center group">
                  <div 
                    className="w-full bg-indigo-500/40 group-hover:bg-indigo-500 transition-all rounded-t-lg relative" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}k
                    </div>
                  </div>
                  <span className="text-[8px] text-gray-500 mt-2">M{i+1}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Districts for Placements */}
          <section>
             <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Map size={22} className="text-emerald-400" />
              Placement Performance by District
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { district: 'Indore', placed: '12,450', rate: '92%', status: 'Excellent' },
                { district: 'Bhopal', placed: '10,200', rate: '88%', status: 'Good' },
                { district: 'Gwalior', placed: '8,150', rate: '75%', status: 'Improving' },
                { district: 'Jabalpur', placed: '7,800', rate: '72%', status: 'Developing' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 p-5 rounded-2xl flex justify-between items-center group hover:border-emerald-500/30 transition-all">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{item.district}</h4>
                    <p className="text-[10px] text-gray-500 mt-1">{item.placed} Youth Placed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{item.rate}</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Skill Gap Heatmap & Alerts */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Skill Gap List (Heatmap Placeholder) */}
          <section className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <AlertTriangle size={20} className="text-amber-400" />
              Critical Skill Gaps
            </h2>
            <div className="space-y-4">
              {[
                { trade: 'Solar PV Tech', gap: '84%', priority: 'Critical', color: 'text-red-400' },
                { trade: 'Data Analytics', gap: '62%', priority: 'High', color: 'text-orange-400' },
                { trade: 'Agri-Processing', gap: '45%', priority: 'Medium', color: 'text-amber-400' },
                { trade: 'Nursing Asst', gap: '38%', priority: 'Medium', color: 'text-indigo-400' },
              ].map((gap, i) => (
                <div key={i} className="p-4 bg-gray-800/40 border border-gray-700 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-white">{gap.trade}</p>
                    <span className={`text-[10px] font-bold ${gap.color}`}>{gap.priority}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full bg-current ${gap.color}`} style={{ width: gap.gap }} />
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold">{gap.gap}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all border border-gray-700">
              Download Full Heatmap
            </button>
          </section>

          {/* Policy Recommendations */}
          <section className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 p-6 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} className="text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Policy Insights</h2>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Based on AI analysis, increasing "Digital Literacy" subsidies in Satna could boost regional placements by 22% next quarter.
              </p>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                View Recommendations
              </button>
            </div>
          </section>

          {/* Quick Stats Sidebar */}
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe size={16} className="text-indigo-400" />
              Global Benchmarking
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Skill Alignment</span>
                <span className="text-xs font-bold text-white">Above Average</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Industry Sync</span>
                <span className="text-xs font-bold text-white">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtDashboard;
