import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, AlertCircle, Download, Filter, MapPin, Activity } from 'lucide-react';
import { analyticsService, OverviewStats, SkillGapData, DistrictPerformance, YouthData } from '@/services/analyticsService';
import { OverviewTab } from './components/OverviewTab';
import { DistrictsTab } from './components/DistrictsTab';
import { YouthTab } from './components/YouthTab';

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-slate-800 rounded-lg ${className}`} />
);

const GovernmentDashboard: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGapData[]>([]);
  const [outcomes, setOutcomes] = useState<any[]>([]);
  const [regionalData, setRegionalData] = useState<DistrictPerformance[]>([]);
  const [youthList, setYouthList] = useState<YouthData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'districts' | 'youth'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

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
        setTimeout(() => setLoading(false), 500);
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
    d.city?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.state?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !stats) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <Skeleton className="h-16 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-slate-100">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl shadow-inner">
            <Activity size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              National Workforce Analytics
              <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold">
                Live Data
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">SANKALP Monitoring System • Live Feedback</p>
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
        {activeTab === 'overview' && <OverviewTab stats={stats} skillGaps={skillGaps} />}
        {activeTab === 'districts' && (
          <DistrictsTab 
            outcomes={outcomes} 
            filteredDistricts={filteredDistricts} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        )}
        {activeTab === 'youth' && <YouthTab youthList={youthList} />}
      </div>
    </div>
  );
};

export default GovernmentDashboard;
