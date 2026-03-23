import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, BookOpen, AlertCircle, CheckCircle, 
  Download, Search, Filter, ArrowUpRight, ArrowDownRight,
  Globe, MapPin, Activity
} from 'lucide-react';
import { analyticsService, OverviewStats, SkillGapData, TrainingOutcome, DistrictPerformance, YouthData } from '@/services/analyticsService';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-slate-800 rounded-lg ${className}`} />
);

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg hover:border-indigo-500/30 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 text-indigo-400 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {change !== undefined && (
        <span className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {change >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {Math.abs(change).toFixed(1)}%
        </span>
      )}
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1 tracking-tight">{value}</p>
  </div>
);

const GovernmentDashboard: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGapData[]>([]);
  const [outcomes, setOutcomes] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<DistrictPerformance[]>([]);
  const [youthList, setYouthList] = useState<YouthData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'districts' | 'skillgaps' | 'youth'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch cities for filter
  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await analyticsService.getRegionalPerformance();
        const uniqueCities = Array.from(new Set(data.filter(d => d.city).map(d => d.city))) as string[];
        setCities(uniqueCities.sort());
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    loadCities();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, gapsData, outcomesData, regionalPerformance, youthListData] = await Promise.all([
          analyticsService.getOverview(selectedCity || undefined),
          analyticsService.getSkillGaps(8, selectedCity || undefined),
          analyticsService.getOutcomes(selectedCity || undefined),
          analyticsService.getRegionalPerformance(selectedCity || undefined),
          analyticsService.getYouthList(20)
        ]);
        
        setStats(statsData);
        setSkillGaps(gapsData);
        setOutcomes(outcomesData.map(o => ({
            ...o,
            month: new Date(o.month).toLocaleString('default', { month: 'short' })
        })));
        setRegionalData(regionalPerformance);
        setYouthList(youthListData);

      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for smooth transition
      }
    };

    fetchData();
  }, [selectedCity]);

  const handleExport = async () => {
    try {
      await analyticsService.exportCSV();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const filteredDistricts = regionalData.filter(d => 
    (d.city || d.state || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 md:p-8 bg-slate-950 min-h-screen space-y-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Globe className="text-indigo-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">National Skill Insights</h1>
            <p className="text-slate-400 mt-1 flex items-center">
              <Activity size={14} className="mr-2 text-emerald-500 animate-pulse" />
              SANKALP Monitoring System • Live Feedback
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative group min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <MapPin size={16} />
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer hover:border-slate-700 transition-all"
            >
              <option value="">National Coverage</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <Filter size={14} />
            </div>
          </div>
          <button 
            onClick={handleExport}
            className="flex-1 md:flex-none flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] font-medium"
          >
            <Download size={18} className="mr-2" />
            Export Intelligence
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-slate-900 p-1.5 rounded-2xl mb-10 w-fit border border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'districts', label: 'Regional Trends', icon: MapPin },
          { id: 'skillgaps', label: 'Skill Deficits', icon: AlertCircle },
          { id: 'youth', label: 'Youth Directory', icon: Users }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <tab.icon size={16} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-10 animate-in fade-in duration-500">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
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
        )}

        {activeTab === 'districts' && (
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
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b'}}
                    />
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
                              ></div>
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
        )}

        {activeTab === 'youth' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Youth Directory</h3>
                  <p className="text-sm text-slate-500 mt-1">Granular view of candidate profiles and onboarding status</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-950/50">
                      <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Candidate</th>
                      <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Location</th>
                      <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider">Primary Skill</th>
                      <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Assessment</th>
                      <th className="px-8 py-5 text-slate-500 font-bold text-xs uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {youthList.length > 0 ? youthList.map((youth, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-white font-semibold">{youth.full_name}</span>
                            <span className="text-xs text-slate-500">ID: {youth.id.substring(0, 8)}...</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-slate-300 text-sm">{youth.city}</span>
                            <span className="text-xs text-slate-500">{youth.state}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-indigo-400 text-sm font-medium">{youth.primary_skill || "Not Specified"}</span>
                            <span className="text-xs text-slate-500">{youth.skill_level}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right font-mono text-white">
                          <span className={`px-2 py-1 rounded ${youth.assessment_score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : youth.assessment_score >= 50 ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {youth.assessment_score || 0}%
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                            youth.onboarding_status === 'completed' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {youth.onboarding_status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                       <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                          No youth profiles found in the system.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GovernmentDashboard;

