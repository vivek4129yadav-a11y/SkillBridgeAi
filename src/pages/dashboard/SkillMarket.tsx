import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Compass, 
  Target, 
  BarChart2, 
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Lightbulb
} from 'lucide-react';

const SkillMarket = () => {
  const trendingSkills = [
    { name: 'EV Battery Tech', growth: '+24%', status: 'rising', demand: 'Very High' },
    { name: 'Renewable Installation', growth: '+18%', status: 'rising', demand: 'High' },
    { name: 'Industrial Automation', growth: '+12%', status: 'rising', demand: 'High' },
    { name: 'Smart Grid Mgmt', growth: '-2%', status: 'falling', demand: 'Medium' },
    { name: 'PLC Programming', growth: '+8%', status: 'rising', demand: 'Medium' },
  ];

  const sectorInsights = [
    { 
      title: 'Supply-Demand Gap', 
      desc: 'There is a 30% shortage of certified solar technicians in your region.', 
      action: 'Consider sponsoring a training program.',
      icon: Target,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    { 
      title: 'Emerging Competency', 
      desc: 'Candidates with "IoT Maintenance" skills are being hired 40% faster.', 
      action: 'Update your "Senior Electrician" JD.',
      icon: Zap,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Skill Intelligence
            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase rounded-md border border-amber-500/20 flex items-center gap-1">
              <Sparkles size={12} /> Market Data
            </span>
          </h1>
          <p className="text-gray-400 mt-1">Real-time skills market analysis to guide your workforce planning.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Trending Skills */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp size={22} className="text-indigo-400" />
                Sector Skill Trends
              </h2>
              <select className="bg-gray-800 border-none text-xs text-white rounded-lg px-3 py-1 outline-none">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className="space-y-4">
              {trendingSkills.map((skill, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-900/60 border border-gray-800 rounded-2xl hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400">
                      <BarChart2 size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{skill.name}</h3>
                      <p className="text-[10px] text-gray-500">Demand Level: <span className="text-gray-300">{skill.demand}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 text-sm font-bold ${skill.status === 'rising' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {skill.growth}
                      {skill.status === 'rising' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                    <div className="h-1 w-24 bg-gray-800 rounded-full mt-2 overflow-hidden">
                       <div className={`h-full bg-current ${skill.status === 'rising' ? 'text-emerald-500' : 'text-rose-500'}`} style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Strategy Card */}
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-all">
               <Compass size={200} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-amber-400" />
                Strategic AI Recommendation
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                Based on current market trends in the <span className="text-white font-bold underline decoration-indigo-500">Electrical & Infrastructure</span> sector, there is a significant movement toward <span className="text-white font-bold">Automation Readiness</span>. Candidates with "PLC Fundamentals" are commanding 15% higher premiums. We suggest adding this as an "Optional" skill in your upcoming job postings to attract forward-thinking talent.
              </p>
              <button className="mt-6 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">
                Update Active Postings
              </button>
            </div>
          </div>
        </div>

        {/* Right: Insights & Benchmarks */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Info size={22} className="text-emerald-400" />
            Market Insights
          </h2>

          <div className="space-y-6">
            {sectorInsights.map((insight, i) => (
              <div key={i} className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${insight.bg} ${insight.color}`}>
                    <insight.icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white">{insight.title}</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {insight.desc}
                </p>
                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-[10px] font-bold rounded-lg transition-all border border-gray-700">
                  {insight.action}
                </button>
              </div>
            ))}

            <div className="bg-gray-900/60 border border-indigo-500/20 p-6 rounded-3xl">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Competitor Benchmarking</h3>
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] mb-2">
                      <span className="text-gray-400">Response Rate</span>
                      <span className="text-white font-bold">Top 10%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-2">
                      <span className="text-gray-400">Skill Vetting Rigor</span>
                      <span className="text-white font-bold">Above Average</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-amber-500" />
                    </div>
                  </div>
               </div>
               <div className="mt-6 flex items-center gap-2 text-[10px] text-indigo-400 font-bold p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                  <ShieldCheck size={14} />
                  Your company ranks #4 in local hiring efficiency.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMarket;
