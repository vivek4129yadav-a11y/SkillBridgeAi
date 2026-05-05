import React from 'react';
import { GraduationCap, Building2, Search, Filter, Calendar, Users, MapPin, ExternalLink } from 'lucide-react';

const CampusHub = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="text-emerald-400" size={32} />
            Campus Hub
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Connect with top educational institutions and vocational centers.</p>
        </div>
        <button className="btn-primary">
          <Building2 size={18} />
          Partner with Campus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/20">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Partner Colleges</p>
          <p className="text-3xl font-black text-white">24</p>
          <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
            <Users size={12} /> 1.2k+ Students in Pool
          </p>
        </div>
        <div className="glass-card p-6 bg-indigo-500/5 border-indigo-500/20">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Active Drives</p>
          <p className="text-3xl font-black text-white">8</p>
          <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
            <Calendar size={12} /> 3 Drives ending this week
          </p>
        </div>
        <div className="glass-card p-6 bg-purple-500/5 border-purple-500/20">
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Certifications Verified</p>
          <p className="text-3xl font-black text-white">450+</p>
          <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
            <Users size={12} /> By National Skill Council
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Institutions Near You</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all"><Filter size={18} /></button>
              <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-all"><Search size={18} /></button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'State Vocational Training Institute', location: 'Bhopal, MP', students: '450+', trades: ['Electrical', 'Carpentry', 'Plumbing'] },
              { name: 'National Institute of Electronics', location: 'Indore, MP', students: '280+', trades: ['Embedded Systems', 'IoT', 'AI'] },
              { name: 'Government ITI Central', location: 'Gwalior, MP', students: '600+', trades: ['Fitter', 'Welder', 'Mechanic'] },
            ].map((inst, i) => (
              <div key={i} className="glass-card p-6 hover:border-emerald-500/40 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-emerald-400 border border-gray-700 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg group-hover:text-emerald-400 transition-all">{inst.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {inst.location}</span>
                        <span className="flex items-center gap-1"><Users size={14} /> {inst.students} Students</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {inst.trades.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-3 py-1 bg-gray-900/60 text-gray-400 rounded-full border border-gray-800">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 bg-gray-800 hover:bg-emerald-500/20 rounded-xl text-gray-500 hover:text-emerald-400 transition-all">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="glass-card p-6 border-indigo-500/30 bg-indigo-500/5">
            <h3 className="text-md font-bold text-white mb-4">Upcoming Campus Drives</h3>
            <div className="space-y-4">
              {[
                { date: 'Oct 24', name: 'Mega Placement Drive', type: 'Vocational' },
                { date: 'Nov 02', name: 'Tech Talent Hunt', type: 'IT' },
              ].map((d, i) => (
                <div key={i} className="flex gap-4 p-3 bg-gray-900/40 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase leading-none">{d.date.split(' ')[0]}</span>
                    <span className="text-lg font-black leading-none">{d.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{d.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{d.type} Focus</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-gray-800 text-gray-400 text-xs font-bold rounded-xl hover:bg-gray-700 hover:text-white transition-all">Schedule New Drive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusHub;
